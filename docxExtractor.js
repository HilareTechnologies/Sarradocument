const execSync = require('child_process').execSync;
// import { execSync } from 'child_process';  // replace ^ if using ES modules

const [, , originalDocxPath] = process.argv;
const commande = 'docx-images extract --docx '+originalDocxPath+' --output-dir rendu --opts-module STUB.js';

const output = execSync(commande, { encoding: 'utf-8' });  // the default is 'buffer'
console.log('Output was:\n', output); 