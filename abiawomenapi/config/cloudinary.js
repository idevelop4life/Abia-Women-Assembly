// config/cloudinary.js
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


async function uploadDefaultAvatar() {
  try {
    const result = await cloudinary.uploader.upload(
      path.join(__dirname, 'default_avatar.png'),
      {
        public_id: 'default_avatar',
        overwrite: true, // in case it already exists
        folder: '', // or 'default_avatar' if you want to use a subfolder
      }
    );
    console.log('Uploaded:', result.secure_url);
  } catch (err) {
    console.error('Upload failed:', err);
  }
}

uploadDefaultAvatar();

module.exports = cloudinary;
