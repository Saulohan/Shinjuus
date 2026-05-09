import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagensDir = path.join(__dirname, "Imagens");

/** Serve e copia `Imagens/` para o output (equivalente a `public/Imagens`). */
function imagensPublic() {
  return {
    name: "imagens-public",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const raw = req.url?.split("?")[0] ?? "";
        if (!raw.startsWith("/Imagens/")) return next();

        const decoded = decodeURIComponent(raw);
        const candidate = path.normalize(path.join(__dirname, decoded.slice(1)));
        if (!candidate.startsWith(path.normalize(`${imagensDir}${path.sep}`))) {
          return next();
        }

        fs.readFile(candidate, (err, buf) => {
          if (err) return next();
          const ext = path.extname(candidate).toLowerCase();
          const mime = {
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".webp": "image/webp",
            ".gif": "image/gif",
            ".ico": "image/x-icon",
            ".svg": "image/svg+xml",
          };
          res.setHeader("Content-Type", mime[ext] ?? "application/octet-stream");
          res.end(buf);
        });
      });
    },
    writeBundle() {
      if (!fs.existsSync(imagensDir)) return;
      const out = path.join(__dirname, "dist", "Imagens");
      fs.cpSync(imagensDir, out, { recursive: true });
    },
  };
}

export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [imagensPublic()],
});
