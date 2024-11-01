module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      ID_Product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      drink_description: DataTypes.TEXT,
      drink_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Presentation: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      Stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Barcode: {
        type: DataTypes.STRING,
        unique: true
      },
      Maturity: DataTypes.DATE,
      highlighted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      offer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      Image: {
        type: DataTypes.STRING,
        defaultValue: '../images/products/default.jpg'
      }
    }, {
        tableName: 'product',
        timestamps: false
    });


  
    Product.associate = (models) => {
      // Relación muchos a muchos entre Product y Cart a través de Cart_Product
      Product.belongsToMany(models.Cart, {
        through: models.Cart_Product,
        foreignKey: 'ID_Product',
        onDelete: 'CASCADE'
      });
    };
  
    return Product;
  };
  