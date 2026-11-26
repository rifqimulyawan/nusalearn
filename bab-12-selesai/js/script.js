// script.js — render DOM + penangan event NusaLearn (data dari data.js)
/* ==========================================================
   TUGAS 9 — Event Handling
   Semua interaksi halaman dikendalikan lewat addEventListener:
   menu mobile, akordeon FAQ, validasi formulir langsung,
   ringkasan harga otomatis, dan toggle tema.
   ========================================================== */

// ---------- Util keamanan (Bab XI) ----------

/* Hilangkan karakter markup dari masukan pengguna.
   Contoh: "<script>alert(1)</script>" -> "scriptalert(1)/script" */
function sanitasiTeks(teks) {
  return String(teks)
    .replace(/<[^>]*>/g, "")   // buang semua tag HTML
    .replace(/[<>]/g, "")      // buang sisa kurung sudut
    .trim();
}

/* Batasi panjang masukan sebagai pertahanan tambahan */
function potong(teks, maks = 300) {
  return teks.slice(0, maks);
}

// ====== DATA & RENDER (dari Proyek 8) ======






function formatRupiah(angka) {
  if (angka === 0) return "Gratis";
  return "Rp" + angka.toLocaleString("id-ID");
}

const wadahFitur = document.getElementById("daftar-fitur");
daftarFitur.forEach((fitur) => {
  const li = document.createElement("li");
  li.className = "kartu";
  const h3 = document.createElement("h3");
  h3.textContent = fitur.judul;
  const p = document.createElement("p");
  p.textContent = fitur.deskripsi;
  li.append(h3, p);
  wadahFitur.append(li);
});

const wadahHarga = document.getElementById("daftar-harga");
daftarPaket.forEach((paket) => {
  const kartu = document.createElement("article");
  kartu.className = paket.unggulan ? "kartu-harga unggulan" : "kartu-harga";
  kartu.id = "harga-" + paket.id;
  if (paket.unggulan) {
    const lencana = document.createElement("span");
    lencana.className = "lencana";
    lencana.textContent = "Paling Populer";
    kartu.append(lencana);
  }
  const h3 = document.createElement("h3");
  h3.textContent = paket.nama;
  const harga = document.createElement("p");
  harga.className = "harga-angka";
  harga.textContent = paket.label;
  if (paket.catatan) {
    const kecil = document.createElement("small");
    kecil.textContent = " " + paket.catatan;
    harga.append(kecil);
  }
  const ul = document.createElement("ul");
  paket.fasilitas.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.append(li);
  });
  const tombol = document.createElement("a");
  tombol.className = paket.unggulan ? "tombol tombol-primer" : "tombol tombol-bayangan";
  tombol.href = "#daftar";
  tombol.textContent = "Pilih " + paket.nama;
  // Klik kartu harga → otomatis pilih paket di formulir
  tombol.addEventListener("click", () => {
    selectPaket.value = paket.id;
    selectPaket.dispatchEvent(new Event("change"));
  });
  kartu.append(h3, harga, ul, tombol);
  wadahHarga.append(kartu);
});

const wadahTestimoni = document.getElementById("daftar-testimoni");
daftarTestimoni.forEach((t) => {
  const blok = document.createElement("blockquote");
  blok.className = "kartu-testimoni";
  const p = document.createElement("p");
  p.textContent = `"${t.kutipan}"`;
  const footer = document.createElement("footer");
  footer.textContent = `— ${t.nama}, ${t.peran}`;
  blok.append(p, footer);
  wadahTestimoni.append(blok);
});

// ====== EVENT: menu mobile ======
const navToggle = document.getElementById("nav-toggle");
const navUtama = document.getElementById("nav-utama");
navToggle.addEventListener("click", () => {
  const terbuka = navUtama.classList.toggle("terbuka");
  navToggle.setAttribute("aria-expanded", terbuka);
});
// Tutup menu setelah salah satu tautan diklik
navUtama.addEventListener("click", (e) => {
  const tautan = e.target.closest("a");
  if (!tautan) return;
  // Klik tautan induk "Paket" = buka/tutup submenu, bukan navigasi
  if (tautan.classList.contains("tautan-submenu")) {
    e.preventDefault();
    const item = tautan.closest(".punya-submenu");
    const terbuka = item.classList.toggle("terbuka");
    tautan.setAttribute("aria-expanded", terbuka);
    return;
  }
  navUtama.classList.remove("terbuka");
  navToggle.setAttribute("aria-expanded", "false");
});

