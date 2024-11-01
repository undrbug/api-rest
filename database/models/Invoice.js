module.exports = (sequelize, DataTypes) => {
	const Invoice = sequelize.define('Invoice', {
	  ID_invoice: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	  },
	  Numero_invoice: {
		type: DataTypes.STRING,
		unique: true
	  },
	  ID_Customer: {
		type: DataTypes.INTEGER,
		allowNull: false
	  },
	  ID_Cart: {
		type: DataTypes.INTEGER,
		allowNull: false
	  },
	  issue_date: {
		type: DataTypes.DATE,
		defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
	  },
	  total_amount: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false
	  },
	  payment_status: {
		type: DataTypes.ENUM('pagado', 'pendiente', 'cancelado'),
		allowNull: false
	  },
	  shipping_address: DataTypes.STRING
	},{
		tableName: 'invoice',
		timestamps: false
	});
  
	Invoice.associate = (models) => {
	  // Relación uno a uno entre Invoice y Cart
	  Invoice.belongsTo(models.Cart, {
		foreignKey: 'ID_Cart',
		onDelete: 'CASCADE'
	  });
  
	  // Relación muchos a uno entre Invoice y Customer
	  Invoice.belongsTo(models.Customer, {
		foreignKey: 'ID_Customer',
		onDelete: 'CASCADE'
	  });
	};
  
	return Invoice;
  };
  