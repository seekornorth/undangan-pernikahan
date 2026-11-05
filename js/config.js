/* =========================================================
   KONFIGURASI UNDANGAN NGUNDUH MANTU
   Ubah nilai di bawah ini saja. Tidak perlu menyentuh file lain.
   Nilai yang masih memakai tanda [ ] adalah placeholder.
   ========================================================= */

window.WEDDING = {
  /* Tanggal dan jam acara ngunduh mantu.
     Format ISO dengan zona waktu +07:00 (WIB).
     Dipakai untuk hitungan mundur dan tombol Simpan Tanggal. */
  dateISO: "2026-12-12T11:00:00+07:00",

  /* Teks tanggal yang tampil di halaman.
     Samakan dengan dateISO di atas. */
  event: {
    dateLabel: "Sabtu, 12 Desember 2026",
    dateShort: "12 . 12 . 2026",
    dayName: "Sabtu",
    day: "12",
    month: "Desember",
    year: "2026",
    timeLabel: "11.00 - 14.00 WIB",
    venue: "[Nama Gedung atau Rumah]",
    address: "[Alamat lengkap, Kota]",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Yogyakarta"
  },

  /* Tombol Simpan Tanggal (Google Calendar) */
  calendarTitle: "Ngunduh Mantu Mifthakhul Huda & Tri Wulandari",
  calendarDetails: "Ngunduh mantu Mifthakhul Huda dan Tri Wulandari. Akad nikah telah dilaksanakan.",

  /* Nomor WhatsApp untuk RSVP: 62 + nomor tanpa 0 di depan.
     GANTI sebelum undangan dibagikan. */
  rsvpWhatsapp: "6281234567890",

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