const fs = require('fs');
const sizeOf = require('image-size');
// const gm = require('gm');

// const getSizePromise = (...args) => {
//   return new Promise((resolve, reject) => {
//     gm(args).size((err, size) => {
//       if (err) return reject(err);
//       resolve(size);
//     });
//   });
// };

// const getSizePromise = (...args) => {
//   return new Promise((resolve, reject) => {
//     sizeOf(args, (err, dimensions) => {
//       resolve(dimensions);
//     });
//   });
// };

const convertImgArr = (images, imageLoc, outPrefix) => {
  let out = [];
  for (let i = 0; i < images.length; i++) {
    const filePath = imageLoc + images[i];
    let dims = sizeOf(filePath);
    if (dims.orientation === 6) {
      let tmp = dims.width;
      dims.width = dims.height;
      dims.height = tmp;
    }
    out.push({
      src       : outPrefix + images[i],
      original  : outPrefix + images[i],
      thumbnail : outPrefix + images[i],
      ...dims,
    });
    // await getSizePromise(filePath)
    //   .then((size) => {
    //     out = [
    //       ...out,
    //       {
    //         src : outPrefix + images[i],
    //         ...size,
    //       },
    //     ];
    //   })
    //   .catch((err) => console.error(err));
  }
  return out;
};

const imagesToJSON = (imageLoc, outPrefix, outFile) => {
  let imgOut = [];

  fs.readdir(imageLoc, async (err, images) => {
    if (err) {
      console.error(err);
    } else {
      imgOut = await convertImgArr(images, imageLoc, outPrefix);

      const outStr = JSON.stringify(imgOut, null, 4);

      console.log(outStr);

      fs.writeFile(outFile, outStr, 'utf8', () =>
        console.log(`Saved photos obj to ${outFile}`)
      );
    }
  });
};

imagesToJSON(
  './public/ceramics/',
  '/ceramics/',
  './src/components/routes/ceramics-photos.json'
);
imagesToJSON(
  './public/photos/',
  '/photos/',
  './src/components/routes/photos.json'
);
