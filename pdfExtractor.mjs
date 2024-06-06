import * as mupdf from "mupdf";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');

const [, , originalPdfPath] = process.argv;     // path du fichier pdf 

//chargement du document par la librairie mupdf 
let document = mupdf.Document.openDocument(fs.readFileSync(originalPdfPath), "application/pdf"); 

let pageIndex = 0

let imgIndex = 1;

// boucle sur les pages du document 
while (pageIndex < document.countPages()) {
    const page = document.loadPage(pageIndex) // charge la page

    page.toStructuredText("preserve-images").walk({ // boucle sur tout les element de la page
        onImageBlock(bbox, matrix, image) { // le programme trouve une image
            let pixmap = image.toPixmap(); // transforme l'image en pixmap
            if (!pixmap.getAlpha()){ // si l'image n'est pas transparente
                let filename = `image${imgIndex}.jpg`; 
                let buffer = pixmap.asJPEG(80); // transforme la pixmap en buffer
                // enregirstre l'image
                fs.writeFile("./pdf/media/"+filename, buffer, err => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(filename);
                    }
                });
                console.log("image saved !");
            }
            imgIndex ++;

        }
    })
    pageIndex++
}