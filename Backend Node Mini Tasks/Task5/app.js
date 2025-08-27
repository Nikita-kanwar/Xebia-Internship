
const fs = require('fs').promises;
const path = require('path');

const files = [
  { name: 'file1.txt', content: 'This is File 1' },
  { name: 'file2.txt', content: 'This is File 2' },
  { name: 'file3.txt', content: 'This is File 3' }
];

async function ensureFiles() {
  for (const file of files) {
    const filePath = path.join(__dirname, file.name);
    try {
      await fs.access(filePath); 
    } catch {
   
      await fs.writeFile(filePath, file.content, 'utf-8');
      console.log(`Created ${file.name}`);
    }
  }
}

async function readFiles() {
  try {
    await ensureFiles();

    for (const file of files) {
      const content = await fs.readFile(path.join(__dirname, file.name), 'utf-8');
      console.log(`${file.name}:\n`, content, '\n');
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

readFiles();
