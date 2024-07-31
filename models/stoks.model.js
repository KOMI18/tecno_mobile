

module.exports = (sequelize , DataTypes) => {
    const Stock = sequelize.define('Stock' , {
        qte:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        prix:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    })
    return Stock;
}