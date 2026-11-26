# NusaLearn — Kode Pendamping Buku

Repositori ini memuat seluruh **milestone proyek** dari buku
*Menguasai HTML, CSS, dan JavaScript di Era AI: Membangun Situs
Interaktif dalam 12 Tahap Proyek* (Rifqi Mulyawan & Noor Hasanah
Ananda).

Setiap folder `bab-NN-selesai/` adalah keadaan situs NusaLearn
**persis setelah bab tersebut selesai** — kodenya sama dengan listing
yang tercetak di buku, dihasilkan otomatis dari naskah dan teruji
berjalan. Tidak ada build, tidak ada server: cukup buka `index.html`
di peramban.

## Demo live

Semua milestone juga bisa dibuka langsung lewat GitHub Pages:

| Folder | Keadaan | Demo live |
|---|---|---|
| `bab-01-selesai/` | HTML semantik pra-CSS | [buka](https://rifqimulyawan.github.io/nusalearn/bab-01-selesai/) |
| `bab-02-selesai/` | + formulir pendaftaran | [buka](https://rifqimulyawan.github.io/nusalearn/bab-02-selesai/) |
| `bab-03-selesai/` | markup berkelas + `<style>` internal | [buka](https://rifqimulyawan.github.io/nusalearn/bab-03-selesai/) |
| `bab-04-selesai/` | kartu + `css/style.css` desktop | [buka](https://rifqimulyawan.github.io/nusalearn/bab-04-selesai/) |
| `bab-05-selesai/` | + viewport + nav-toggle + mobile-first | [buka](https://rifqimulyawan.github.io/nusalearn/bab-05-selesai/) |
| `bab-06-selesai/` | + `<script>` dasar JavaScript | [buka](https://rifqimulyawan.github.io/nusalearn/bab-06-selesai/) |
| `bab-07-selesai/` | + fungsi, map/filter/forEach | [buka](https://rifqimulyawan.github.io/nusalearn/bab-07-selesai/) |
| `bab-08-selesai/` | konten dirender JS | [buka](https://rifqimulyawan.github.io/nusalearn/bab-08-selesai/) |
| `bab-09-selesai/` | semua event hidup | [buka](https://rifqimulyawan.github.io/nusalearn/bab-09-selesai/) |
| `bab-10-selesai/` | struktur akhir + komentar & sapaan **(sengaja rentan)** | [buka](https://rifqimulyawan.github.io/nusalearn/bab-10-selesai/) |
| `bab-11-selesai/` | + sanitasi & tambalan XSS | [buka](https://rifqimulyawan.github.io/nusalearn/bab-11-selesai/) |
| `bab-12-selesai/` | + localStorage tema + tahun otomatis | [buka](https://rifqimulyawan.github.io/nusalearn/bab-12-selesai/) |

## ⚠️ Catatan keamanan

**`bab-10-selesai/` sengaja dibiarkan rentan.** Folder itu mereproduksi
keadaan situs yang "lolos deploy" di Bab X — kolom komentar dan sapaan
`?nama=` merender masukan lewat `innerHTML`, sehingga payload XSS
tersimpan (localStorage) maupun terpantul (parameter URL) benar-benar
berjalan. Ia adalah **target latihan** untuk Bab XI, bukan kode yang
layak ditiru: jangan pakai `bab-10-selesai/` di proyek nyata. Versi
yang sudah ditambal ada di `bab-11-selesai/` dan `bab-12-selesai/`.

Contoh serangan yang bisa dicoba di demo live bab-10-selesai:

```
https://rifqimulyawan.github.io/nusalearn/bab-10-selesai/?nama=<img src=x onerror=alert(1)>
```

lalu bandingkan dengan alamat yang sama di `bab-11-selesai/` — di sana
payload hanya tampil sebagai teks.

## Lisensi

Kode dirilis di bawah [Lisensi MIT](LICENSE). Teks buku tidak termasuk
dalam repositori ini.