// ====== EVENT: akordeon FAQ ======
document.querySelectorAll(".faq-tanya").forEach((tombol) => {
  tombol.addEventListener("click", () => {
    const item = tombol.closest(".faq-item");
    const sedangTerbuka = item.classList.contains("terbuka");
    // Tutup semua item lain (akordeon satu-terbuka)
    document.querySelectorAll(".faq-item").forEach((el) => {
      el.classList.remove("terbuka");
      el.querySelector(".faq-tanya").setAttribute("aria-expanded", "false");
    });
    if (!sedangTerbuka) {
      item.classList.add("terbuka");
      tombol.setAttribute("aria-expanded", "true");
    }
  });
});

// ====== EVENT: validasi formulir ======
const form = document.getElementById("form-daftar");
const inputNama = document.getElementById("nama");
const inputEmail = document.getElementById("email");
const inputWa = document.getElementById("whatsapp");
const selectPaket = document.getElementById("paket");
const cekSetuju = document.getElementById("setuju");
const ringkasan = document.getElementById("ringkasan-paket");
const pesanSukses = document.getElementById("pesan-sukses");

function setError(input, idError, pesan) {
  const el = document.getElementById(idError);
  el.textContent = pesan;
  input.classList.toggle("input-error", pesan !== "");
  input.classList.toggle("input-valid", pesan === "");
}

function validasiNama() {
  const ok = sanitasiTeks(inputNama.value).length >= 3;
  setError(inputNama, "error-nama", ok ? "" : "Nama minimal 3 karakter (tanpa tag HTML).");
  return ok;
}
function validasiEmail() {
  const ok = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(inputEmail.value.trim());
  setError(inputEmail, "error-email", ok ? "" : "Format email tidak valid.");
  return ok;
}
function validasiWa() {
  const ok = /^[0-9]{10,13}$/.test(inputWa.value.trim());
  setError(inputWa, "error-whatsapp", ok ? "" : "Nomor WhatsApp harus 10–13 digit angka.");
  return ok;
}

// Validasi langsung saat pengguna mengetik / berpindah field
inputNama.addEventListener("input", validasiNama);
inputEmail.addEventListener("input", validasiEmail);
inputWa.addEventListener("input", validasiWa);

// ====== EVENT: ringkasan harga saat paket dipilih ======
selectPaket.addEventListener("change", () => {
  const paket = daftarPaket.find((p) => p.id === selectPaket.value);
  if (!paket) {
    ringkasan.hidden = true;
    setError(selectPaket, "error-paket", "Silakan pilih paket belajar.");
    return;
  }
  setError(selectPaket, "error-paket", "");
  ringkasan.hidden = false;
  ringkasan.innerHTML = "";
  const teks = document.createElement("span");
  teks.innerHTML = `Paket dipilih: <strong>${paket.nama}</strong> — total ` +
                   `<strong>${formatRupiah(paket.harga)}</strong>`;
  ringkasan.append(teks);
});

