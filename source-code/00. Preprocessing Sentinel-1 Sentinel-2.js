// ====================================================================
// START: PENGATURAN UMUM
// ====================================================================
var startDate = ee.Date("2022-01-01");
var endDate   = ee.Date("2025-01-15");

// ====================================================================
// SECTION 1: TITIK SAMPEL KSA
// ====================================================================
var titikSampel = titiksampel.map(function(feature) {
  var lon = feature.get("TitikAmatX");
  var lat = feature.get("TitikAmatY");
  return feature.setGeometry(ee.Geometry.Point([lon, lat]));
});
Map.centerObject(titikSampel, 10);
Map.addLayer(titikSampel, { color: "red" }, "Titik Sampel KSA");
print("Jumlah titik sampel di wilayah karawang:", titikSampel.filterBounds(karawang).size());

// ====================================================================
// SECTION 2: PREPROCESSING SENTINEL-1 (S1)
// ====================================================================
// konversi dB -> linear
function toLinear(img_db) {
  return ee.Image(10).pow(img_db.divide(10));
}

// konversi linear -> dB
function toDB(img_lin) {
  return img_lin.log10().multiply(10);
}

// fungsi additional border noise correction
function maskBorderNoise(image) {
  var angle = image.select("angle");
  return image.updateMask(angle.gte(29.1).and(angle.lte(46.0)));
}

// fungsi speckle filtering (refined lee)
function RefinedLee(img) {
  var weights3 = ee.List.repeat(ee.List.repeat(1, 3), 3);
  var kernel3  = ee.Kernel.fixed(3, 3, weights3, 1, 1, false);

  var mean3     = img.reduceNeighborhood(ee.Reducer.mean(), kernel3);
  var variance3 = img.reduceNeighborhood(ee.Reducer.variance(), kernel3);

  var sample_weights = ee.List([
    [0,0,0,0,0,0,0],[0,1,0,1,0,1,0],[0,0,0,0,0,0,0],
    [0,1,0,1,0,1,0],[0,0,0,0,0,0,0],[0,1,0,1,0,1,0],[0,0,0,0,0,0,0]
  ]);
  var sample_kernel = ee.Kernel.fixed(7, 7, sample_weights, 3, 3, false);
  var sample_mean   = mean3.neighborhoodToBands(sample_kernel);
  var sample_var    = variance3.neighborhoodToBands(sample_kernel);

  var gradients = sample_mean.select(1).subtract(sample_mean.select(7)).abs();
  gradients = gradients.addBands(sample_mean.select(6).subtract(sample_mean.select(2)).abs());
  gradients = gradients.addBands(sample_mean.select(3).subtract(sample_mean.select(5)).abs());
  gradients = gradients.addBands(sample_mean.select(0).subtract(sample_mean.select(8)).abs());
  var max_gradient = gradients.reduce(ee.Reducer.max());
  var gradmask     = gradients.eq(max_gradient);
  gradmask = gradmask.addBands(gradmask);

  var directions = sample_mean.select(1).subtract(sample_mean.select(4))
    .gt(sample_mean.select(4).subtract(sample_mean.select(7))).multiply(1);
  directions = directions.addBands(sample_mean.select(6).subtract(sample_mean.select(4))
    .gt(sample_mean.select(4).subtract(sample_mean.select(2))).multiply(2));
  directions = directions.addBands(sample_mean.select(3).subtract(sample_mean.select(4))
    .gt(sample_mean.select(4).subtract(sample_mean.select(5))).multiply(3));
  directions = directions.addBands(sample_mean.select(0).subtract(sample_mean.select(4))
    .gt(sample_mean.select(4).subtract(sample_mean.select(8))).multiply(4));
  directions = directions.addBands(directions.select(0).not().multiply(5));
  directions = directions.addBands(directions.select(1).not().multiply(6));
  directions = directions.addBands(directions.select(2).not().multiply(7));
  directions = directions.addBands(directions.select(3).not().multiply(8));
  directions = directions.updateMask(gradmask);
  directions = directions.reduce(ee.Reducer.sum());

  var sample_stats = sample_var.divide(sample_mean.multiply(sample_mean));
  var sigmaV = sample_stats.toArray().arraySort().arraySlice(0,0,5)
                 .arrayReduce(ee.Reducer.mean(), [0]);

  var rect_weights = ee.List.repeat(ee.List.repeat(0,7),3).cat(ee.List.repeat(ee.List.repeat(1,7),4));
  var diag_weights = ee.List([
    [1,0,0,0,0,0,0],[1,1,0,0,0,0,0],[1,1,1,0,0,0,0],[1,1,1,1,0,0,0],
    [1,1,1,1,1,0,0],[1,1,1,1,1,1,0],[1,1,1,1,1,1,1]
  ]);
  var rect_kernel = ee.Kernel.fixed(7, 7, rect_weights, 3, 3, false);
  var diag_kernel = ee.Kernel.fixed(7, 7, diag_weights, 3, 3, false);

  var dir_mean = img.reduceNeighborhood(ee.Reducer.mean(), rect_kernel).updateMask(directions.eq(1));
  var dir_var  = img.reduceNeighborhood(ee.Reducer.variance(), rect_kernel).updateMask(directions.eq(1));
  dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), diag_kernel).updateMask(directions.eq(2)));
  dir_var  = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), diag_kernel).updateMask(directions.eq(2)));

  for (var i = 1; i < 4; i++) {
    dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), rect_kernel.rotate(i)).updateMask(directions.eq(2*i+1)));
    dir_var  = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), rect_kernel.rotate(i)).updateMask(directions.eq(2*i+1)));
    dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), diag_kernel.rotate(i)).updateMask(directions.eq(2*i+2)));
    dir_var  = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), diag_kernel.rotate(i)).updateMask(directions.eq(2*i+2)));
  }

  dir_mean = dir_mean.reduce(ee.Reducer.sum());
  dir_var  = dir_var.reduce(ee.Reducer.sum());

  var varX   = dir_var.subtract(dir_mean.multiply(dir_mean).multiply(sigmaV)).divide(sigmaV.add(1.0));
  var b      = varX.divide(dir_var);
  var result = dir_mean.add(b.multiply(img.subtract(dir_mean)));
  return result.arrayFlatten([["filtered"]]);
}

