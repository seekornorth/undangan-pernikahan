# Undangan Pernikahan: Mifthakhul Huda & Tri Wulandari

Undangan statis tanpa build step. Tema adat Jawa, hitam dan gold, minimalis elegan.
Selain potret busana adat, halaman memuat tiga foto momen perjalanan pasangan.

## Struktur

```
index.html            markup dan seluruh teks undangan
css/style.css         tampilan, termasuk versi layar pendek
js/config.js          data acara, WhatsApp, dan rekening hadiah
js/main.js            cover, menu, hitungan mundur, RSVP, perjalanan
assets/img/           foto WebP yang sudah dioptimalkan
```

Tidak ada dependency build. Hanya font Google (Cormorant Garamond dan Jost)
yang dimuat lewat CDN.

## Data acara

Tanggal, tempat, dan tautan dipusatkan di `js/config.js`. Nilai yang masih
memakai tanda `[ ]` adalah placeholder dan akan tampil apa adanya di halaman.

| Field | Keterangan |
|---|---|
| `dateISO` | tanggal dan jam acara, format `2026-12-13T08:00:00+07:00` |
| `event.dateLabel` | tanggal lengkap, `Minggu, 13 Desember 2026` |
| `event.dateShort` | tanggal ringkas untuk label foto, `13 . 12 . 2026` |
| `event.dayName`, `event.day`, `event.month`, `event.year` | bagian tanggal di kartu acara |
| `event.timeLabel` | jam acara, `08.00 - selesai WIB` |
| `event.venue` | nama lokasi, `Rumah Bapak Sukimin` |
| `event.address` | alamat lengkap dan kota |
| `event.mapsUrl` | link Google Maps lokasi acara |
| `calendarTitle`, `calendarDetails` | isi tombol Simpan Tanggal |
| `rsvpWhatsapp` | nomor WhatsApp konfirmasi, `6282121148783` |
| `gift.accounts[].bank`, `number`, `holder` | rekening untuk tanda kasih (SeaBank, a.n. Mifthakhul Huda) |
| `guestFallback` | nama tamu jika URL dibuka tanpa `?to=` |

Nomor WhatsApp konfirmasi sudah terisi, jadi tombol RSVP langsung membuka
WhatsApp dengan pesan yang sudah diisi. Jika nomornya dikosongkan lagi, tombol
hanya menampilkan peringatan. Selama rekening masih berupa placeholder, tombol
salin otomatis nonaktif.

Nama mempelai dan orang tua ditulis langsung di `index.html`:

- Mifthakhul Huda, putra Bapak Purwanto dan Ibu Sri Handayani
- Tri Wulandari, putri Bapak Wagiman dan Ibu Sumarni

## Bagian yang sudah final

- Acara pernikahan dilaksanakan pada 3 Desember 2026. Undangan ini untuk
  jamuan dan silaturahmi pada 13 Desember 2026, seperti dijelaskan di bagian
  Acara. Jamuan dimulai pukul 08.00 WIB dan berlangsung sampai selesai.
- Hitungan mundur dan tombol Simpan Tanggal mengarah ke `dateISO`.
- Bagian Hadiah hanya menampilkan satu nomor rekening SeaBank. Tombol
  salin otomatis nonaktif selama data masih berupa placeholder.
- Tautan Lihat lokasi disembunyikan selama nama tempat masih placeholder.
- Jumlah tamu disembunyikan jika tamu memilih Tidak hadir.
- Perjalanan berisi tiga momen: pertama bertemu, lamaran, dan acara
  pernikahan. Di bawahnya ada galeri empat potret adat. Ketuk foto untuk
  membuka tampilan besar.
- Nomor bagian mengikuti urutan: 01 Mempelai, 02 Acara, 03 Perjalanan,
  04 Galeri, 05 Hadiah, 06 RSVP.
- Animasi hanya untuk menuntun mata: teks naik pelan, foto tersingkap.
  Semuanya berhenti jika pengguna memilih kurangi gerak
  (`prefers-reduced-motion`).

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

Jika browser masih menampilkan versi lama, lakukan hard reload atau naikkan
nilai `?v=` pada tautan CSS dan JS di `index.html`.

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

Semua foto yang dimuat berada di `assets/img/` dalam format WebP.

- `cover.webp` dan `hero.webp`: foto pembuka
- `huda-new.webp` dan `wulan-new.webp`: foto mempelai, rasio 4:5 (900x1125)
- `pertamaketemu.webp`: momen pertama bertemu, rasio 1:1 (720x720)
- `lamaran.webp`: momen lamaran, rasio 4:3 (1080x784)
- `lamaran-640.webp`: versi 640x465 untuk layar kecil lewat `srcset`
- `nikahan.webp`: momen acara pernikahan, rasio 4:5 (640x800)
- `gallery-08.webp`: versi 1000x1250 untuk layar besar lewat `srcset`
- `closing.webp`: foto penutup
- `og.jpg`: gambar pratinjau 1200x630 untuk media sosial

Foto sumber `pertamaketemu.jpg` dan `lamaran.jpg` disimpan di folder yang sama,
tidak dimuat oleh halaman. Foto `gallery-03`, `gallery-04`, `gallery-06`, dan
varian `-640`-nya tidak lagi dipakai oleh tata letak Perjalanan.