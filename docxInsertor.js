const DocxImager = require('docxImager');
const fs = require('fs');

let docxImager = new DocxImager();

const [, , originalDocxPath] = process.argv;

function Insertor(){

    docxImager.load(originalDocxPath);
    const dir = 'rendu/converti';

    
    fs.readdir(dir, async (err, files) => {
        console.log(files.length);

        for(file of files){
            let type = file.substring(file.length - 3);
            let id = file.match(/\d/g);
            await docxImager.replaceWithLocalImage(dir+'/'+file, id, 'png', type);
        }

    });

    
    setTimeout( () => {
        docxImager.save('new_docx.docx');
    }, 100);
}   

Insertor();