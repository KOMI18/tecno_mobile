module.exports = (sequelize , DataTypes) => {
    const Commande = sequelize.define('Commande' , {
        qte :{
                type:DataTypes.INTEGER,
                allowNull:false
        },
        montant:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        avance:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        reste:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        date_reglement_reste:{
            type:DataTypes.DATE,
            allowNull:false
        },
    
    })
    return Commande ;
}