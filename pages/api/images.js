// pages/api/images.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const { dir } = req.query; // Get the 'dir' query parameter
    const imagesDir = path.join(process.cwd(), 'public/assets', dir || '0bc07337743ba8a989eb940729daa1bc'); // Use '0bc07337743ba8a989eb940729daa1bc' as default if not provided
    const imageUrl = path.join('public/assets', dir || '0bc07337743ba8a989eb940729daa1bc'); // Use '0bc07337743ba8a989eb940729daa1bc' as default if not provided
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan directory: ' + err });
    }

    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif)$/.test(file)) // Sadece resim dosyalarını al
      .map(file => ({
        name: file,
        url: path.join(imageUrl,file),
        key: path.parse(file).name, // Dosya adını anahtar olarak kullan
      }));

    res.status(200).json(images);
  });
}