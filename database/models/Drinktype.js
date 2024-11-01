module.exports = (sequelize, DataTypes) => {
    const Drinktype = sequelize.define('Drinktype', {
    ID_Drinktype: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    Name: {
        type: DataTypes.STRING(30),
        allowNull: false
      }
    },{
        tableName: 'drinktype',
        timestamps: false
    });
    return Drinktype;
  };
  