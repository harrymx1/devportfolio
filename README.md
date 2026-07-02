# DevPortfolio - Full Stack Developer Portfolio

Sebuah platform portofolio modern berskala *Enterprise* yang dirancang dengan memadukan estetika UI kelas atas dan sistem *Backend* yang tangguh. Proyek ini mendemonstrasikan implementasi React (Vite) untuk *Frontend* dan Node.js/Express untuk *Backend*, disokong oleh PostgreSQL (*Supabase*).

## 🔗 Live Demo & Akses Publik
- **Website Frontend (Vercel):** [https://devportfolio-harry.vercel.app](https://devportfolio-harry.vercel.app)
- **Backend API (Railway):** [https://devportfolio-production-7e37.up.railway.app/api/projects](https://devportfolio-production-7e37.up.railway.app/api/projects)
- **Video Demo Walkthrough:** `[Link Video Demo Menyusul]`

## ✨ Fitur Unggulan

- **Arsitektur Full-Stack Modern:** Pemisahan struktur secara monorepo (Frontend & Backend).
- **Dashboard Admin Pribadi:** Fitur CMS mandiri untuk manajemen Proyek, *Skills*, dan Pesan yang dilindungi Autentikasi JWT (*JSON Web Token*).
- **Keamanan Enkripsi:** Kata sandi disandikan (*hashed*) menggunakan `bcrypt` untuk menjamin integritas.
- **Formulir Kontak Otomatis:** Pesan dari pengunjung situs akan masuk dan diamankan secara langsung ke *database*, lalu dapat dibaca melalui Panel Admin.
- **Desain UI Interaktif:** Menggunakan *Framer Motion* dan prinsip desain *Glassmorphism*, dengan tema gelap (*Dark Mode*) yang misterius nan memukau.

---

## 🛠️ Tech Stack (Teknologi yang Digunakan)

### Frontend (Client-side)
- **Framework:** React.js + Vite
- **Styling:** Vanilla CSS (Sistem Desain Kustom)
- **Animasi:** Framer Motion
- **Routing:** React Router DOM
- **Pemanggilan API:** Axios

### Backend (Server-side)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (Di-hosting di Supabase)
- **Keamanan API:** JSON Web Token (JWT) & Bcrypt

---

## 🚀 Cara Menjalankan Secara Lokal (Local Development)

Ikuti panduan berikut untuk menjalankan portofolio ini di mesin lokal Anda.

### 1. Persiapan Basis Data (Database)
Anda membutuhkan layanan PostgreSQL (disarankan menggunakan [Supabase](https://supabase.com/)).
1. Buat proyek baru di Supabase.
2. Dapatkan *Connection String* (URL Koneksi PostgreSQL) dari pengaturan *Database* Anda.

### 2. Pengaturan Variabel Lingkungan (Environment Variables)
Ubah nama berkas `.env.example` (jika ada) menjadi `.env` di masing-masing sub-folder, lalu isi variabelnya.

**Di folder `/backend` (`backend/.env`)**
```env
PORT=5000
DATABASE_URL=postgres://[user]:[password]@[host]:[port]/[db-name]
JWT_SECRET=super_rahasia_dan_panjang_sekali
ADMIN_EMAIL=admin@devportfolio.com
ADMIN_PASSWORD=admin123
```

**Di folder `/frontend` (`frontend/.env`)**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Instalasi dan Menjalankan Proyek

**Menjalankan Backend (Terminal 1)**
```bash
cd backend
npm install
# Inisialisasi struktur tabel database
node src/scripts/setup.js
# Memasukkan data awal (admin kredensial & dummy konten)
node src/scripts/seed.js
# Menjalankan server backend
npm run dev
```

**Menjalankan Frontend (Terminal 2)**
```bash
cd frontend
npm install
npm run dev
```

Platform akan berjalan secara lokal di: `http://localhost:5173`.
Dashboard Admin dapat diakses via rute: `http://localhost:5173/admin/login`.

---

## 🔒 Catatan Keamanan
Jangan pernah menyimpan `JWT_SECRET` atau `DATABASE_URL` secara publik di repositori Anda. Pastikan berkas `.env` telah didaftarkan pada `.gitignore`.

> Dibangun dengan sepenuh hati sebagai representasi mahakarya Web Modern.
