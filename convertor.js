const fs = require("fs");
const Jimp = require('jimp');

const [, , originalPdfPath] = process.argv;

fs.readdir(originalPdfPath,async (err, files) => {
    for(file of files){
        const image = await Jimp.read(originalPdfPath+"/"+file);

        if (!image.hasAlpha()){
            let name = file.split('.')[0];
            // Save and overwrite the image
            await image.writeAsync('rendu/converti/'+name+'.jpg');
        } else {
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
        }
    };
});