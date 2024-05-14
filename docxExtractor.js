const DocxImager = require('docxImager');
const fs = require('fs');

let docxImager = new DocxImager();

const [, , originalDocxPath] = process.argv;

function Extractor(){

    docxImager.load(originalDocxPath);
    const dir = 'word/media';

    setTimeout( () => {
        docxImager.extractLocalImages(dir);
    }, 100);
    
}   

Extractor();
