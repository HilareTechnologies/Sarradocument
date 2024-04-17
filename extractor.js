const { ExtractImages } = require("pdf-image-extractor");
const fs = require('fs');

const [, , originalPdfPath] = process.argv;

const pdfSource = new Blob([fs.readFileSync(originalPdfPath)]);
const fileType = "blob"; // or 'blob' based on your input type

ExtractImages({ pdf: pdfSource, fileType: fileType }).then((images) => {
  console.log(images);
  var imgName = 0;
  var filename;
  images.forEach(async (image) => {
    var imgType = image.imageType.split("/")[1];
    console.log(image.imageType); // Blob URL for the image
    // You can use the blob URL to display the image or download it
    filename = await 'rendu/downloaded_image'+imgName+"."+imgType;
    imgName+=1;
    fs.writeFileSync(filename, Buffer.from(await image.blob.arrayBuffer()));
    console.log('Image downloaded successfully.');
    
  });
});