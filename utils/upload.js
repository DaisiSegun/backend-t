const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'Root',
      quality: '50', // Optional: Set a folder in your Cloudinary account
    });

    return result.secure_url;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

module.exports = upload;
