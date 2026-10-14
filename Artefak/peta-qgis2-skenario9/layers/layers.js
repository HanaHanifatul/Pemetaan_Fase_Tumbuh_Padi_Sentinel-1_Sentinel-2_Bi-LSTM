var wms_layers = [];


        var lyr_GoogleSatellite_0 = new ol.layer.Tile({
            'title': 'Google Satellite',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: '&nbsp;&middot; <a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Map data ©2015 Google</a>',
                url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
            })
        });
var lyr_BulanDesember2025_1 = new ol.layer.Image({
        opacity: 1,
        
    title: 'Bulan Desember 2025<br />\
    <img src="styles/legend/BulanDesember2025_1_0.png" /> Vegetatif Awal<br />\
    <img src="styles/legend/BulanDesember2025_1_1.png" /> Vegetatif Akhir<br />\
    <img src="styles/legend/BulanDesember2025_1_2.png" /> Generatif<br />\
    <img src="styles/legend/BulanDesember2025_1_3.png" /> Panen<br />\
    <img src="styles/legend/BulanDesember2025_1_4.png" /> Persiapan Lahan<br />\
    <img src="styles/legend/BulanDesember2025_1_5.png" /> Bera<br />' ,
        
        
        source: new ol.source.ImageStatic({
            url: "./layers/BulanDesember2025_1.png",
            attributions: ' ',
            projection: 'EPSG:3857',
            alwaysInRange: true,
            imageExtent: [11920640.000000, -733964.550733, 11981290.000000, -665152.391356]
        })
    });
var lyr_BulanNovember2025_2 = new ol.layer.Image({
        opacity: 1,
        
    title: 'Bulan November 2025<br />\
    <img src="styles/legend/BulanNovember2025_2_0.png" /> Vegetatif Awal<br />\
    <img src="styles/legend/BulanNovember2025_2_1.png" /> Vegetatif Akhir<br />\
    <img src="styles/legend/BulanNovember2025_2_2.png" /> Generatif<br />\
    <img src="styles/legend/BulanNovember2025_2_3.png" /> Panen<br />\
    <img src="styles/legend/BulanNovember2025_2_4.png" /> Persiapan Lahan<br />\
    <img src="styles/legend/BulanNovember2025_2_5.png" /> Bera<br />' ,
        
        
        source: new ol.source.ImageStatic({
            url: "./layers/BulanNovember2025_2.png",
            attributions: ' ',
            projection: 'EPSG:3857',
            alwaysInRange: true,
            imageExtent: [11920640.000000, -733964.550733, 11981290.000000, -665152.391356]
        })
    });
var lyr_BulanOktober2025_3 = new ol.layer.Image({
        opacity: 1,
        
    title: 'Bulan Oktober 2025<br />\
    <img src="styles/legend/BulanOktober2025_3_0.png" /> Vegetatif Awal<br />\
    <img src="styles/legend/BulanOktober2025_3_1.png" /> Vegetatif Akhir<br />\
    <img src="styles/legend/BulanOktober2025_3_2.png" /> Generatif<br />\
    <img src="styles/legend/BulanOktober2025_3_3.png" /> Panen<br />\
    <img src="styles/legend/BulanOktober2025_3_4.png" /> Persiapan Lahan<br />\
    <img src="styles/legend/BulanOktober2025_3_5.png" /> Bera<br />' ,
        
        
        source: new ol.source.ImageStatic({
            url: "./layers/BulanOktober2025_3.png",
            attributions: ' ',
            projection: 'EPSG:3857',
            alwaysInRange: true,
            imageExtent: [11920640.000000, -733964.550733, 11981290.000000, -665152.391356]
        })
    });
