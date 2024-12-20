-- CreateTable
CREATE TABLE `tabel_perpustakaan` (
    `nama_buku` VARCHAR(30) NOT NULL,
    `nama_peminjam` VARCHAR(25) NOT NULL,
    `tanggal_pinjam` DATE NOT NULL,
    `kode_buku` INTEGER NOT NULL AUTO_INCREMENT,
    `alamat` TEXT NOT NULL,
    `nomor_hp` INTEGER NOT NULL,

    PRIMARY KEY (`kode_buku`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
