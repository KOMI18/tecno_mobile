module.exports = (sequelize , DataTypes) => {
    const Fournisseur = sequelize.define('Fournisseur' , {
        nom:{
            type:DataTypes.STRING,
            allowNull : false
        },
        telephone:{
            type:DataTypes.STRING,
            allowNull:false
        }
    }
        
    );
    return Fournisseur
}