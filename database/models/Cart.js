module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
      ID_Cart: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ID_Customer: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Date_Record: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      Estate: {
        type: DataTypes.ENUM('active', 'abandoned', 'complete'),
        allowNull: false
      },
      Total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    },{
        tableName: 'cart',
        timestamps: false
    });
  
    Cart.associate = (models) => {
      // Relación uno a muchos entre Cart y Customer
      Cart.belongsTo(models.Customer, {
        foreignKey: 'ID_Customer',
        onDelete: 'CASCADE'
      });
  
      // Relación muchos a muchos entre Cart y Product a través de Cart_Product
      Cart.belongsToMany(models.Product, {
        through: models.Cart_Product,
        foreignKey: 'ID_Cart',
        onDelete: 'CASCADE'
      });
  
      // Relación uno a uno con Invoice
      Cart.hasOne(models.Invoice, {
        foreignKey: 'ID_Cart',
        onDelete: 'CASCADE'
      });
    };
  
    return Cart;
  };
  