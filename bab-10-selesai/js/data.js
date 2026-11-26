// data.js — konten NusaLearn (array dari Bab 7, dirender script.js)

const daftarFitur = [
  { judul: "Kurikulum Terstruktur", deskripsi: "Materi disusun bertahap dari HTML, CSS, hingga JavaScript — cocok untuk pemula tanpa latar IT." },
  { judul: "Mentor Praktisi",       deskripsi: "Dibimbing langsung oleh developer yang aktif bekerja di industri teknologi." },
  { judul: "Proyek Portofolio",     deskripsi: "Setiap modul ditutup dengan proyek nyata yang bisa dipamerkan ke calon perusahaan." },
  { judul: "Sertifikat Kelulusan",  deskripsi: "Dapatkan sertifikat terverifikasi setelah menyelesaikan seluruh modul dan ujian akhir." },
  { judul: "Komunitas Aktif",       deskripsi: "Bergabung dengan 8.000+ member untuk diskusi, code review, dan info lowongan kerja." },
  { judul: "Akses Selamanya",       deskripsi: "Sekali bayar, akses seluruh materi dan pembaruan kurikulum selamanya." }
];

const daftarPaket = [
  { id: "pemula", nama: "Pemula",    harga: 0,      label: "Gratis",    catatan: "",           unggulan: false, fasilitas: ["Modul HTML dasar", "Akses komunitas"] },
  { id: "pro",    nama: "Pro",       harga: 299000, label: "Rp299.000", catatan: "/selamanya", unggulan: true,  fasilitas: ["Semua modul & pembaruan", "Proyek portofolio", "Sertifikat kelulusan", "Code review mentor"] },
  { id: "tim",    nama: "Kelas Tim", harga: 999000, label: "Rp999.000", catatan: "/5 orang",   unggulan: false, fasilitas: ["Semua fasilitas Pro", "Untuk 5 anggota tim", "Sesi mentoring privat"] }
];

const daftarTestimoni = [
  { nama: "Dewi Lestari",   peran: "Pembaca",      kutipan: "Materinya runtut banget. Saya yang awalnya nggak tahu apa-apa soal coding, sekarang sudah bisa bikin website sendiri." },
  { nama: "Rizky Pratama",  peran: "Fresh Graduate", kutipan: "Proyek portofolio dari NusaLearn jadi andalan saya saat interview. Alhamdulillah langsung diterima kerja." },
  { nama: "Sari Wulandari", peran: "Freelancer",     kutipan: "Sebagai freelancer, sertifikat dan komunitasnya sangat membantu saya mendapat klien pertama." }
];
