const { Products, Cart } = require('../../../models'); // Adjust the path to your models
const products = require('../../../models/products');
const { successResponse, errorResponse } = require('../../helper');

let CheckoutController = {
 // Function to add a product to the cart
AddToCart: async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Find the product by ID
    const product = await Products.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the product is already in the cart for this user
    let cartItem = await Cart.findOne({ where: { productId } });

    if (cartItem) {
      // If the product is already in the cart, update the quantity and price
      cartItem.quantity += quantity;
      cartItem.price += product.price + quantity; // Update the price based on the added quantity
      await cartItem.save();
    } else {
      // If not, add it to the cart
      cartItem = await Cart.create({
        productId,
        quantity,
        title: product.title,
        price: product.price + quantity, // Multiply price by quantity
        color: product.color, // Ensure color is added correctly (this assumes a color field exists)
        
      });
    }

    return res.status(201).json({ cartItem });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Error adding product to cart" });
  }
},


  // Function to view all items in the user's cart
  getCart: async (req, res) => {
    try {
      const cartItems = await Cart.findAll({
        include: [{
          model: Products,
          as: 'product', // Use the alias specified in the association
          attributes: ['description', 'images'], // Include product details
        }],
      });
      return res.status(200).json({ cartItems });
    } catch (error) {
      console.error("Error retrieving cart:", error);
      res.status(500).json({ error: "Error retrieving cart" });
    }
  },

  // Function to view all items in the user's cart
  ViewCart: async (req, res) => {
    try {
      const { productId } = req.body;
      // Get all cart items for the user
      const cartItems = await Cart.findAll({
        where: { productId },
        include: [{
          model: Products,
          as: 'product', // Use the alias specified in the association
          attributes: ['title', 'price', 'description', 'images'], // Include product details
        }],
      });

      return res.status(200).json({ cartItems });
    } catch (error) {
      console.error("Error retrieving cart:", error);
      res.status(500).json({ error: "Error retrieving cart" });
    }
  },
  // Function to remove a product from the cart
  RemoveFromCart: async (req, res) => {
    try {
      const { productId } = req.params;
      // Find the cart item to be removed
      const cartItem = await Cart.findOne({ where: { productId } });

      if (!cartItem) {
        return res.status(404).json({ error: "Product not found in the cart" });
      }

      // Remove the item from the cart
      await cartItem.destroy();

      return res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
      console.error("Error removing product from cart:", error);
      res.status(500).json({ error: "Error removing product from cart" });
    }
  },

  // Function to update the quantity of a cart item
  UpdateCartItemQuantity: async (req, res) => {
    try {
      const { productId, quantity } = req.body;
    

      // Find the cart item
      let cartItem = await Cart.findOne({ where: { productId } });

      if (!cartItem) {
        return res.status(404).json({ error: "Product not found in cart" });
      }

      // Update the quantity
      cartItem.quantity = quantity;
      await cartItem.save();

      return res.status(200).json({ cartItem });
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ error: "Error updating cart item" });
    }
  },
};

module.exports = CheckoutController;
