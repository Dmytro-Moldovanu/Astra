// Lokale Vorschau der bereits erstellten ASTRA-Version; keine Pakete erforderlich.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, 'dist');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.ico': 'image/x-icon',
};
const server = http.createServer((req, res) => {
  let decoded;
  try { decoded = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname) } catch { res.writeHead(400).end(); return }
  const name = decoded === '/' ? 'index.html' : decoded.replace(/^\/+/, '');
  const file = path.resolve(root, name);
  if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403).end(); return }
  fs.stat(file, (err, stats) => {
    if (err || !stats.isFile()) { res.writeHead(404).end('Datei nicht gefunden'); return }
    res.writeHead(200, { 'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    fs.createReadStream(file).pipe(res);
  });
});
const PORT = 5178;
server.listen(PORT, '127.0.0.1', () => console.log(`ASTRA läuft auf http://127.0.0.1:${PORT}/`));
