const { Contacts } = require('../../../../models'); // Adjust the path to your model
const { successResponse, errorResponse } = require('../../../helper');
let ContactController = {
// Function to create a new product
createContact: async (req, res) => {
    try {
      const { name,email,phone,message } = req.body;
  
      // Create the product
      const contact = await Contacts.create({
        name,email,phone,message
      });
  
      
      res.status(201).json({ contact });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Error creating product" });
    }
  },
  

    // Function to get a product by ID
    getContactById: async (req, res) => {
        try {
            const { id } = req.params;

            const contact = await Contacts.findByPk(id);

            return res.status(201).json({ contact });
            // successResponse(200, res, "Product retrieved successfully.", product);
        } catch (error) {
            console.error("Error occurred while retrieving product:", error);
            // errorResponse(500, error, "An error occurred while retrieving the product");
        }
    },

  // Function to get all contacts
  getAllContact: async (req, res) => {
    try {
      const contacts = await Contacts.findAll();

      if (!contacts.length) {
        return res.status(404).json({ error: "No contacts found" });
      }

      return res.status(200).json({ contacts });
    } catch (error) {
      console.error("Error occurred while retrieving contacts:", error);
      return res.status(500).json({ error: "An error occurred while retrieving contacts" });
    }
  },
  deleteContact: async (req, res) => {
    try {
      const { id } = req.params;

      const contacts = await Contacts.findByPk(id);

      if (!contacts) {
        return res.status(404).json({ error: "shipping not found" });
      }

      // Delete the product
      await contacts.destroy();

      console.log("contacts Deleted:", contacts);
      
      return res.status(200).json({ message: "contacts deleted successfully" });
    } catch (error) {
      console.error("Error deleting contacts:", error);
      return res.status(500).json({ error: "Error deleting contacts" });
    }
  },

};

module.exports = ContactController;
