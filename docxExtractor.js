const execSync = require('child_process').execSync;
const fs = require('fs');
// import { execSync } from 'child_process';  // replace ^ if using ES modules

const [, , originalDocxPath] = process.argv;
const commande = 'docx-images extract --docx '+originalDocxPath+' --output-dir ./ --opts-module STUB.js';

const output = execSync(commande, { encoding: 'utf-8' });  // the default is 'buffer'
console.log('Output was:\n', output);

const dir = 'word/media';

fs.readdir(dir, async (err, files) => {
    console.log(files.length);
    for(let i =1;i*2<=files.length;i++){
        
        fs.unlink(dir+'/image'+i+'.1.png', (err) => {
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
