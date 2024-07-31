const db = require('../models');

exports.createfournisseur = async (req, res) => {
  const fournisseur = await db.Fournisseur.create(req.body);
  res.status(200).json(fournisseur);
};

exports.getfournisseurs = async (req, res) => {
  const fournisseur = await db.Fournisseur.findAll({
    include:[{model:db.Commande, as:'commande'}]
  });
  res.json(fournisseur);
};

exports.getfournisseur = async (req, res) => {
  const fournisseur = await db.Fournisseur.findByPk(req.params.id, {
    include: [{ model: db.Commande, as: 'commande' }],
  });
  res.json(fournisseur);
};

exports.updatefournisseur = async (req, res) => {
  await db.Fournisseur.update(req.body, {
    where: { id: req.params.id },
  });
  const fournisseur = await db.Fournisseur.findByPk(req.params.id);
  res.json(fournisseur);
};

exports.deletefournisseur = async (req, res) => {
  await db.Fournisseur.destroy({
    where: { id: req.params.id },
  });
  res.sendStatus(204);
};
