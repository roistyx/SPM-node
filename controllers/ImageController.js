const Jimp = require('jimp');
const path = require('path');

class ImageController {
  static async getBackgroundImage(req, res) {
    const protocol = req.protocol;
    const host = req.headers.host;
    const fullUrl = `${protocol}://${host}`;
    console.log(fullUrl);
    const { element, opacity } = req.params;

    const imagePath = path.join(
      __dirname,
      '..',
      'public',
      'images',
      `${element}`
    );

    try {
      const image = await Jimp.read(imagePath);
      const modifiedImage = image.opacity(parseFloat(opacity));

      const outputFilePath = path.join(
        __dirname,
        '..',
        'public',
        'images',
        'modified',
        `${element}`
      );
      await modifiedImage.writeAsync(outputFilePath);

      const outputUrl = `/images/modified/${element}`;

      res.send({
        message: 'Image processed successfully',
        url: fullUrl + outputUrl,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: 'Error processing image', error: err });
    }
  }
}

module.exports = ImageController;
