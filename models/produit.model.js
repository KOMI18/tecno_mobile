module.exports = (sequelize , DataTypes) => {
    const Produit = sequelize.define('Produit' , {
        libelle:{
            type:DataTypes.STRING,
            allowNull:false
        },
        prix:{
            type:DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Produit
}