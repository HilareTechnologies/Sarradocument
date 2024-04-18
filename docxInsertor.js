const {DocxImager} = require('docxImager');
const fs = require('fs');

let docxImager = new DocxImager();

const [, , originalDocxPath] = process.argv;

async function Instertor(){

    await docxImager.load(originalDocxPath);
    const dir = 'rendu/word/media';

    fs.readdir(dir, async (err, files) => {
    console.log(files.length);
    for(let i =1;i*2<=files.length/2;i++){
        await docxImager.replaceWithLocalImage('rendu/word/processed/image'+i+'.png', i, 'png');
    }
    });
    await docxImager.save('new_docx.docx');
}

Instertor();