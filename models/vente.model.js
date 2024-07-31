const { DataTypes } = require("sequelize");

module.exports = (sequelize , DataTypes) => {
    const Vente = sequelize.define('Vente' , {
        qte:{
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
        date_pay_reste:{
            type:DataTypes.DATE,
            allowNull:true
        },
        client:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })
    return Vente
}