// --------------------------------------------------------------------
// FUNGSI UTAMA PREPROCESSING SENTINEL-1
// Urutan operasi (sesuai Bab 3.2.3.2 skripsi):
//   1. Border noise correction
//   2. Konversi ke linear
//   3. Cosine correction  ← PERBAIKAN: angle tidak lagi ikut dikalikan cf
//   4. Refined Lee filter
//   5. Hitung indeks dari intensity (sesuai Muradi et al., 2024)
//   6. Konversi kembali ke dB
//   7. Post-correction outlier filter  ← PERBAIKAN: dipindah ke sini
// --------------------------------------------------------------------
function preprocessS1(image) {
  // Langkah 1 (Border noise correction)
  image = maskBorderNoise(image);

  // Langkah 2 (Konversi to linear)
  var angle  = image.select("angle");
  var vv_lin = toLinear(image.select("VV")).rename("VV");
  var vh_lin = toLinear(image.select("VH")).rename("VH");

  // Langkah 3 (Cosine correction)
  var angleRad = angle.multiply(Math.PI / 180);
  var cf       = ee.Image(37.5 * Math.PI / 180).cos().divide(angleRad.cos());
  vv_lin = vv_lin.multiply(cf);
  vh_lin = vh_lin.multiply(cf);

  // Langkah 4 (Refined Lee Filter)
  var vv_f = RefinedLee(vv_lin).rename("VV");
  var vh_f = RefinedLee(vh_lin).rename("VH");

  // Langkah 5 (Hitung Indeks)
  // PERBAIKAN 2: epsilon clipping pada VV sebelum pembagian
  // mencegah RPI -> inf dan NDPI negatif akibat VV mendekati nol
  // pada piksel badan air atau radar shadow (setara < -60 dB)
  var eps  = ee.Image(1e-6);
  var vv_s = vv_f.max(eps); // agar pembagian tidak nol
  var rpi  = vh_f.divide(vv_s).rename("RPI");
  var ndpi = vv_s.subtract(vh_f).divide(vv_s.add(vh_f)).rename("NDPI");
  var api  = vh_f.add(vv_f).divide(2).rename("API");

  // Langkah 6 (Konversi to dB)
  var vv_db = toDB(vv_f).rename("VV_db");
  var vh_db = toDB(vh_f).rename("VH_db");

  // Langkah 7 — (post correction)
  // PERBAIKAN 3: filter outlier SETELAH cosine correction
  // Thorp (2021) menetapkan -40 s.d. +5 dB sebagai batas histogram
  // (bukan remove outlier). Untuk pipeline CSV float, kita terapkan
  // sebagai hard mask post-correction agar nilai residual akibat
  // perkalian cf tidak lolos ke dataset final
  var finalMask = vv_db.gt(-40).and(vv_db.lt(5))
                       .and(vh_db.gt(-40)).and(vh_db.lt(5));
  return vv_db.addBands([vh_db, rpi, ndpi, api])
              .updateMask(finalMask)
              .copyProperties(image, ["system:time_start"]);
}

// Koleksi S1: Ascending, IW mode, dual-pol VV+VH, resolusi 10m
var s1 = ee.ImageCollection("COPERNICUS/S1_GRD")
  .filterBounds(karawang)
  .filterDate(startDate, endDate)
  .filter(ee.Filter.eq("instrumentMode", "IW"))
  .filter(ee.Filter.listContains("transmitterReceiverPolarisation", "VV"))
  .filter(ee.Filter.listContains("transmitterReceiverPolarisation", "VH"))
  .filter(ee.Filter.eq("orbitProperties_pass", "ASCENDING"))
  .filter(ee.Filter.eq("resolution_meters", 10))
  .map(preprocessS1)
  .select(["VV_db", "VH_db", "RPI", "NDPI", "API"]);

