package models

import (
	"time"

	"gorm.io/gorm"
)

// model for user
type User struct {
	gorm.Model
	ID       uint   `gorm:"primaryKey"`
	Username string `gorm:"unique"`
	Email    string `gorm:"unique"`
	Password string
	Role     string
}

// model for sag
type Sag struct {
	gorm.Model
	Tanggal time.Time `json:"tanggal" gorm:"type:date"`
	NoMemo  string    `json:"no_memo"`
	Perihal string    `json:"perihal"`
	Pic     string    `json:"pic"`
}

// model for memo
type Memo struct {
	gorm.Model
	Tanggal time.Time `json:"tanggal" gorm:"type:date"`
	NoMemo  string    `json:"no_memo"`
	Perihal string    `json:"perihal"`
	Pic     string    `json:"pic"`
}

// model for iso
type Iso struct {
	gorm.Model
	Tanggal time.Time `json:"tanggal" gorm:"type:date"`
	NoMemo  string    `json:"no_memo"`
	Perihal string    `json:"perihal"`
	Pic     string    `json:"pic"`
}

// model for surat
type Surat struct {
	gorm.Model
	Tanggal time.Time `json:"tanggal" gorm:"type:date"`
	NoSurat string    `json:"no_surat"`
	Perihal string    `json:"perihal"`
	Pic     string    `json:"pic"`
}

// model for berita acara
type BeritaAcara struct {
	gorm.Model
	Tanggal time.Time `json:"tanggal" gorm:"type:date"`
	NoSurat string    `json:"no_surat"`
	Perihal string    `json:"perihal"`
	Pic     string    `json:"pic"`
}

// model for sk
type Sk struct {
	gorm.Model
	Tanggal time.Time `json:"tanggal" gorm:"type:date"`
	NoSurat string    `json:"no_surat"`
	Perihal string    `json:"perihal"`
	Pic     string    `json:"pic"`
}

// model for project
type Project struct {
	gorm.Model
	KodeProject     string    `json:"kode_project"`
	JenisPengadaan  string    `json:"jenis_pengadaan"`
	NamaPengadaan   string    `json:"nama_pengadaan"`
	DivInisiasi     string    `json:"div_inisiasi"`
	Bulan           time.Time `json:"bulan" gorm:"type:date"`
	SumberPendanaan string    `json:"sumber_pendanaan"`
	Anggaran        int64     `json:"anggaran"`
	NoIzin          string    `json:"no_izin"`
	TanggalIzin     time.Time `json:"tanggal_izin" gorm:"type:date"`
	TanggalTor      time.Time `json:"tanggal_tor" gorm:"type:date"`
	Pic             string    `json:"pic"`
}

// model for perdin
type Perdin struct {
	gorm.Model
	NoPerdin  string    `json:"no_perdin"`
	Tanggal   time.Time `json:"tanggal" gorm:"type:date"`
	Hotel     string    `json:"hotel"`
	Transport string    `json:"transport"`
}

// model for suratMasuk
type SuratMasuk struct {
	gorm.Model
	NoSurat    string    `json:"no_surat"`
	Title      string    `json:"title"`
	RelatedDiv string    `json:"related_div"`
	DestinyDiv string    `json:"destiny_div"`
	Tanggal    time.Time `json:"tanggal" gorm:"type:date"`
}

// model for suratKeluar
type SuratKeluar struct {
	gorm.Model
	NoSurat string    `json:"no_surat"`
	Title   string    `json:"title"`
	From    string    `json:"from"`
	Pic     string    `json:"pic"`
	Tanggal time.Time `json:"tanggal" gorm:"type:date"`
}
