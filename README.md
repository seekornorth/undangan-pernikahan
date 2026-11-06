# Undangan Pernikahan: Mifthakhul Huda & Tri Wulandari

Undangan statis tanpa build step. Tema adat Jawa, hitam dan gold, minimalis elegan.
Semua foto yang dipakai adalah sesi foto busana adat Jawa.

## Struktur

```
index.html            markup dan seluruh teks undangan
css/style.css         tampilan, termasuk versi layar pendek
js/config.js          data acara, WhatsApp, dan rekening hadiah
js/main.js            cover, menu, hitungan mundur, RSVP, galeri
assets/img/           foto WebP yang sudah dioptimalkan
```

Tidak ada dependency build. Hanya font Google (Cormorant Garamond dan Jost)
yang dimuat lewat CDN.

## Yang perlu diisi

Semua data acara ada di `js/config.js`. Nilai yang masih memakai tanda `[ ]`
adalah placeholder dan akan tampil apa adanya di halaman.

| Field | Keterangan |
|---|---|
| `dateISO` | tanggal dan jam acara pernikahan, format `2026-12-12T11:00:00+07:00` |
| `event.dateLabel` | tanggal lengkap, misalnya `Sabtu, 12 Desember 2026` |
| `event.dateShort` | tanggal ringkas untuk label foto, misalnya `12 . 12 . 2026` |
| `event.dayName`, `event.day`, `event.month`, `event.year` | bagian tanggal di kartu acara |
| `event.timeLabel` | jam acara, misalnya `11.00 - 14.00 WIB` |
| `event.venue` | nama gedung atau rumah |
| `event.address` | alamat lengkap dan kota |
| `event.mapsUrl` | link Google Maps lokasi acara |
| `calendarTitle`, `calendarDetails` | isi tombol Simpan Tanggal |
| `rsvpWhatsapp` | nomor WhatsApp, format `62...` tanpa `0` di depan |
| `gift.accounts[].bank`, `number`, `holder` | rekening untuk tanda kasih |
| `gift.address` | alamat pengiriman hadiah |
| `guestFallback` | nama tamu jika URL dibuka tanpa `?to=` |

Nama orang tua masih ditulis langsung di `index.html`:

- `[Nama Bapak]` dan `[Nama Ibu]` pada bagian pembuka, untuk orang tua mempelai pria
- `[Nama Bapak]` dan `[Nama Ibu]` pada kartu Mifthakhul Huda
- `[Nama Bapak]` dan `[Nama Ibu]` pada kartu Tri Wulandari

Ganti setiap pasangan dengan nama yang benar. Gunakan fitur cari dan ganti
dengan hati-hati karena teksnya sama.

## Bagian yang sudah final

- Akad nikah hanya disebut singkat di bagian Acara, tanpa tanggal.
- Undangan ini berfokus pada satu acara pernikahan.
- Hitungan mundur dan tombol Simpan Tanggal mengarah ke `dateISO`.
- Tombol salin rekening dan alamat otomatis nonaktif selama data masih
  berupa placeholder.
- Tautan Lihat lokasi disembunyikan selama nama tempat masih placeholder.
- Jumlah tamu disembunyikan jika tamu memilih Tidak hadir.
- Galeri berisi 12 foto adat. Ketuk foto untuk membuka tampilan besar.

## Nama tamu lewat URL

Bagikan tautan dengan parameter `to`:

```
https://seekornorth.github.io/undangan-pernikahan/?to=Bapak%20Budi%20Santoso
```

Nama akan tampil di halaman pembuka. Spasi harus di-encode sebagai `%20`.

## Menjalankan lokal

```bash
python3 -m http.server 8080
```

Buka `http://localhost:8080` di browser.

## Deploy ke GitHub Pages

Repo: `seekornorth/undangan-pernikahan`, branch `main`, folder root.

```bash
git init
git add .
git commit -m "Undangan pernikahan"
git branch -M main
git remote add origin https://github.com/seekornorth/undangan-pernikahan.git
git push -u origin main
```

Setelah itu buka Settings > Pages, pilih Source: Deploy from a branch,
Branch: `main`, Folder: `/ (root)`. Situs akan tersedia di
`https://seekornorth.github.io/undangan-pernikahan/`.

## Foto

Semua foto berada di `assets/img/` dalam format WebP. Untuk mengganti foto,
pakai nama file yang sama agar tidak perlu mengubah markup:

- `cover.webp` dan `hero.webp`: foto pembuka
- `huda.webp` dan `wulan.webp`: foto mempelai, rasio 4:5
- `gallery-01.webp` sampai `gallery-12.webp`: galeri
- `closing.webp`: foto penutup