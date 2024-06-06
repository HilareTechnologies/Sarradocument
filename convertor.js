const fs = require("fs");
const Jimp = require('jimp');

//dossier ou sont les image a convertir (habituellement word/media)
const [, , originalPdfPath] = process.argv;

const fileRendu = 'rendu/converti'; 

//vide le dossier rendu/converti au cas ou il ne le serais pas deja
fs.readdir(fileRendu, async (err,files)=> {
    for(let file of files){
        fs.unlink(fileRendu+"/"+file, (err) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    console.error('File does not exist.');
                } else {
                    throw err;
                }
            } else {
                console.log('File deleted!');
            }
        });
    }
});

//convertie les images
fs.readdir(originalPdfPath,async (err, files) => {
    for(let file of files){
        const image = await Jimp.read(originalPdfPath+"/"+file); // ouvre l'image avec jimp

        let name = file.split('.')[0]; //recupere le nom de l'image
        let extantion = file.split('.')[1]; // recupere l'extantion de l'image

        if (!image.hasAlpha() && extantion=="png"){
            await image.writeAsync(fileRendu+'/'+name+'.jpg'); // si l'image n'as pas de transparence elle est convertie en jpg
        } else {
            await image.writeAsync(fileRendu+'/'+name+'.'+extantion); // sinon elle garde son extantion
        }
        //les images sont sauvegarder dans le dossier de rendu

        //les images du dossier d'origine sont suprimmé
        fs.unlink(originalPdfPath+"/"+file, (err) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    console.error('File does not exist.');
                } else {
                    throw err;
                }
            } else {
                console.log('File deleted!');
            }
        });
    };
});