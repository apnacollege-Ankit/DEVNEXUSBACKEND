import { uploadOnCloudinary } from '../utils/cloudinary.js';
import dotenv from 'dotenv';
dotenv.config();
// import fs from 'fs';
import BrandModel from '../model/brandModel.js';
import ServiceModel from '../model/serviceModel.js';
import IndustryModel from '../model/industryModel.js';
import PortModel from '../model/portModel.js';

export const addService = async (req, res) => {
    try {
    const {title} = req.body;
    const image = req.file?.path;

    if (!title || !image) {
        return res.status(400).json({
        success: false,
        message: "Product image is missing",
        });
    }

    let uploadedImage;
    try {
        uploadedImage = await uploadOnCloudinary(image);
        console.log("uploadedImage", uploadedImage);
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        return res.status(500).json({message: "Error uploading image to Cloudinary:"})
    }


    // Create MongoDB record
    const newProduct = new ServiceModel({
        title,
        image: uploadedImage?.url || "",
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
        success: true,
        message: "Image uploaded and product saved successfully",
        data: savedProduct,
    });
    } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({
        success: false,
        message: "Server error during upload",
        error: error.message,
    });
    }
};

export const addBrand = async (req,res) => {
    try {
        const image = req.file?.path;

        if(!image) {
            return res.status(400).json({
                success: false,
                message: "Brand image is missing",
            });
        }
        let uploadedImage;
        try {
            uploadedImage = await uploadOnCloudinary(image);
            console.log("uploadedImage", uploadedImage);
        } catch(error) {
            console.error("Error uploading image to Cloudinary:", error);
        return res.status(500).json({
            success: false,
            message: "Error uploading image to Cloudinary:",
            error: error.message,
        });
    }

    const newBrand = new BrandModel({
        image : uploadedImage?.url || "",
    });

    const savedBrand = await newBrand.save();
    res.status(201).json({
        success: true,
        message: "Image Uploaded and Brand Saved Successfully",
        data: savedBrand,
    });
    }catch (error) {
    console.error("upload error", error);
        res.status(500).json({
            success: false,
            message: "Server error during upload",
            error: error.message,
        });
    }
};

export const addPort = async (req, res) => {
    try {
    const image = req.file?.path;
    const {title} = req.body;


    if(!image) {
        return res.status(400).json({
        success: false,
        message: "Port image is missing",
        });
    }

    let uploadedImage;
    try {
        uploadedImage = await uploadOnCloudinary(image);
        console.log("uploadedImage", uploadedImage);
    } catch (error) {
        console.error("Error uploading image to cloudinary", error);
        return res.status(500).json({message: "Error Uploading image to Cloudinary"})
    }
    
    const newPort = new PortModel({
        image: uploadedImage?.url || "",
        title,
    });
    const savedPort = await newPort.save();
    res.status(201).json({
        success: true,
        message: "image uploaded and portfolio saved successfully",
        data: savedPort,
    });
} catch (error) {
    console.error("upload error", error);
    res.status(500).json({
        success:false,
        message: "Server error during upload",
        error: error.message
    });
}
};

export const addIndustry = async (req, res) => {
    try {
        const {title} = req.body;
        const image = req.file?.path;

        if(!image) {
            return res.status(400).json({
                success: false,
                message: "Industry image is missing",
            });
        }
        let uploadedImage;
        try {
            uploadedImage = await uploadOnCloudinary(image);
            console.log("uploadedImage", uploadedImage);
        } catch(error) {
            console.error("Error uploading image to cloudinary", error);
            return res.status(500).json({message: "Error uploading image to cloudinary:"})
        }

        const newIndustry = new IndustryModel( {
            title,
            image: uploadedImage?.url || "",
        });
        const savedIndustry = await newIndustry.save();
        res.status(201).json({
            success: true,
            message: "industry image saved successfully",
            data: savedIndustry,
        });
    } catch(error) {
        console.error("Upload Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error during upload",
            error: error.message,
        });
    }
};


