const db = require('../models');
exports.createUniqueVente = async (req , res) => {
  try{
    const data = req.body ;
    const createCommandes = await db.sequelize.transaction(async (t) => {
      const create = [];
      const newData = await db.Vente.create(data , {transaction: t});
      create.push(newData);
      //verifier si le produit existe dans stock
      const stockItem = await db.Stock.findOne({
        where: { ProduitId: data.ProduitId },
        transaction: t
      });
      // si le produit existe deja dans stock on update la quantite et le prix
      if (stockItem) {
        if (stockItem.qte < parseInt(data.qte)) {
            throw new Error(`Stock insuffisant pour le produit ID: ${data.ProduitId}`);
        }

        stockItem.qte -= parseInt(data.qte);
        stockItem.prix -= parseInt(data.montant);
        await stockItem.save({ transaction: t });
    } else {
        return res.status(400).json({ error: `Produit ID: ${data.ProduitId} n'existe pas dans le stock` });
    }
    return create;

    });
      res.status(201).json({message:'vente enregistrer' , data:createCommandes})
  }catch(error){
      res.status(500).json({error:"Une erreur est survenu", error})
  }
}
exports.createVente = async (req, res) => {
    try {
        const ventes = req.body; // Assurez-vous que le corps de la requête est un tableau d'objets
        if (!Array.isArray(ventes)) {
            return res.status(400).json({ error: 'La requête doit être un tableau d\'objets' });
        }

        const createdVentes = await db.sequelize.transaction(async (t) => {
            const created = [];

            for (const vente of ventes) {
                const createdVente = await db.Vente.create(vente, { transaction: t });
                created.push(createdVente);

                const stockItem = await db.Stock.findOne({
                    where: { ProduitId: vente.ProduitId },
                    transaction: t
                });

                if (stockItem) {
                    if (stockItem.qte < parseInt(vente.qte)) {
                        throw new Error(`Stock insuffisant pour le produit ID: ${vente.ProduitId}`);
                    }

                    stockItem.qte -= parseInt(vente.qte);
                    stockItem.prix -= parseInt(vente.montant);
                    await stockItem.save({ transaction: t });
                } else {
                    return res.status(400).json({ error: `Produit ID: ${vente.ProduitId} n'existe pas dans le stock` });
                }
            }

            return created;
        });

        res.status(200).json(createdVentes);
    } catch (error) {
        console.error('Erreur lors de la création des ventes :', error);
        res.status(500).json({ error: 'Erreur lors de la création des ventes' });
    }
};


exports.getVentes = async (req, res) => {
  const vente = await db.Vente.findAll({
    include:[
        {model:db.Admin, as:'admin'},
      
    ]
  });
  res.json(vente);
};

exports.getvente = async (req, res) => {
  const vente = await db.Vente.findByPk(req.params.id, {
    include: [
        { model: db.Admin, as: 'admin' },
       
    ],
  });
  res.json(vente);
};

exports.updateVente = async (req, res) => {
  await db.Vente.update(req.body, {
    where: { id: req.params.id },
  });
  const vente = await db.Vente.findByPk(req.params.id);
  res.json(vente);
};

exports.deleteVente = async (req, res) => {
  await db.Vente.destroy({
    where: { id: req.params.id },
  });
  res.sendStatus(204);
};
exports.cloturerVente = async (req, res) => {
  try {
    const cloturerVente = await db.sequelize.transaction(async (t) => {
      const vente = await db.Vente.findByPk(req.params.id, { transaction: t });
      function formatDate(date){
        const year = date.getFullYear();
        const month = String(date.getMonth()+1).padStart(2,'0')
        const day = String(date.getDate()).padStart(2,'0')
        const hours = String(date.getHours()).padStart(2,'0')
        const minutes = String(date.getMinutes()).padStart(2,'0')
        const secondes = String(date.getSeconds()).padStart(2,'0')

        return `${year}-${month}-${day} ${hours}:${minutes}:${secondes}`;

      }
      if (!vente) {
        throw new Error('Commande non trouvée');
      }
      const now = new Date();
      const dateFormate = formatDate(now)
      vente.avance += parseInt(vente.reste);
      vente.reste = 0;
      vente.date_pay_reste = dateFormate ;

      await vente.save({ transaction: t });

      return vente;
    });

    res.status(200).json({ data: cloturerVente, message: 'vente clôturée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la clôture de la commande :', error);
    res.status(500).json({ error: error.message, errorMessage: 'Une erreur est survenue lors de la clôture' });
  }
};
