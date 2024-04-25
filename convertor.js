const fs = require("fs");
const Jimp = require('jimp');

const [, , originalPdfPath] = process.argv;

fs.readdir(originalPdfPath,async (err, files) => {
    for(let i =1;i<=files.length;i++){
        const image = await Jimp.read(originalPdfPath+"/image"+i+".png");
        // Save and overwrite the image
        await image.writeAsync(`rendu/converti/image${i}.jpg`);
    };
});