const {DocxImager} = require('docxImager');
const fs = require('fs');

let docxImager = new DocxImager();

const [, , originalDocxPath] = process.argv;

async function Insertor(){

    await docxImager.load(originalDocxPath);
    const dir = 'word/media';

    fs.readdir(dir, async (err, files) => {
        console.log(files.length);
        for(let i =1;i*2<=files.length;i++){
            
            await docxImager.replaceWithLocalImage('word/media/image'+i+'.png', i, 'png');
        }
    });

    
    setTimeout(async () => {
        await docxImager.save('new_docx.docx');
    }, 100);
}   

Insertor();