// Mengimpor modul bawaan Node.js yang diperlukan
const http = require('http'); // Modul untuk membuat HTTP server
const fs = require('fs');   // Modul untuk berinteraksi dengan sistem file
const path = require('path'); // Modul untuk bekerja dengan path file

// Definisikan hostname dan port (Bisa dikustomisasi, misalnya 3000, 8081, 1234)
const hostname = '127.0.0.1';
const port = 8081; // Port yang dapat Anda kustomisasi (e.g., 3000, 8081, 1234)

// Fungsi untuk menentukan MIME Type (Content-Type) berdasarkan ekstensi file
const getContentType = (filePath) => {
    const extname = path.extname(filePath);
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.json':
            return 'application/json';
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.gif':
            return 'image/gif';
        case '.svg':
            return 'image/svg+xml';
        case '.pdf':
            return 'application/pdf';
        default:
            return 'text/plain';
    }
};

// Membuat HTTP server
const server = http.createServer((req, res) => {
    // Menentukan path file yang diminta. Jika URL adalah '/', arahkan ke 'index.html'
    let filePath = (req.url === '/' || req.url === '/index.html') ? 'index.html' : req.url.substring(1);

    // Dapatkan tipe konten
    const contentType = getContentType(filePath);

    // Membaca konten file dari sistem file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // Error: File tidak ditemukan (404)
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`<h1>404 Not Found</h1><p>File ${filePath} tidak ditemukan.</p>`);
            } 
            // Error lain
            else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Sukses: Kirim konten file
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Menjalankan server pada host dan port yang telah ditentukan
server.listen(port, hostname, () => {
    // Sesuai dengan permintaan di Task 1: Gunakan console.log terhadap nilai PORT
    console.log(`Server berjalan di http://${hostname}:${port}/`);
    console.log(`Port yang digunakan: ${port}`);
});