const db = require('../models');
exports.createUniqueCommande = async (req , res) => {
      try{
        const data = req.body ;
        const createCommandes = await db.sequelize.transaction(async (t) => {
          const create = [];
          const newData = await db.Commande.create(data , {transaction: t});
          create.push(newData);
          //verifier si le produit existe dans stock
          const stockItem = await db.Stock.findOne({
            where: { ProduitId: data.ProduitId },
            transaction: t
          });
          // si le produit existe deja dans stock on update la quantite et le prix
          if(stockItem){
            stockItem.qte += parseInt(data.qte);
            stockItem.prix+=parseInt(data.montant);
            await stockItem.save({ transaction: t });
            //si le produit n'existe pas on le cree
          }else{
            await db.Stock.create({
              qte: parseInt(data.qte),
              prix: parseInt(data.montant), // Ajoutez les autres champs nécessaires ici
              ProduitId: data.ProduitId,
              AdminId: data.AdminId
            }, { transaction: t });
          }
        return create;

        });
          res.status(201).json({message:'commande enregistrer' , data:createCommandes})
      }catch(error){
          res.status(500).json({error:"Une erreur est survenu", error})
      }
}
exports.cloturerCommande = async (req, res) => {
  try {
    const cloturerCommande = await db.sequelize.transaction(async (t) => {
      const commande = await db.Commande.findByPk(req.params.id, { transaction: t });
        function formatDate(date){
          const year = date.getFullYear();
          const month = String(date.getMonth()+1).padStart(2,'0')
          const day = String(date.getDate()).padStart(2,'0')
          const hours = String(date.getHours()).padStart(2,'0')
          const minutes = String(date.getMinutes()).padStart(2,'0')
          const secondes = String(date.getSeconds()).padStart(2,'0')

          return `${year}-${month}-${day} ${hours}:${minutes}:${secondes}`;

        }
      if (!commande) {
        throw new Error('Commande non trouvée');
      }
      const now = new Date();
      const dateFormate = formatDate(now)
      commande.avance += parseInt(commande.reste);
      commande.reste = 0;
      commande.date_reglement_reste = dateFormate;
      

      await commande.save({ transaction: t });

      return commande;
    });

    res.status(200).json({ data: cloturerCommande, message: 'Commande clôturée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la clôture de la commande :', error);
    res.status(500).json({ error: error.message, errorMessage: 'Une erreur est survenue lors de la clôture' });
  }
};

exports.createCommandes = async (req, res) => {
    try {
      const commandes = req.body; 
      if (!Array.isArray(commandes)) {
        return res.status(400).json({ error: 'La requête doit être un tableau d\'objets' });
      }
  
      const createdCommandes = await db.sequelize.transaction(async (t) => {
        const created = [];
  
        for (const commande of commandes) {
          const createdCommande = await db.Commande.create(commande, { transaction: t });
          created.push(createdCommande);
  
          // Vérifiez si le produit existe dans le stock
          const stockItem = await db.Stock.findOne({
            where: { ProduitId: commande.ProduitId },
            transaction: t
          });
  
          if (stockItem) {
            // Si le produit existe, mettez à jour la quantité
           
            stockItem.qte += parseInt(commande.qte);
            stockItem.prix+=parseInt(commande.montant);
            await stockItem.save({ transaction: t });
          } else {
            // Si le produit n'existe pas, créez une nouvelle entrée dans le stock
           

            await db.Stock.create({
              qte: parseInt(commande.qte),
              prix: parseInt(commande.montant), // Ajoutez les autres champs nécessaires ici
              ProduitId: commande.ProduitId
            }, { transaction: t });
          }
        }
  
        return created;
      });
  
      res.status(200).json({data:createdCommandes , message:"Commande enregistrer"});
    } catch (error) {
      console.error('Erreur lors de la création des commandes :', error);
      res.status(500).json({ error: 'Erreur lors de la création des commandes' });
    }
  };

exports.getcommandes = async (req, res) => {
  const commande = await db.Commande.findAll({
    include:[
        {model:db.Admin, as:'admin'},
        {model:db.Fournisseur , as : 'fournisseurs'}
    ]
  });
  res.json(commande);
};

exports.getcommande = async (req, res) => {
  const commande = await db.Commande.findByPk(req.params.id, {
    include: [
        { model: db.Admin, as: 'admin' },
        {model : db.Fournisseur , as : 'fournisseurs'}
    ],
  });
  res.json(commande);
};

exports.updatecommande = async (req, res) => {
  await db.Commande.update(req.body, {
    where: { id: req.params.id },
  });
  const commande = await db.Commande.findByPk(req.params.id);
  res.json(commande);
};

exports.deletecommande = async (req, res) => {
  await db.Commande.destroy({
    where: { id: req.params.id },
  });
  res.sendStatus(204);
};
exports.getCommandeData = async (req, res) => {
  try {
    const cmdData = await db.Commande.findOne({
      where: { id: req.params.id },
      include: [
      
        { model: db.Fournisseur, as: 'fournisseurs' },

        { model: db.Produit , as: 'produits'}
      ]
    });
    res.json(cmdData);
  } catch (error) {
    console.error('Erreur lors de la récupération des données de la commande :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des données de la commande' });
  }
};