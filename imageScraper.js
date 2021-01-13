const fs = require("fs");
const sizeOf = require("image-size");
const gm = require("gm");

const convertImgArr = (images, imageLoc, outPrefix, makeThumbs) => {
   let out = [];
   for (let i = 0; i < images.length; i++) {
      if (images[i][images[i].indexOf(".") - 1] !== "_") {
         const thumbName = images[i].replace(".", "_thumb_.");
         const filePath = imageLoc + images[i];
         let dims = sizeOf(filePath);

         if (
            makeThumbs ||
            i === images.length - 1 ||
            !images[i + 1].match("_thumb_")
         ) {
            gm(filePath)
               .resize(64, 64)
               .write(imageLoc + thumbName, (err) => {
                  if (!err)
                     console.log(`Created Thumbnail: ${imageLoc + thumbName}`);
               });
         }

         if (dims.orientation === 6) {
            let tmp = dims.width;
            dims.width = dims.height;
            dims.height = tmp;
         }
         out.push({
            src: outPrefix + images[i],
            original: outPrefix + images[i],
            thumbnail: outPrefix + thumbName,
            placeholder: outPrefix + thumbName,
            ...dims,
         });
      }
   }
   return out;
};

const imagesToJSON = (imageLoc, outPrefix, outFile, makeThumbs) => {
   let imgOut = [];

   fs.readdir(imageLoc, async (err, images) => {
      if (err) {
         console.error(err);
      } else {
         imgOut = await convertImgArr(images, imageLoc, outPrefix, makeThumbs);

         const outStr = JSON.stringify(imgOut, null, 4);

         console.log(outStr);

         fs.writeFile(outFile, outStr, "utf8", () =>
            console.log(`Saved photos obj to ${outFile}`)
         );
      }
   });
};

// imagesToJSON(
//    "./public/ceramics/",
//    "/ceramics/",
//    "./src/components/routes/ceramics-photos.json",
//    true
// );
imagesToJSON(
  './public/photos/',
  '/photos/',
  './src/components/routes/photos.json',
  true
);
// imagesToJSON('./public/icons/', '/icons/', './public/icons/icons.json', true);
