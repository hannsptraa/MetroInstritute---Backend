const express = require('express');
const app = express();
app.use(express.json());

// a)
app.get('/kali/:a/:b', (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ pesan: 'a dan b harus angka' });
  }

  res.json({ a: a, b: b, hasil: a * b });
});

// b) 
app.get('/sapa', (req, res) => {
  const { nama } = req.query;
  res.json({ pesan: 'Halo, ' + nama + '!' });
});

// c)
app.post('/hitung-rata', (req, res) => {
  const { nilai } = req.body || {};

  if (!Array.isArray(nilai) || nilai.length === 0) {
    return res.status(400).json({ pesan: 'nilai harus array dan tidak kosong' });
  }

  let total = 0;
  for (let i = 0; i < nilai.length; i++) {
    total = total + nilai[i];
  }

  res.json({ rata: total / nilai.length });
});

app.listen(3000, () => console.log('Server jalan di http://localhost:3000'));