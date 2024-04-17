const docxConverter = require('docx-pdf');
const PdfExtractor = require('pdf-extractor').PdfExtractor;

const [, , originalPdfPath] = process.argv;
var leType = originalPdfPath.split('.')[1];
let outputDir = 'rendu';

if (leType=="pdf"){
    extractor(originalPdfPath);
} else if (leType=="docx"){
    docxConverter(originalPdfPath,"./resultat.pdf",function(err,result){
        if(err){
            console.log(err);
        }
        console.log('result'+result);
    });
    extractor("./ressultat.pdf");
}


function extractor(path){
    
    pdfExtractor = new PdfExtractor(outputDir, {
        viewportScale: (width, height) => {
            //dynamic zoom based on rendering a page to a fixed page size 
            if (width > height) {
                //landscape: 1100px wide
                return 1100 / width;
            }
            //portrait: 800px wide
            return 800 / width;
        },
        pageRange: [1,5],
    });

    pdfExtractor.parse(path).then(function () {
        console.log('# End of Document');
    }).catch(function (err) {
        console.error('Error: ' + err);
    });

}