var lyr_BulanSeptember2025_4 = new ol.layer.Image({
        opacity: 1,
        
    title: 'Bulan September 2025<br />\
    <img src="styles/legend/BulanSeptember2025_4_0.png" /> Vegetatif Awal<br />\
    <img src="styles/legend/BulanSeptember2025_4_1.png" /> Vegetatif Akhir<br />\
    <img src="styles/legend/BulanSeptember2025_4_2.png" /> Generatif<br />\
    <img src="styles/legend/BulanSeptember2025_4_3.png" /> Panen<br />\
    <img src="styles/legend/BulanSeptember2025_4_4.png" /> Persiapan Lahan<br />\
    <img src="styles/legend/BulanSeptember2025_4_5.png" /> Bera<br />' ,
        
        
        source: new ol.source.ImageStatic({
            url: "./layers/BulanSeptember2025_4.png",
            attributions: ' ',
            projection: 'EPSG:3857',
            alwaysInRange: true,
            imageExtent: [11920640.000000, -733964.550733, 11981290.000000, -665152.391356]
        })
    });
var lyr_BulanAgustus2025_5 = new ol.layer.Image({
        opacity: 1,
        
    title: 'Bulan Agustus 2025<br />\
    <img src="styles/legend/BulanAgustus2025_5_0.png" /> Vegetatif Awal<br />\
    <img src="styles/legend/BulanAgustus2025_5_1.png" /> Vegetatif Akhir<br />\
    <img src="styles/legend/BulanAgustus2025_5_2.png" /> Generatif<br />\
    <img src="styles/legend/BulanAgustus2025_5_3.png" /> Panen<br />\
    <img src="styles/legend/BulanAgustus2025_5_4.png" /> Persiapan Lahan<br />\
    <img src="styles/legend/BulanAgustus2025_5_5.png" /> Bera<br />' ,
        
        
        source: new ol.source.ImageStatic({
            url: "./layers/BulanAgustus2025_5.png",
            attributions: ' ',
            projection: 'EPSG:3857',
            alwaysInRange: true,
            imageExtent: [11920640.000000, -733964.550733, 11981290.000000, -665152.391356]
        })
    });
var lyr_BulanJuli2025_6 = new ol.layer.Image({
        opacity: 1,
        
    title: 'Bulan Juli 2025<br />\
    <img src="styles/legend/BulanJuli2025_6_0.png" /> Vegetatif Awal<br />\
    <img src="styles/legend/BulanJuli2025_6_1.png" /> Vegetatif Akhir<br />\
    <img src="styles/legend/BulanJuli2025_6_2.png" /> Generatif<br />\
    <img src="styles/legend/BulanJuli2025_6_3.png" /> Panen<br />\
    <img src="styles/legend/BulanJuli2025_6_4.png" /> Persiapan Lahan<br />\
    <img src="styles/legend/BulanJuli2025_6_5.png" /> Bera<br />' ,
        
        
        source: new ol.source.ImageStatic({
            url: "./layers/BulanJuli2025_6.png",
            attributions: ' ',
            projection: 'EPSG:3857',
            alwaysInRange: true,
            imageExtent: [11920640.000000, -733964.550733, 11981290.000000, -665152.391356]
        })
    });
var format_BatasWilayahKabupatenKarawangperKecamatan_7 = new ol.format.GeoJSON();
var features_BatasWilayahKabupatenKarawangperKecamatan_7 = format_BatasWilayahKabupatenKarawangperKecamatan_7.readFeatures(json_BatasWilayahKabupatenKarawangperKecamatan_7, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_BatasWilayahKabupatenKarawangperKecamatan_7 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_BatasWilayahKabupatenKarawangperKecamatan_7.addFeatures(features_BatasWilayahKabupatenKarawangperKecamatan_7);
var lyr_BatasWilayahKabupatenKarawangperKecamatan_7 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_BatasWilayahKabupatenKarawangperKecamatan_7, 
                style: style_BatasWilayahKabupatenKarawangperKecamatan_7,
                popuplayertitle: 'Batas Wilayah Kabupaten Karawang per Kecamatan',
                interactive: true,
                title: '<img src="styles/legend/BatasWilayahKabupatenKarawangperKecamatan_7.png" /> Batas Wilayah Kabupaten Karawang per Kecamatan'
            });
var format_GroundTruthDesember_8 = new ol.format.GeoJSON();
var features_GroundTruthDesember_8 = format_GroundTruthDesember_8.readFeatures(json_GroundTruthDesember_8, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_GroundTruthDesember_8 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_GroundTruthDesember_8.addFeatures(features_GroundTruthDesember_8);
var lyr_GroundTruthDesember_8 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_GroundTruthDesember_8, 
                style: style_GroundTruthDesember_8,
                popuplayertitle: 'Ground Truth Desember',
                interactive: true,
                title: '<img src="styles/legend/GroundTruthDesember_8.png" /> Ground Truth Desember'
            });
