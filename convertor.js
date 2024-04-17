var docxConverter = require('docx-pdf');

const [, , originalPdfPath] = process.argv;
var outPath = "./resultat.pdf";

docxConverter(originalPdfPath,outPath,function(err,result){
  if(err){
    console.log(err);
  }
  console.log('result'+result);
});

