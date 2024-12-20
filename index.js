const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/buku", async (req, res) => {
  try {
    const tabel_perpustakaans = await prisma.tabel_perpustakaan.findMany();
    res.status(200).json({ message: "data ditampilkan", tabel_perpustakaans });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/addData", async (req, res) => {
  const { nama_buku, nama_peminjam, tanggal_pinjam,kode_buku,alamat,nomor_hp } = req.body;

  try {
    const tabel_perpustakaanExists = await prisma.tabel_perpustakaan.findUnique({
      where: { kode_buku},
    });

    if (tabel_perpustakaanExists) {
      return res.status(400).json({ error: "data sudah ada" });
    }

    const tabel_perpustakaan = await prisma.tabel_perpustakaan.create({
      data: {
        nama_buku,
        nama_peminjam,
        tanggal_pinjam,
        kode_buku,
        alamat,
        nomor_hp,
      },
    });

    res.status(201).json({ message: "data ditambahkan", tabel_perpustakaan });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/updateData/:kode_buku", async (req, res) => {
  const kode_buku = parseInt(req.params.kode_buku);
  const {nama_buku, nama_peminjam, tanggal_pinjam,alamat,nomor_hp } = req.body;

  try {
    const isExists = await prisma.tabel_perpustakaan.findUnique({
      where: { kode_buku },
    });

    if (!isExists) {
      return res.status(400).json({ error: "data tidak ada" });
    }

    const updatetabel_perpustakaan = await prisma.tabel_perpustakaan.update({
      where: { kode_buku },
      data: {
        nama_buku,
        nama_peminjam,
        tanggal_pinjam,
        kode_buku,
        alamat,
        nomor_hp,
      },
    });

    res.status(202).json({ message: "data sudah di update", updatetabel_perpustakaan });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/deleteData/:kode_buku", async (req, res) => {
  const kode_buku = parseInt(req.params.kode_buku);

  try {
    const isExists = await prisma.tabel_perpustakaan.findUnique({
      where: { kode_buku },
    });
    if (!isExists) {
      return res.json({ error: "data tidak ada" });
    }
    const deletetabel_perpustakaan = await prisma.tabel_perpustakaan.delete({
      where: { kode_buku },
    });
    res.status(202).json({ message: "data berhasil di hapus berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});