import dotenv from 'dotenv';
dotenv.config();
import { uploadOnCloudinary } from '../utils/cloudinary.js';

import TextSliderModel from '../model/textSliderModel.js';

export const textSliderImage = async (req, res) => {
    try {
        const textImage1 = req.files?.textImage1?.[0]?.path;
        const textImage2 = req.files?.textImage2?.[0]?.path;

        if(!textImage1 || !textImage2) {
            return res.status(400).json({
                success: false,
                message: 'Please upload both images',
            });
        }
        let uploadedImage1, uploadedImage2;
        try {
            uploadedImage1 = await uploadOnCloudinary(textImage1);
            uploadedImage2 = await uploadOnCloudinary(textImage2);
            console.log("uploadedImage1", uploadedImage1);
            console.log("uploadedImage2", uploadedImage2);
        } catch (error) {
            console.error("uploading both images failed", error);
            return res.status(500).json({
                success: false,
                message: "Uploaded Both Images to Cloudinary Failed",
                error: error.message,
            });
        }

        const textSlider = new TextSliderModel({
            textImage1: uploadedImage1?.secure_url || "",
            textImage2: uploadedImage2?.secure_url || "",
        });
        const savedResult = await textSlider.save();
        res.status(201).json({
            success: true,
            message: "text slider image uploaded successfully",
            data: savedResult
        });
    } catch (error) {
        console.error("Error in textSlider Image", error);
            res.status(500).json({
                success: false,
                message: "Error in textSlider Image",
                error: error.message,
            });
    }
};