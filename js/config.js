/* =========================================================
   KONFIGURASI UNDANGAN PERNIKAHAN
   Ubah nilai di bawah ini saja. Tidak perlu menyentuh file lain.
   Nilai yang masih memakai tanda [ ] adalah placeholder.
   ========================================================= */

window.WEDDING = {
  /* Tanggal dan jam acara pernikahan.
     Format ISO dengan zona waktu +07:00 (WIB).
     Dipakai untuk hitungan mundur dan tombol Simpan Tanggal. */
  dateISO: "2026-12-13T08:00:00+07:00",

  /* Teks tanggal yang tampil di halaman.
     Samakan dengan dateISO di atas. */
  event: {
    dateLabel: "Minggu, 13 Desember 2026",
    dateShort: "13 . 12 . 2026",
    dayName: "Minggu",
    day: "13",
    month: "Desember",
    year: "2026",
    timeLabel: "08.00 - selesai WIB",
    venue: "Rumah Bapak Sukimin",
    address: "Kedung Liwung, RT 03/RW 03, Gosono, Wonosegoro, Boyolali, Jawa Tengah",
    mapsUrl: "https://maps.app.goo.gl/BBaLw81zxjpwjAMn6?g_st=aw"
  },

  /* Tombol Simpan Tanggal (Google Calendar) */
  calendarTitle: "Pernikahan Mifthakhul Huda & Tri Wulandari",
  calendarDetails: "Jamuan dan silaturahmi pernikahan Mifthakhul Huda dan Tri Wulandari.",

  /* Nomor WhatsApp untuk RSVP: 62 + nomor tanpa 0 di depan.
     Biarkan kosong sampai nomor asli tersedia. Tombol akan
     menampilkan peringatan, bukan membuka nomor yang salah. */
  rsvpWhatsapp: "",

  /* Hadiah. Ganti nomor rekening di bawah. Selama masih ada tanda [ ],
     tombol salin dinonaktifkan agar tamu tidak menyalin data yang belum jadi. */
  gift: {
    accounts: [
      {
        bank: "SeaBank",
        number: "901521876580",
        holder: "a.n. Mifthakhul Huda"
      }
    ]
  },

  /* Nama tamu default jika URL tidak memiliki ?to= */
  guestFallback: "Tamu Undangan"
};