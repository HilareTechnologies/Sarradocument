const fs = require("fs");
const Jimp = require('jimp');

const [, , originalPdfPath] = process.argv;

const fileRendu = 'rendu/converti'; 

fs.readdir(fileRendu, async (err,files)=> {
    for(file of files){
        fs.unlink(fileRendu+"/"+file, (err) => {
            if (err) {
                // Handle specific error if any
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

fs.readdir(originalPdfPath,async (err, files) => {
    for(file of files){
        const image = await Jimp.read(originalPdfPath+"/"+file);

        let name = file.split('.')[0];
        let extantion = file.split('.')[1];

        if (!image.hasAlpha() && extantion=="png"){
            
            
            await image.writeAsync(fileRendu+'/'+name+'.jpg');


        } else {
            await image.writeAsync(fileRendu+'/'+name+'.'+extantion);
        }
        fs.unlink(originalPdfPath+"/"+file, (err) => {
            if (err) {
                // Handle specific error if any
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