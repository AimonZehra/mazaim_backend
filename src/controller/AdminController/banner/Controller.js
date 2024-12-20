const { Banner } = require('../../../../models'); // Adjust the path to your model
const { successResponse, errorResponse } = require('../../../helper');


let BannerController = {
    AddBanner: async (req, res) => {
        try {
            const { image } = req.body;
    
             // Create a new banner if no ID is provided
             const newBanner = await Banner.create({ image });
             console.log("New Banner Created Successfully");
             return res.status(201).json({ message: "New banner created successfully", banner: newBanner });
        } catch (error) {
            console.error("Error adding banner:", error);
            res.status(500).json({ error: "Error updating banner" });
        }
    },
    
    // Function to create a new banner
    updateBanner: async (req, res) => {
        try {
            const { id, image } = req.body;
    
            // Find the banner first
            const banner = await Banner.findOne({ where: { id: id } });
            if (!banner) {
                return res.status(404).json({ error: "Banner not found" });
            }
    
            // Update the banner
            const [affectedCount] = await Banner.update(
                { image: image }, // Fields to update
                { where: { id: id } } // Conditions for the update
            );
    
            if (affectedCount === 0) {
                return res.status(404).json({ error: "No banners updated" });
            }
    
            console.log("Banner Updated Successfully");
            res.status(200).json({ message: "Banner updated successfully" });
        } catch (error) {
            console.error("Error updating banner:", error);
            res.status(500).json({ error: "Error updating banner" });
        }
    },
    

    // Function to get all banners
    getBanners: async (req, res) => {
        try {
            const banners = await Banner.findAll();
            return res.status(200).json({ banners });
        } catch (error) {
            console.error("Error occurred while retrieving banners:", error);
            res.status(500).json({ error: "Error retrieving banners" });
        }
    },

};

module.exports = BannerController;
