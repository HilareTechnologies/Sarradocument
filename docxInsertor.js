const DocxImager = require('DocxImager');

let docxImager = new DocxImager();

const [, , originalDocxPath] = process.argv;

docxImager.load(originalDocxPath)

const dir = 'rendu/word/media';

fs.readdir(dir, (err, files) => {
  console.log(files.length);
   for(let i =0;i<files.length/2;i++){
    docxImager.replaceWithImageURL('rendu/word/processed'+i+'.png', i, 'png');
  }
});

docxImager.save('new_docx.docx');