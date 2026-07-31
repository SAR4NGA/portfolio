import { pdf } from 'pdf-to-img';
import { writeFileSync } from 'fs';
import { resolve, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const pdfPath = process.argv[2];
if (!pdfPath) {
  console.error('Usage: node pdf-to-png.mjs <path-to-pdf>');
  process.exit(1);
}

const absPath = resolve(pdfPath);
const outPath = resolve(dirname(absPath), basename(absPath, extname(absPath)) + '.png');

const doc = await pdf(absPath, { scale: 2 });

let pageIndex = 0;
for await (const image of doc) {
  if (pageIndex === 0) {
    writeFileSync(outPath, image);
    console.log(`Saved: ${outPath}`);
  }
  pageIndex++;
  break; // only first page
}