var group_PetaPrediksiFaseTumbuhPadiBulanan_Skenario9 = new ol.layer.Group({
                                layers: [lyr_BulanDesember2025_1,lyr_BulanNovember2025_2,lyr_BulanOktober2025_3,lyr_BulanSeptember2025_4,lyr_BulanAgustus2025_5,lyr_BulanJuli2025_6,],
                                fold: 'close',
                                title: 'Peta Prediksi Fase Tumbuh Padi Bulanan_Skenario 9'});

lyr_GoogleSatellite_0.setVisible(true);lyr_BulanDesember2025_1.setVisible(true);lyr_BulanNovember2025_2.setVisible(false);lyr_BulanOktober2025_3.setVisible(false);lyr_BulanSeptember2025_4.setVisible(false);lyr_BulanAgustus2025_5.setVisible(false);lyr_BulanJuli2025_6.setVisible(false);lyr_BatasWilayahKabupatenKarawangperKecamatan_7.setVisible(true);lyr_GroundTruthDesember_8.setVisible(true);
var layersList = [lyr_GoogleSatellite_0,group_PetaPrediksiFaseTumbuhPadiBulanan_Skenario9,lyr_BatasWilayahKabupatenKarawangperKecamatan_7,lyr_GroundTruthDesember_8];
lyr_BatasWilayahKabupatenKarawangperKecamatan_7.set('fieldAliases', {'Kode_Kec': 'Kode_Kec', 'Kode_Kab': 'Kode_Kab', 'Kode_Prov': 'Kode_Prov', 'Kecamatan': 'Kecamatan', 'Kabupaten': 'Kabupaten', 'Provinsi': 'Provinsi', 'Metadata': 'Metadata', 'Updated': 'Updated', });
lyr_GroundTruthDesember_8.set('fieldAliases', {'fid': 'fid', 'Nama': 'Nama', 'Lattitude': 'Lattitude', 'Longitude': 'Longitude', 'Waktu': 'Waktu', 'Tanggal': 'Tanggal', 'Lokasi': 'Lokasi', 'Fase Ground Check': 'Fase Ground Check', 'Photo': 'Photo', });
lyr_BatasWilayahKabupatenKarawangperKecamatan_7.set('fieldImages', {'Kode_Kec': 'TextEdit', 'Kode_Kab': 'TextEdit', 'Kode_Prov': 'TextEdit', 'Kecamatan': 'TextEdit', 'Kabupaten': 'TextEdit', 'Provinsi': 'TextEdit', 'Metadata': 'TextEdit', 'Updated': 'TextEdit', });
lyr_GroundTruthDesember_8.set('fieldImages', {'fid': 'TextEdit', 'Nama': 'TextEdit', 'Lattitude': 'TextEdit', 'Longitude': 'TextEdit', 'Waktu': 'TextEdit', 'Tanggal': 'TextEdit', 'Lokasi': 'TextEdit', 'Fase Ground Check': 'TextEdit', 'Photo': 'ExternalResource', });
lyr_BatasWilayahKabupatenKarawangperKecamatan_7.set('fieldLabels', {'Kode_Kec': 'hidden field', 'Kode_Kab': 'hidden field', 'Kode_Prov': 'hidden field', 'Kecamatan': 'inline label - always visible', 'Kabupaten': 'inline label - always visible', 'Provinsi': 'inline label - always visible', 'Metadata': 'hidden field', 'Updated': 'hidden field', });
lyr_GroundTruthDesember_8.set('fieldLabels', {'fid': 'hidden field', 'Nama': 'inline label - always visible', 'Lattitude': 'inline label - always visible', 'Longitude': 'inline label - always visible', 'Waktu': 'inline label - always visible', 'Tanggal': 'inline label - always visible', 'Lokasi': 'inline label - always visible', 'Fase Ground Check': 'inline label - always visible', 'Photo': 'no label', });
lyr_GroundTruthDesember_8.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});