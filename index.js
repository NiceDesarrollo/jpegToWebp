const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

//**Directorio donde estan las imagenes que se desean convertir */
const inputDir = 'C:/Users/Gahumada/Pictures/bounceGallery'; // Replace with your actual path
//**Crear una carpeta en el directorio donde estan las imagenes pero con el nombre deseado */
const outputDir = path.join(inputDir, 'webp'); // Save WebP images in a separate folder

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const optimizeImage = (fileName, index) => {
  const inputPath = path.join(inputDir, fileName);
  const outputPath = path.join(outputDir, `${index}.webp`);

  sharp(inputPath)
    .webp({ quality: 30 }) // Adjust quality as needed
    .toFile(outputPath, (err) => {
      if (err) {
        console.error(`Error converting ${fileName}: ${err}`);
      } else {
        console.log(`Converted ${fileName} to ${outputPath}`);
      }
    });

    ++index;
};

fs.readdirSync(inputDir).forEach((fileName, index) => {
  if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.JPEG') || fileName.endsWith('.JPG')) {
    optimizeImage(fileName, index);
  }
});
