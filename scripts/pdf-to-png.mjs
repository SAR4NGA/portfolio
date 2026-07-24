import { readdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { pdf } from 'pdf-to-img';

const certsDir = join(import.meta.dirname, '..', 'public', 'certs');
const files = (await readdir(certsDir)).filter(f => f.toLowerCase().endsWith('.pdf'));

for (const file of files) {
  const pdfPath = join(certsDir, file);
  const outName = file.replace(/\.pdf$/i, '.png');
  const outPath = join(certsDir, outName);

  console.log(`Converting: ${file} -> ${outName}`);

  const doc = await pdf(pdfPath, { scale: 2 });

  // Only grab the first page
  for await (const page of doc) {
    await writeFile(outPath, page);
    console.log(`  Saved: ${outPath}`);
    break;
  }
}

console.log('Done!');
