module.exports = (sequelize, DataTypes) => {
    const Cart_Product = sequelize.define('Cart_Product', {
      ID_Cart: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ID_Product: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    },{
        tableName: 'cart_product',
        timestamps: false
    });
  
    return Cart_Product;
  };
  