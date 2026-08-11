import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Serve compiled VitePress docs from public/NextGen-AI/ in dev mode
    {
      name: 'serve-nextgen-ai-docs',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url.startsWith('/NextGen-AI')) return next();

          // Resolve the file path from public/NextGen-AI/
          let urlPath = req.url.replace('/NextGen-AI', '');
          if (urlPath === '' || urlPath === '/') urlPath = '/index.html';
          // Handle directory paths — try index.html
          if (!path.extname(urlPath)) {
            urlPath = urlPath.replace(/\/$/, '') + '/index.html';
          }

          const filePath = path.join(process.cwd(), 'public', 'NextGen-AI', urlPath);

          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes = {
              '.html': 'text/html',
              '.js':   'application/javascript',
              '.css':  'text/css',
              '.png':  'image/png',
              '.jpg':  'image/jpeg',
              '.svg':  'image/svg+xml',
              '.json': 'application/json',
              '.woff2':'font/woff2',
              '.woff': 'font/woff',
            };
            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
            fs.createReadStream(filePath).pipe(res);
          } else {
            // Fallback: serve the VitePress 404 page
            const notFound = path.join(process.cwd(), 'public', 'NextGen-AI', '404.html');
            if (fs.existsSync(notFound)) {
              res.setHeader('Content-Type', 'text/html');
              res.statusCode = 404;
              fs.createReadStream(notFound).pipe(res);
            } else {
              next();
            }
          }
        });
      },
    },
  ],
})
