const express = require('express');
const app = express();
app.use(express.json());

const daftarBuku = [
  { id: 1, judul: 'Laskar Pelangi', harga: 85000, stok: 5, kategori: 'Novel' },
  { id: 2, judul: 'Filosofi Teras', harga: 98000, stok: 0, kategori: 'Self-Help' },
  { id: 3, judul: 'Atomic Habits', harga: 120000, stok: 3, kategori: 'Self-Help' },
  { id: 4, judul: 'Bumi Manusia', harga: 105000, stok: 2, kategori: 'Novel' },
];
let idBerikutnya = 5;

// b) GET /buku (bisa filter ?kategori= dan ?tersedia=true)
app.get('/buku', (req, res) => {
  const { kategori, tersedia } = req.query;
  let hasil = daftarBuku;

  if (kategori) {
    hasil = hasil.filter(b => b.kategori === kategori);
  }
  if (tersedia === 'true') {
    hasil = hasil.filter(b => b.stok > 0);
  }

  res.json(hasil);
});

// h) GET /statistik
app.get('/statistik', (req, res) => {
  const totalHarga = daftarBuku.reduce((total, b) => total + b.harga, 0);
  const jumlahTersedia = daftarBuku.filter(b => b.stok > 0).length;

  res.json({
    jumlahJudul: daftarBuku.length,
    totalHarga: totalHarga,
    jumlahTersedia: jumlahTersedia
  });
});

// c) GET /buku/:id
app.get('/buku/:id', (req, res) => {
  const id = Number(req.params.id);
  const buku = daftarBuku.find(b => b.id === id);

  if (!buku) {
    return res.status(404).json({ pesan: 'Buku tidak ditemukan' });
  }

  res.json(buku);
});

// d) POST /buku
app.post('/buku', (req, res) => {
  const { judul, harga, stok, kategori } = req.body || {};

  if (typeof judul !== 'string' || judul.trim() === '') {
    return res.status(400).json({ pesan: 'judul wajib teks tidak kosong' });
  }
  if (typeof kategori !== 'string' || kategori.trim() === '') {
    return res.status(400).json({ pesan: 'kategori wajib teks tidak kosong' });
  }
  if (typeof harga !== 'number' || harga <= 0) {
    return res.status(400).json({ pesan: 'harga harus angka lebih dari 0' });
  }
  if (typeof stok !== 'number' || stok < 0) {
    return res.status(400).json({ pesan: 'stok harus angka 0 atau lebih' });
  }

  const bukuBaru = { id: idBerikutnya++, judul, harga, stok, kategori };
  daftarBuku.push(bukuBaru);
  res.status(201).json(bukuBaru);
});

// e) PUT /buku/:id
app.put('/buku/:id', (req, res) => {
  const id = Number(req.params.id);
  const buku = daftarBuku.find(b => b.id === id);

  if (!buku) {
    return res.status(404).json({ pesan: 'Buku tidak ditemukan' });
  }

  const { judul, harga, stok, kategori } = req.body || {};

  if (harga !== undefined && (typeof harga !== 'number' || harga <= 0)) {
    return res.status(400).json({ pesan: 'harga harus angka lebih dari 0' });
  }
  if (stok !== undefined && (typeof stok !== 'number' || stok < 0)) {
    return res.status(400).json({ pesan: 'stok harus angka 0 atau lebih' });
  }

  if (judul !== undefined) buku.judul = judul;
  if (harga !== undefined) buku.harga = harga;
  if (stok !== undefined) buku.stok = stok;
  if (kategori !== undefined) buku.kategori = kategori;

  res.json(buku);
});

// f) DELETE /buku/:id
app.delete('/buku/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = daftarBuku.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ pesan: 'Buku tidak ditemukan' });
  }

  const dihapus = daftarBuku.splice(index, 1)[0];
  res.json({ pesan: 'Berhasil dihapus', data: dihapus });
});

// g) POST /buku/:id/beli
app.post('/buku/:id/beli', (req, res) => {
  const id = Number(req.params.id);
  const buku = daftarBuku.find(b => b.id === id);

  if (!buku) {
    return res.status(404).json({ pesan: 'Buku tidak ditemukan' });
  }
  if (buku.stok <= 0) {
    return res.status(400).json({ pesan: 'Gagal: Buku tidak tersedia atau stok habis!' });
  }

  buku.stok = buku.stok - 1;
  res.json({
    pesan: 'Pembayaran berhasil untuk buku: ' + buku.judul,
    sisaStok: buku.stok
  });
});

app.listen(3000, () => console.log('Server jalan di http://localhost:3000'));