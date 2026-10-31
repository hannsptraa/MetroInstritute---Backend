//soal 6
const produk = [
    {nama : 'pensil', harga : 2000, stok : 10},
    {nama : 'buku', harga : 8000, stok : 0},
    {nama : 'penghapus', harga : 1500, stok : 5},
];

//soal a (stok lebih dr 0)
const cekproduk = produk.filter(p => p.stok > 0);
const produktersedia = cekproduk.map(p => p.nama);
console.log('Produk yang stoknya masih ada : ', produktersedia);

//soal b (cari penghapus)
const cari = produk.find(p => p.nama === 'penghapus');
console.log('Cari Penghapus : ', cari);

//soal c (cetak produk format pensil - 2000)
produk.forEach(p => console.log(p.nama + ' - Rp' + p.harga));

console.log('-------------------------------------------');

//soal 7 

const tunggu = (ms) => new Promise ((resolve) => setTimeout(resolve, ms));

//b
async function langkah(){
    console.log ('mulai');
    await tunggu (1000);
    console.log ('langkah pertama');
    await tunggu (1000);
    console.log ('selesai');
}

//c
const cekstok = (jumlah) => new Promise((resolve, reject) => {
    if (jumlah >0){
        resolve ('Stok ada : ' + jumlah);
    }else {
        reject ('Stok habis');
    }
});

async function bonus() {
    try {
        console.log(await cekstok(5));
        console.log(await cekstok(0));
    }catch (error){
        console.log ('gagal: ', error);
    }
    
}

//soal 8
const daftarbuku = [
  { judul: 'Laskar Pelangi', harga: 85000, stok: 5, kategori: 'Novel' },
  { judul: 'Filosofi Teras', harga: 98000, stok: 0, kategori: 'Self-Help' },
  { judul: 'Atomic Habits', harga: 120000, stok: 3, kategori: 'Self-Help' },
  { judul: 'Bumi Manusia', harga: 105000, stok: 2, kategori: 'Novel' },
];

//a
const bukutersedia = daftarbuku.filter(b => b.stok > 0);
const judultersedia = bukutersedia.map(b => b.judul);

//b
const totalharga = daftarbuku.reduce((total, b) => total + b.harga, 0);

//c
function tampilkanDaftar(){
    console.log('---- SOAL 8 ----');
    console.log('judul buku yang tersedia : ', judultersedia);
    console.log('Total : ', totalharga);
    console.log('Daftar Buku : ');
    daftarbuku.forEach(b =>{
        console.log(b.judul + '- Rp' + b.harga + ' (stok : '+ b.stok + ')');
    });
}

//d, e
function prosespembayaran(judulbuku){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const caribuku = daftarbuku.find(b => b.judul === judulbuku);

            if (caribuku && caribuku.stok > 0 ){
                resolve ('pembayran berhasil untuk buku : ' + caribuku.judul);
            } else {
                reject ('Gagal : ');
            }
        }, 1500);
    });
}

//f
async function transaksi(){
    try {
        const hasil = await prosespembayaran('Atomic Habits');
        console.log (hasil);
    }catch (error){
        console.log(error);
    }

    //kondisi gagal
    try {
        const hasilgagal = await prosespembayaran('Filosofi Teras');
        console.log(hasilgagal);
    }catch(error){
        console.log(error);
    }
}

async function jalankansemua() {
  console.log('SOAL 7 ');
  await langkah();
  await bonus();

  tampilkanDaftar();
  await transaksi();
}

jalankansemua();