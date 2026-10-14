# [Judul Skripsi]

Klasifikasi fase pertumbuhan padi menggunakan Bi-LSTM dan LSTM berbasis data Sentinel-1 dan Sentinel-2.

## Identitas

|                  |                                     |
| ---------------- | ----------------------------------- |
| Nama             | [HANA HANIFATUL HASANAH]            |
| NIM              | [222212635]                         |
| Program Studi    | [KOMPUTASI STATISTIK]               |
| Dosen Pembimbing | [Dr. Robert Kurniawan S.S.T., M.Si] |
| Tahun            | 2026                                |

## Deskripsi

Penelitian ini mengklasifikasikan fase pertumbuhan padi dengan arsitektur Bi-LSTM dan membandingkannya dengan arsitektur LSTM acuan. Data yang digunakan adalah citra Sentinel-1 (SAR), Sentinel-2 (optik), dan data Kerangka Sampel Area (KSA) BPS sebagai data acuan fase tumbuh. Hasil pemodelan disajikan melalui web dashboard.

## Struktur Repositori

```
.
├── README.md
├── .gitignore
├── source-code/     # pemrosesan citra dan pemodelan (Bi-LSTM, LSTM)
├── dataset/         # citra Sentinel-1, Sentinel-2, dan dummy data KSA
└──  artifact/        # source code web dashboard
```

## Dataset

| Data             | Sumber                          | Status                                                   |
| ---------------- | ------------------------------- | -------------------------------------------------------- |
| Sentinel-1 (GRD) | Copernicus Data Space Ecosystem | Open for public                                          |
| Sentinel-2 (L2A) | Copernicus Data Space Ecosystem | Open for public                                          |
| Data KSA         | BPS                             | Tidak open; disediakan **dummy** (data sensitif di-mask) |

Dummy data KSA memiliki struktur kolom yang sama dengan data asli sehingga kode tetap dapat dijalankan.

## Cara Menjalankan

### 1. Pemodelan

```bash
git clone [URL-repositori]
cd [nama-repositori]
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r source-code/requirements.txt
```

Jalankan notebook di `source-code/` secara berurutan:

1. [nama-notebook-pemrosesan-citra].ipynb
2. [nama-notebook-pemodelan].ipynb

### 2. Web Dashboard

```bash
cd artifact
[perintah instalasi dan menjalankan, contoh: pip install -r requirements.txt && python app.py]
```

## Catatan

- Data KSA pada repositori ini adalah data dummy dan tidak mencerminkan data asli.
- Citra Sentinel dapat diunduh ulang dari Copernicus Data Space Ecosystem.
