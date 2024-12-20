module.exports = {
  up: async (queryInterface, Sequelize) => {
      // Insert seed data into the 'Products' table
      await queryInterface.bulkInsert('Products', [
          {
              title: 'Product 1',
              price: 100.00,
              description: 'Description for Product 1',
              addons: JSON.stringify([{ key: 'addon1', price: 10.00 }]),
              images: JSON.stringify(['image1.jpg']),
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              title: 'Product 2',
              price: 200.00,
              description: 'Description for Product 2',
              addons: JSON.stringify([{ key: 'addon2', price: 20.00 }]),
              images: JSON.stringify(['image2.jpg']),
              createdAt: new Date(),
              updatedAt: new Date()
          }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
      // Remove seed data from the 'Products' table
      await queryInterface.bulkDelete('Products', null, {});
  }
};
