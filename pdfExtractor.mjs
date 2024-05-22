//const { mupdf } = require('mupdf');
import * as mupdf from "mupdf";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');

const [, , originalPdfPath] = process.argv;

let document = mupdf.Document.openDocument(fs.readFileSync(originalPdfPath), "application/pdf");

let i = 0

let ctnImage = 1;

while (i < document.countPages()) {
    const page = document.loadPage(i)
    page.toStructuredText("preserve-images").walk({
        onImageBlock(bbox, matrix, image) {
            // Image found!
            console.log(`onImageBlock, bbox=${bbox}, transform=${matrix}, image=${image}`);
            let filename = 'image'
            fs.writeFile(filename, image, err => {
              if (err) {
                  console.error(err);
              } else {
                  console.log(filename);
              }
            });
        }
    })
    i++
}

/*
const { ExtractImages } = require("pdf-image-extractor");
const fs = require('fs');

const [, , originalPdfPath] = process.argv;

const pdfSource = new Blob([fs.readFileSync(originalPdfPath)]);
const fileType = "blob"; // or 'blob' based on your input type
const dir = 'pdf/media';

ExtractImages({ pdf: pdfSource, fileType: fileType }).then((images) => {
  var imgName = 0;
  var filename;
  images.forEach(async (image) => {
    var imgType = image.imageType.split("/")[1];
    console.log(image.imageType); // Blob URL for the image
    // You can use the blob URL to display the image or download it
    filename = await dir+'/image'+imgName+"."+imgType;
    imgName+=1;
    fs.writeFileSync(filename, Buffer.from(await image.blob.arrayBuffer()));
    console.log('Image downloaded successfully.');
    
  });
}).catch((err)=>{
  console.error(err);
});
*/