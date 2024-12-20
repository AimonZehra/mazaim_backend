const { Products,Coupon } = require('../../../../models'); // Adjust the path to your model
const { successResponse, errorResponse } = require('../../../helper');
console.log('Products model:', Products);
let ProductsController = {
// Function to create a new product
createProduct: async (req, res) => {
    try {
      const { title, price,show_price,discounted_price, description,quantity, type, sub_type, top_featured, addOns, images, imageColors } = req.body;
    
      console.log("Request Body:", { title, price, description,quantity, addOns, images, imageColors });
  
      // Create the product
      const newProduct = await Products.create({
        title,
        price,
        show_price,
        discounted_price,
        description,
        quantity,
        type,
        sub_type,
        top_featured,
        addOns,
        images,
        imageColors  // Adding imageColor here
      });
  
      console.log("New Product Created:", newProduct);
      
      res.status(201).json({ newProduct });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Error creating product" });
    }
  },
  

    // Function to get a product by ID
    getProductById: async (req, res) => {
        try {
            const { id } = req.params;

            const product = await Products.findByPk(id);

            if (!product) {
                // errorResponse(res, 404, "Product not found");
                // errorResponse(500, error, "Product not found");
                return;
            }
            return res.status(201).json({ product });
            // successResponse(200, res, "Product retrieved successfully.", product);
        } catch (error) {
            console.error("Error occurred while retrieving product:", error);
            // errorResponse(500, error, "An error occurred while retrieving the product");
        }
    },

    // Function to get all products
    getAllProducts: async (req, res) => {
        try {
            const products = await Products.findAll();
            return res.status(200).json({ products });
            // successResponse(res, 200, "Products retrieved successfully.", products);
        } catch (error) {
            console.error("Error occurred while retrieving products:", error);
            // errorResponse(res, 500, "An error occurred while retrieving the products");
        }
    },
     // Function to update a product by ID
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      console.log('Product ID:', id);
      const { title, price,show_price, description,discounted_price, quantity, type, sub_type, top_featured, addOns, images, imageColors } = req.body;

      const product = await Products.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Update product fields
      const updatedProduct = await product.update({
        title,
        price,
        show_price,
        discounted_price,
        description,
        quantity,
        type,
        sub_type,
        top_featured,
        addOns,
        images,
        imageColors  // Updating imageColor
      });

      console.log("Product Updated:", updatedProduct);
      
      return res.status(200).json({ updatedProduct });
    } catch (error) {
      console.error("Error updating product:", error);
      return res.status(500).json({ error: "Error updating product" });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Products.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Delete the product
      await product.destroy();

      console.log("Product Deleted:", product);
      
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({ error: "Error deleting product" });
    }
  },
  applyDiscountToProduct: async (req, res) => {
    try {
      const { coupon_code,discount } = req.body;
  
      // Create the product
      const  coupon = await Coupon.create({
        coupon_code,discount
      });

      res.status(201).json({ coupon });

 
    } catch (error) {
      console.error('Error applying discount to products:', error);
      return res.status(500).json({ error: 'An error occurred while applying the discount' });
    }
  },
 // Function to get a coupon by coupon_code
getCouponByCode: async (req, res) => {
  try {
    const { coupon_code } = req.params;

    // Use findOne to search for a coupon by coupon_code
    const coupon = await Coupon.findOne({ where: { coupon_code } });

    // If no coupon is found, send a 404 response
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    // Return the found coupon in the response
    return res.status(200).json({ coupon });
  } catch (error) {
    console.error("Error occurred while retrieving coupon:", error);
    return res.status(500).json({ error: "An error occurred while retrieving the coupon" });
  }
},

  // Function to get all contacts
  getAllCoupons: async (req, res) => {
    try {
      const coupons = await Coupon.findAll();

      if (!coupons.length) {
        return res.status(404).json({ error: "No Coupon found" });
      }

      return res.status(200).json({ coupons });
    } catch (error) {
      console.error("Error occurred while retrieving contacts:", error);
      return res.status(500).json({ error: "An error occurred while retrieving contacts" });
    }
  },
       // Function to update a product by ID
       updateCoupon: async (req, res) => {
        try {
          const { id } = req.params;
          const { coupon_code,discount } = req.body;    
          const coupon = await Coupon.findByPk(id);
    
          if (!coupon) {
            return res.status(404).json({ error: "Product not found" });
          }
    
          // Update product fields
          const updatedProduct = await coupon.update({
            coupon_code,discount
          });
    
          console.log("Coupon Updated:", updatedProduct);
          
          return res.status(200).json({ updatedProduct });
        } catch (error) {
          console.error("Error updating product:", error);
          return res.status(500).json({ error: "Error updating product" });
        }
      },
  deleteCoupon: async (req, res) => {
    try {
      const { id } = req.params;

      const coupon = await Coupon.findByPk(id);

      if (!coupon) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Delete the product
      await coupon.destroy();

      console.log("Product Deleted:", coupon);
      
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({ error: "Error deleting product" });
    }
  },
};

module.exports = ProductsController;
