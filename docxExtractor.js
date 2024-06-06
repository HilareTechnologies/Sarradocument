const DocxImager = require('docxImager');

let docxImager = new DocxImager();

const [, , originalDocxPath] = process.argv;    // path du document dont les images vont etre extraite
const dir = 'word/media';                       // dossier ou les image vont etre sauvegardé

/**
 * Fonction qui appel la librairie docxImager qui extrait les images des fichier docx
 * @param pathDocxFile chemain du fichier docx
 * @param imgDir dossier ou les images vont etre sauvegarder
 */
async function Extractor(pathDocxFile, imgDir){

    await docxImager.load(pathDocxFile); // charge le fichier
    
    docxImager.extractLocalImages(imgDir); // extrait les images
}

Extractor(originalDocxPath, dir);
