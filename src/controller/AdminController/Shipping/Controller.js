const { Shipping } = require('../../../../models'); // Adjust the path to your model
const { successResponse, errorResponse } = require('../../../helper');
let ShippingController = {
// Function to create a new product
createShipping: async (req, res) => {
  try {
    const { shippingInfo, cartItems, totalPrice, deliveryFee, grandTotal } = req.body;

    // // Validate the request
    // if (!shippingInfo || !cartItems || !totalPrice || !deliveryFee || !grandTotal) {
    //   return res.status(400).json({ message: 'Invalid request data' });
    // }

    // Create a new order
    const order = new Shipping({
      shippingInfo,
      cartItems,
      totalPrice,
      deliveryFee,
      grandTotal,
    });

    // Save the order to the database
    await order.save();

    // Respond with success
    res.status(200).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Error creating order" });
  }
},
  

    // Function to get a product by ID
    getShippingById: async (req, res) => {
        try {
            const { id } = req.params;

            const shipping = await Reviews.findByPk(id);

            if (!shipping) {
                // errorResponse(res, 404, "Product not found");
                // errorResponse(500, error, "Product not found");
                return;
            }
            return res.status(201).json({ shipping });
            // successResponse(200, res, "Product retrieved successfully.", product);
        } catch (error) {
            console.error("Error occurred while retrieving product:", error);
            // errorResponse(500, error, "An error occurred while retrieving the product");
        }
    },

    // Function to get all products
    getAllShipping: async (req, res) => {
        try {
            const shipping = await Shipping.findAll();
            return res.status(200).json({ shipping });
            // successResponse(res, 200, "Products retrieved successfully.", products);
        } catch (error) {
            console.error("Error occurred while retrieving products:", error);
            // errorResponse(res, 500, "An error occurred while retrieving the products");
        }
    },
    deleteShipping: async (req, res) => {
      try {
        const { id } = req.params;
  
        const shipping = await Shipping.findByPk(id);
  
        if (!shipping) {
          return res.status(404).json({ error: "shipping not found" });
        }
  
        // Delete the product
        await shipping.destroy();
  
        console.log("shipping Deleted:", shipping);
        
        return res.status(200).json({ message: "shipping deleted successfully" });
      } catch (error) {
        console.error("Error deleting shipping:", error);
        return res.status(500).json({ error: "Error deleting shipping" });
      }
    },

};

module.exports = ShippingController;
