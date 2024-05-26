import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// upload on cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfully
    console.log("File is uploaded successfully");
    console.log(response.url);
    return response;
  } catch (err) {
    fs.unLinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    console.log(err);
    return null;
  }
};

export { uploadOnCloudinary };