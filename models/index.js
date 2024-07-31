const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importer les modèles

db.Admin = require('.//admin.model')(sequelize , Sequelize);
db.Fournisseur = require('./fournisseur.model')(sequelize , Sequelize)
db.Commande = require('./commande.model')(sequelize, Sequelize);
db.Produit = require('./produit.model')(sequelize , Sequelize);
db.Vente = require('./vente.model')(sequelize , Sequelize);
db.Stock = require('./stoks.model')(sequelize , Sequelize);
// Définir les relations

db.Admin.hasMany(db.Fournisseur, { as: 'fournisseurs' });
db.Admin.hasMany(db.Produit, { as: 'produits' });
db.Admin.hasMany(db.Vente, { as: 'ventes' });
db.Admin.hasMany(db.Commande, { as: 'commandes' });
db.Admin.hasMany(db.Stock, {as:'stocks'})
db.Produit.hasMany(db.Commande , {as : 'commandes'})
db.Produit.hasMany(db.Vente, {as : 'vente'})
db.Produit.hasMany(db.Stock  , {as: 'stocks'})
db.Commande.belongsTo(db.Admin, { as: 'admin', foreignKey: 'AdminId' });
db.Vente.belongsTo(db.Admin, { as: 'admin', foreignKey: 'AdminId' });

db.Commande.belongsTo(db.Fournisseur, { as: 'fournisseurs', foreignKey: 'FournisseurId' });
db.Commande.belongsTo(db.Produit , {as : 'produits' , foreignKey:'ProduitId'} );
db.Fournisseur.hasMany(db.Commande, { as: 'commandes' });


module.exports = db ;