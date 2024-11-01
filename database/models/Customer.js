module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    ID_Customer: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    image: DataTypes.STRING,
    phone: DataTypes.STRING,
    adress: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    Date_Record: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    HashPassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },{
    tableName: 'customer',
    timestamps: false
  });

  Customer.associate = (models) => {
    // Relación uno a muchos con Cart
    Customer.hasMany(models.Cart, {
      foreignKey: 'ID_Customer',
      onDelete: 'CASCADE'
    });
    
    // Relación uno a muchos con Invoice
    Customer.hasMany(models.Invoice, {
      foreignKey: 'ID_Customer',
      onDelete: 'CASCADE'
    });
  };

  return Customer;
};
