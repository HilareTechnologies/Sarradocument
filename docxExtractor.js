const DocxImager = require('docxImager');

let docxImager = new DocxImager();

const [, , originalDocxPath] = process.argv;
const dir = 'word/media';

function Extractor(){

    docxImager.load(originalDocxPath);
    

    setTimeout( () => {
        docxImager.extractLocalImages(dir);
    }, 100);
    
}

Extractor();
