- HASIL DARI RESPONSE END POINT 

- 1 GET ALL 

-  {
    "success": true,
    "message": "Daftar Buku",
    "data": {
        "jumlah": 3,
        "data": [
            {
                "id": 1,
                "judul": "sherlock holmes",
                "penulis": "sir arthur conan doyle",
                "release": 1902
            },
            {
                "id": 2,
                "judul": "bulan",
                "penulis": "tere liye ",
                "release": 2015
            },
            {
                "id": 3,
                "judul": "buku masak chef el bahlil",
                "penulis": "goblin bahlil",
                "release": 2025
            }
        ]
    }
}





-  {
    "success": true,
    "message": "data pengunjung perpustakaan",
    "data": {
        "jumlah": 4,
        "data": [
            {
                "id": 1,
                "nama": "seorina",
                "asal": "korean",
                "age": 29
            },
            {
                "id": 2,
                "nama": "fairuuz",
                "asal": "indonesia",
                "age": 19
            },
            {
                "id": 3,
                "nama": "kim minji",
                "asal": "korean",
                "age": 21
            },
            {
                "id": 4,
                "nama": "bibi",
                "asal": "korean",
                "age": 28
            }
        ]
    }
}










- 2 GET BY ID 

-  {
    "success": true,
    "message": "Book found men",
    "data": {
        "id": 1,
        "judul": "sherlock holmes",
        "penulis": "sir arthur conan doyle",
        "release": 1902
    }
}






- {
    "success": true,
    "message": "user found men",
    "data": {
        "id": 4,
        "nama": "bibi",
        "asal": "korean",
        "age": 28
    }
}

====================================

















- GET SEARCH






{
    "success": true,
    "message": "Books found",
    "data": [
        {
            "id": 1,
            "judul": "sherlock holmes",
            "penulis": "sir arthur conan doyle",
            "release": 1902
        }
    ]
}




-   {
    "success": true,
    "message": "User found",
    "data": [
        {
            "id": 2,
            "nama": "fairuuz",
            "asal": "indonesia",
            "age": 19
        }
    ]
}





==============

- POST 



-  {
    "success": true,
    "message": "buku berasil di tambah",
    "data": [
        {
            "id": 1,
            "judul": "sherlock holmes",
            "penulis": "sir arthur conan doyle",
            "release": 1902
        },
        {
            "id": 2,
            "judul": "bulan",
            "penulis": "tere liye ",
            "release": 2015
        },
        {
            "id": 3,
            "judul": "buku masak chef el bahlil",
            "penulis": "goblin bahlil",
            "release": 2025
        },
        {
            "id": 4,
            "judul": "Harry Potter",
            "penulis": "J. K. Rowling",
            "release": 1997
        }
    ]
}



-  {
    "success": true,
    "message": "buki berasil di tambah",
    "data": [
        {
            "id": 1,
            "nama": "seorina",
            "asal": "korean",
            "age": 29
        },
        {
            "id": 2,
            "nama": "fairuuz",
            "asal": "indonesia",
            "age": 19
        },
        {
            "id": 3,
            "nama": "kim minji",
            "asal": "korean",
            "age": 21
        },
        {
            "id": 4,
            "nama": "bibi",
            "asal": "korean",
            "age": 28
        },
        {
            "id": 5,
            "nama": "hanni",
            "asal": "koreae",
            "age": 21
        },
        {
            "id": 6,
            "nama": "hanni",
            "asal": "korean",
            "age": 21
        }
    ]
}




- {
    "success": true,
    "message": "buki berasil di tambah",
    "data": [
        {
            "id": 1,
            "nama": "seorina",
            "asal": "korean",
            "age": 29
        },
        {
            "id": 2,
            "nama": "fairuuz",
            "asal": "indonesia",
            "age": 19
        },
        {
            "id": 3,
            "nama": "kim minji",
            "asal": "korean",
            "age": 21
        },
        {
            "id": 4,
            "nama": "bibi",
            "asal": "korean",
            "age": 28
        },
        {
            "id": 5,
            "nama": "hanni",
            "asal": "koreae",
            "age": 21
        },
        {
            "id": 6,
            "nama": "hanni",
            "asal": "korean",
            "age": 21
        }
    ]
}



============
- PUT 

- {
    "success": true,
    "message": "update book",
    "data": {
        "id": 3,
        "judul": "kenapa indonesia banyak korupsi ",
        "penulis": "Kira",
        "release": 2025
    }
}






- {
    "success": true,
    "message": "update user",
    "data": {
        "id": 4,
        "nama": "jajang seo",
        "asal": "korean",
        "age": 23
    }
}









- DELETE 



- {
    "success": true,
    "message": "Books delete",
    "data": [
        {
            "id": 3,
            "judul": "kenapa indonesia banyak korupsi ",
            "penulis": "Kira",
            "release": 2025
        }
    ]
}




- {
    "success": true,
    "message": "user delete",
    "data": [
        {
            "id": 2,
            "nama": "fairuuz",
            "asal": "indonesia",
            "age": 19
        }
    ]
}







Evaluasi Pengetahuan (Pilihan Ganda – 10 Soal)
Pilih jawaban yang paling tepat dari pilihan yang tersedia.

Apa peran utama Backend dalam sebuah aplikasi? a) Menampilkan antarmuka pengguna b) Mengelola data, logika bisnis, dan komunikasi database c) Menangani interaksi langsung dengan pengguna d) Membuat animasi dan desain visual

HTTP Method POST digunakan untuk operasi apa dalam CRUD? a) Read b) Update c) Create d) Delete

Apa arti dari HTTP Status Code 201 Created? a) Permintaan berhasil diproses b) Data baru berhasil dibuat c) Data tidak ditemukan d) Terjadi kesalahan server

Apa itu Node.js? a) Bahasa pemrograman frontend b) Framework JavaScript untuk database c) Runtime environment untuk menjalankan JavaScript di luar browser d) Library untuk membuat antarmuka pengguna

Engine JavaScript apa yang digunakan oleh Node.js? a) SpiderMonkey b) Chakra c) V8 d) JavaScriptCore

Middleware express.json() di Express.js digunakan untuk apa? a) Mengamankan header HTTP b) Memparsing body request dalam format JSON c) Melakukan logging HTTP request d) Menangani error global

Perbedaan utama antara Route Params (/users/:id) dan Query String (/users?name=...) adalah... a) Route Params untuk filter, Query String untuk identifikasi resource b) Route Params untuk identifikasi resource, Query String untuk filter/sorting c) Keduanya sama-sama untuk identifikasi resource d) Keduanya sama-sama untuk filter data

Apa fungsi utama dari Global Error Handler di Express.js? a) Memvalidasi input dari pengguna b) Mencatat semua request HTTP yang masuk c) Menangkap semua error yang terjadi di aplikasi dan mengirim respons yang konsisten d) Mengamankan aplikasi dari serangan XSS

Manfaat utama pemisahan Controller, Service, dan Route dalam arsitektur MVC + Service Layer adalah... a) Membuat kode lebih pendek b) Meningkatkan keterbacaan, pemeliharaan, dan skalabilitas kode c) Mengurangi jumlah file dalam project d) Hanya berfungsi untuk aplikasi kecil

Apa tanggung jawab utama dari Controller dalam arsitektur MVC? a) Menjalankan logika bisnis dan berinteraksi dengan database b) Mendefinisikan struktur data aplikasi c) Menerima request HTTP, mengambil data, dan menyuruh Service untuk logika bisnis, lalu mengirim respons d) Menangani validasi input secara langsung





1.b
2.c
3.a
4.c
5.c
6.b
7.b
8.c
9.b
10.









