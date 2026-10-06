// Tiny HTTP server: JSON API for SQLite + frontend files from the project root.
const http = require('http'), fs = require('fs'), path = require('path');
const { getProducts, createTransaction } = require('./db/queries');

const PUBLIC = __dirname;
const PORT = process.env.PORT || 3000;
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png' };

const sendJson = (res, code, data) => {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};
const readBody = (req) => new Promise((resolve, reject) => {
  let body = '';
  req.on('data', (c) => { body += c; if (body.length > 1e5) req.destroy(); });
  req.on('end', () => { try { resolve(JSON.parse(body || '{}')); } catch { reject(new Error('Invalid JSON.')); } });
});

http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET' && req.url === '/api/products') return sendJson(res, 200, getProducts());
    if (req.method === 'POST' && req.url === '/api/transactions') {
      return sendJson(res, 201, createTransaction(await readBody(req)));
    }
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    const file = path.join(PUBLIC, urlPath === '/' ? 'index.html' : urlPath);
    const relative = path.relative(PUBLIC, file);
    const frontend = relative === 'index.html' || ['assets', 'brand', 'css', 'js', 'screens'].includes(relative.split(path.sep)[0]);
    if (!frontend || relative.startsWith('..' + path.sep) || path.isAbsolute(relative) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404); return res.end('Not found');
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  } catch (err) {
    sendJson(res, 400, { error: err.message });
  }
}).listen(PORT, () => console.log(`Coffee Bara POS running at http://localhost:${PORT}`));