// ====== EVENT: submit formulir ======
form.addEventListener("submit", (e) => {
  e.preventDefault();
  pesanSukses.classList.remove("tampil");

  const okNama = validasiNama();
  const okEmail = validasiEmail();
  const okWa = validasiWa();
  const okPaket = selectPaket.value !== "";
  setError(selectPaket, "error-paket", okPaket ? "" : "Silakan pilih paket belajar.");

  const jadwal = form.querySelector("input[name='jadwal']:checked");
  document.getElementById("error-jadwal").textContent =
    jadwal ? "" : "Pilih salah satu jadwal belajar.";

  document.getElementById("error-setuju").textContent =
    cekSetuju.checked ? "" : "Anda wajib menyetujui Syarat & Ketentuan.";

  if (okNama && okEmail && okWa && okPaket && jadwal && cekSetuju.checked) {
    const paket = daftarPaket.find((p) => p.id === selectPaket.value);
    if (!paket) { selectPaket.value = ""; return; }
    // Bersihkan masukan SEBELUM dipakai/ditampilkan kembali
    const namaBersih = potong(sanitasiTeks(inputNama.value), 60);
    const emailBersih = potong(sanitasiTeks(inputEmail.value), 100);
    /* textContent -> input pengguna tidak akan pernah di-parse
       sebagai HTML, sekalipun berisi tag atau atribut event. */
    pesanSukses.textContent =
      `Terima kasih, ${namaBersih}! Pendaftaran paket ` +
      `${paket.nama} berhasil diterima. Info selanjutnya dikirim ke ` +
      `${emailBersih}.`;
    pesanSukses.classList.add("tampil");
    form.reset();
    ringkasan.hidden = true;
    document.querySelectorAll(".input-valid").forEach((el) => el.classList.remove("input-valid"));
  }
});

// ====== EVENT: keyboard — Enter pada kolom terakhir ======
document.getElementById("motivasi").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
    form.requestSubmit();
  }
});

// ---------- Tema: toggle + simpan preferensi (Bab XII) ----------
function initTema() {
  const tombolTema = document.getElementById("tombol-tema");
  const KUNCI = "nusalearn-tema";

  const terapkan = (gelap) => {
    document.body.classList.toggle("tema-gelap", gelap);
    tombolTema.textContent = gelap ? "☀️" : "🌙";
    tombolTema.setAttribute("aria-label",
      gelap ? "Ganti ke tema terang" : "Ganti ke tema gelap");
  };

  // Pulihkan preferensi kunjungan sebelumnya
  terapkan(localStorage.getItem(KUNCI) === "gelap");

  tombolTema.addEventListener("click", () => {
    const gelap = !document.body.classList.contains("tema-gelap");
    terapkan(gelap);
    localStorage.setItem(KUNCI, gelap ? "gelap" : "terang");
  });
}
initTema();

// ---------- Tahun otomatis di footer ----------
function initFooter() {
  const el = document.getElementById("tahun");
  if (el) el.textContent = new Date().getFullYear();
}
initFooter();

// ====== KOMENTAR PENGUNJUNG (fitur kilat, tanpa audit) ======
const KUNCI_KOMENTAR = "nusalearn-komentar";

function muatKomentar() {
  try {
    return JSON.parse(localStorage.getItem(KUNCI_KOMENTAR)) || [];
  } catch (e) {
    return [];
  }
}

function renderKomentar() {
  const wadah = document.getElementById("daftar-komentar");
  if (!wadah) return;
  wadah.innerHTML = "";
  muatKomentar().forEach((k) => {
    const art = document.createElement("article");
    art.className = "komentar-item";
    const nama = document.createElement("strong");
    nama.textContent = k.nama;   // textContent: markup jadi teks mati
    const pesan = document.createElement("p");
    pesan.textContent = k.pesan;
    art.append(nama, pesan);
    wadah.append(art);
  });
}

function initKomentar() {
  const form = document.getElementById("form-komentar");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nama = document.getElementById("komentar-nama").value;
    const pesan = document.getElementById("komentar-pesan").value;
    if (!nama.trim() || !pesan.trim()) return;
    const daftar = muatKomentar();
    daftar.push({ nama, pesan });
    localStorage.setItem(KUNCI_KOMENTAR, JSON.stringify(daftar));
    form.reset();
    renderKomentar();
  });
  renderKomentar();
}
initKomentar();

// ====== SAPAAN PERSONAL via parameter URL ?nama= ======
function initSapaan() {
  const el = document.getElementById("sapaan");
  if (!el) return;
  const nama = new URLSearchParams(location.search).get("nama");
  if (nama) {
    el.textContent = "";
    el.append("Selamat datang kembali, ");
    const b = document.createElement("strong");
    b.textContent = sanitasiTeks(nama);   // bersihkan sebelum tampil
    el.append(b, "!");
    el.hidden = false;
  }
}
initSapaan();