// ====================================================================
// SECTION 3: PREPROCESSING SENTINEL-2 (S2)
// ====================================================================
// Cloud masking berbasis SCL (Sen2Cor) —
// lebih presisi dari QA60 (Thorp 2021)
// Koleksi S2_SR_HARMONIZED sudah menerapkan offset harmonisasi antar baseline
// secara otomatis; tidak perlu subtract(1000) manual
function maskS2_SCL(image) {
  var scl = image.select("SCL");
  // Kelas yang dihapus: 1=Saturated, 3=Cloud Shadow, 8=Cloud Med, 9=Cloud High, 10=Cirrus
  var cloudMask = scl.neq(1).and(scl.neq(3)).and(scl.neq(8))
                     .and(scl.neq(9)).and(scl.neq(10));
  // divide(10000): konversi DN -> reflektansi BOA [0,1]
  var optical = image.select(["B2","B3","B4","B8","B11"]).divide(10000);
  return optical.updateMask(cloudMask)
                .copyProperties(image, ["system:time_start"]);
}

// fungsi hitung indeks
function addS2_Indices(image) {
  var ndvi = image.normalizedDifference(["B8","B4"]).rename("NDVI");
  var evi  = image.expression(
    "2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))",
    { NIR: image.select("B8"), RED: image.select("B4"), BLUE: image.select("B2") }
  ).rename("EVI");
  var lswi = image.normalizedDifference(["B8","B11"]).rename("LSWI");
  return image.addBands([ndvi, evi, lswi]);
}

var s2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterDate(startDate, endDate)
  .filterBounds(karawang)
  .map(maskS2_SCL)
  .map(addS2_Indices)
  .select(["B2","B3","B4","B8","B11","NDVI","EVI","LSWI"]);

// ====================================================================
// SECTION 4: MEDIAN COMPOSITE PER PERIODE PARUH BULAN
// ====================================================================
function createCalendarTimeSeries(collection, sourceName) {
  var diff   = endDate.difference(startDate, "month").ceil();
  var months = ee.List.sequence(0, diff.subtract(1));

  var timeSeries = months.map(function(m) {
    var currentMonth = startDate.advance(m, "month");
    var p1_start     = currentMonth;
    var p1_end       = currentMonth.advance(15, "day");
    var p2_start     = p1_end;
    var p2_end       = currentMonth.advance(1, "month");

    var processPeriod = function(start, end, labelPeriode) {
      var img       = collection.filterDate(start, end).median();
      var bandCheck = sourceName === "S1" ? "VV_db" : "NDVI";
      return ee.Algorithms.If(
        img.bandNames().contains(bandCheck),
        img.set("system:time_start", start.millis())
           .set("Tanggal", start.format("YYYY-MM-dd"))
           .set("Periode", labelPeriode)
           .set("Source", sourceName),
        null
      );
    };

    return [processPeriod(p1_start, p1_end, "P1"),
            processPeriod(p2_start, p2_end, "P2")];
  });

  return ee.ImageCollection.fromImages(timeSeries.flatten().removeAll([null]));
}
var s1_series = createCalendarTimeSeries(s1, "S1");
var s2_series = createCalendarTimeSeries(s2, "S2");

// ====================================================================
// SECTION 5: EKSTRAKSI TIME SERIES KE TITIK KSA
// ====================================================================
function extractToTable(series, collectionTitik) {
  var extracted = series.map(function(img) {
    return img.reduceRegions({
      collection: collectionTitik,
      reducer:    ee.Reducer.first(),
      scale:      10,    // resolusi native S1/S2
      tileScale:  16     // mengurangi beban memori GEE
    }).map(function(feature) {
      return feature.set({
        Tanggal:   img.get("Tanggal"),
        Periode:   img.get("Periode"),
        Satellite: img.get("Source")
      });
    });
  });
  return extracted.flatten().filter(ee.Filter.notNull(["Tanggal"]));
}

var table_S1 = extractToTable(s1_series, titikSampel);
var table_S2 = extractToTable(s2_series, titikSampel);

// ====================================================================
// SECTION 6: EXPORT CSV
// ====================================================================
Export.table.toDrive({
  collection:     table_S1,
  description:    "S1_Data_Karawang_15Days",
  folder:         "00. Skripsi_Data KSA",
  fileNamePrefix: "S1_Data Karawang",
  fileFormat:     "CSV",
  selectors: ["TitikAmatX","TitikAmatY","Tanggal","Periode",
              "VV_db","VH_db","RPI","NDPI","API"]
});

Export.table.toDrive({
  collection:     table_S2,
  description:    "S2_Data_Karawang_15Days",
  folder:         "00. Skripsi_Data KSA",
  fileNamePrefix: "S2_Data Karawang",
  fileFormat:     "CSV",
  selectors: ["TitikAmatX","TitikAmatY","Tanggal","Periode",
              "B2","B3","B4","B8","B11","NDVI","EVI","LSWI"]
});