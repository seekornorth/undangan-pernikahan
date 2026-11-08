/* =========================================================
   KONFIGURASI UNDANGAN PERNIKAHAN
   Ubah nilai di bawah ini saja. Tidak perlu menyentuh file lain.
   Nilai yang masih memakai tanda [ ] adalah placeholder.
   ========================================================= */

window.WEDDING = {
  /* Tanggal dan jam acara pernikahan.
     Format ISO dengan zona waktu +07:00 (WIB).
     Dipakai untuk hitungan mundur dan tombol Simpan Tanggal. */
  dateISO: "2026-12-13T11:00:00+07:00",

  /* Teks tanggal yang tampil di halaman.
     Samakan dengan dateISO di atas. */
  event: {
    dateLabel: "Minggu, 13 Desember 2026",
    dateShort: "13 . 12 . 2026",
    dayName: "Minggu",
    day: "13",
    month: "Desember",
    year: "2026",
    timeLabel: "11.00 - 14.00 WIB",
    venue: "Rumah Bapak Sukimin",
    address: "Kedung Liwung, RT 03/RW 03, Gosono, Wonosegoro, Boyolali, Jawa Tengah",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rumah%20Bapak%20Sukimin%2C%20Kedung%20Liwung%2C%20RT%2003%2FRW%2003%2C%20Gosono%2C%20Wonosegoro%2C%20Boyolali%2C%20Jawa%20Tengah"
  },

  /* Tombol Simpan Tanggal (Google Calendar) */
  calendarTitle: "Pernikahan Mifthakhul Huda & Tri Wulandari",
  calendarDetails: "Jamuan dan silaturahmi pernikahan Mifthakhul Huda dan Tri Wulandari.",

  /* Nomor WhatsApp untuk RSVP: 62 + nomor tanpa 0 di depan.
     Biarkan kosong sampai nomor asli tersedia. Tombol akan
     menampilkan peringatan, bukan membuka nomor yang salah. */
  rsvpWhatsapp: "",

  /* Hadiah. Ganti nomor rekening dan alamat di bawah.
     Selama masih ada tanda [ ], tombol salin dinonaktifkan
     agar tamu tidak menyalin data yang belum jadi. */
  gift: {
    accounts: [
      {
        bank: "Bank BCA",
        number: "[Nomor rekening BCA]",
        holder: "a.n. Tri Wulandari"
      },
      {
        bank: "Bank Mandiri",
        number: "[Nomor rekening Mandiri]",
        holder: "a.n. Mifthakhul Huda"
      }
    ],
    address: "[Nama Penerima], [Nomor Telepon], [Alamat lengkap, Kota, Kode Pos]"
  },

  /* Nama tamu default jika URL tidak memiliki ?to= */
  guestFallback: "Tamu Undangan"
};