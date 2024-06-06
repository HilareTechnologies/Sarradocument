const DocxImager = require('docxImager');
const fs = require('fs');

let docxImager = new DocxImager();

//path du fichier dont les image doivent etre remplacé
const [, , originalDocxPath] = process.argv;

const dir = 'rendu/converti';

/**
 * Fonction qui remplace les images d'un fichier docx
 * @param filePath chemain du fichier ou les images vont etre remplacé.
 * @param imgDir dossier ou sont stocker les images
 */
function Insertor(filePath, imgDir){

    docxImager.load(filePath);      // charge le fichier docx
    
    //ouvre le dossier contenant les images.
    fs.readdir(imgDir, async (err, files) => {

        for(let file of files){
            let type = file.substring(file.length - 3);     //recupere le type de l'image
            let id = file.match(/\d/g);                     // recupere l'id de l'image (ex: 3 dans image3.jpg)
            await docxImager.replaceWithLocalImage(imgDir+'/'+file, id, 'png', type);  //appel la fonction de la libraire qui va remplacer la bonne image
        }

    });
    
    //sauvegarde le fichier une fois les image remplacé
    setTimeout( () => {
        docxImager.save('new_docx.docx');
    }, 100);
}   

Insertor(originalDocxPath, dir);