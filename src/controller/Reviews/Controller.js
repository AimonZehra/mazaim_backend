const { Reviews } = require('../../../models'); // Adjust the path to your model
const { successResponse, errorResponse } = require('../../helper');
let ReviewsController = {
// Function to create a new product
createReview: async (req, res) => {
    try { 
      const {productId,comment ,rating } = req.body;
      
      // Create the product
      const newReviews = await Reviews.create({
        productId, comment ,rating
      });
  
      console.log("New Product Created:", newReviews);
      
      res.status(201).json({ newReviews });
      
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Error creating product" });
    }
  },
  

    // Function to get a product by ID
    getReviewById: async (req, res) => {
        try {
            const { id } = req.params;
            const reviews = await Reviews.findAll({ where: { productId: id } });
         
            if (!reviews) {
                // errorResponse(res, 404, "Product not found");
                // errorResponse(500, error, "Product not found");
                return;
            }
        
            return res.status(201).json({ reviews });
      
            
            // successResponse(200, res, "Product retrieved successfully.", product);
        } catch (error) {
            console.error("Error occurred while retrieving product:", error);
            // errorResponse(500, error, "An error occurred while retrieving the product");
        }
    },

    // Function to get all products
    getAllReviews: async (req, res) => {
        try {
            const reviews = await Reviews.findAll();
            return res.status(200).json({ reviews });
            // successResponse(res, 200, "Products retrieved successfully.", products);
        } catch (error) {
            console.error("Error occurred while retrieving products:", error);
            // errorResponse(res, 500, "An error occurred while retrieving the products");
        }
    },

    deleteReview : async (req, res) => {
      try {
        const { id } = req.params;
  
        const reviews = await Reviews.findByPk(id);
  
        if (!reviews) {
          return res.status(404).json({ error: "reviews not found" });
        }
  
        // Delete the product
        await reviews.destroy();
  
        console.log("reviews Deleted:", reviews);
        
        return res.status(200).json({ message: "reviews deleted successfully" });
      } catch (error) {
        console.error("Error deleting reviews:", error);
        return res.status(500).json({ error: "Error deleting reviews" });
      }
    },
  
};

module.exports = ReviewsController;
