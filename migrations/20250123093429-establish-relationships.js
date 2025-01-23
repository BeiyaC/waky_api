'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add foreign keys for relationships

    // User -> Cart (One-to-Many)
    await queryInterface.addConstraint('Carts', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_cart_user', // Custom name
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Cart -> CartItem (One-to-Many)
    await queryInterface.addConstraint('CartItems', {
      fields: ['cartId'],
      type: 'foreign key',
      name: 'fk_cartitem_cart',
      references: {
        table: 'Carts',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Product -> CartItem (One-to-Many)
    await queryInterface.addConstraint('CartItems', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'fk_cartitem_product',
      references: {
        table: 'Products',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // User -> Order (One-to-Many)
    await queryInterface.addConstraint('Orders', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_order_user',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Order -> OrderItem (One-to-Many)
    await queryInterface.addConstraint('OrderItems', {
      fields: ['orderId'],
      type: 'foreign key',
      name: 'fk_orderitem_order',
      references: {
        table: 'Orders',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Product -> OrderItem (One-to-Many)
    await queryInterface.addConstraint('OrderItems', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'fk_orderitem_product',
      references: {
        table: 'Products',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Product -> Tag (Many-to-Many through ProductTags)
    await queryInterface.createTable('ProductTags', {
      productId: {
        type: Sequelize.INTEGER,
        references: { model: 'Products', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: { model: 'Tags', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop ProductTags join table
    await queryInterface.dropTable('ProductTags');

    // Remove foreign key constraints
    await queryInterface.removeConstraint('CartItems', 'fk_cartitem_cart');
    await queryInterface.removeConstraint('CartItems', 'fk_cartitem_product');
    await queryInterface.removeConstraint('Carts', 'fk_cart_user');
    await queryInterface.removeConstraint('Orders', 'fk_order_user');
    await queryInterface.removeConstraint('OrderItems', 'fk_orderitem_order');
    await queryInterface.removeConstraint('OrderItems', 'fk_orderitem_product');
  },
};
