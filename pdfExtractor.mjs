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
            
            console.log(`onImageBlock, bbox=${bbox}, transform=${matrix}, image=${image}`);
            let pixmap = image.toPixmap();
            if (!pixmap.getAlpha()){
                let filename = `image${ctnImage}.jpg`;
                let buffer = pixmap.asPNG();
                fs.writeFile("./pdf/media/"+filename, buffer, err => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(filename);
                    }
                });
                console.log("image saved !");
            }
            ctnImage ++;

        }
    })
    i++
}