const { where } = require('sequelize');
const db = require('../models')
exports.createProduit = async (req ,res) => {
    try{
      const produit = await db.Produit.create(req.body); 
      res.status(200).json({produit : produit , message : 'Produit inserer'})
    }catch(error){
        res.status(500).json('Une erreur est survenue' ,  error);

    }
}
exports.updateProduit = async (req , res) => {
    try{
       
        await db.Produit.update(req.body , {
            where:{id:req.params.id},
        });
        const updateProduit = db.Produit.findByPk(req.params.id);
        res.status(200).json({produitMOdifier: updateProduit , message:'Le produit a ete modifier'})
    }catch(error){
        res.status(500).json('une erreur est survenue lors de la modification');
    }
}

exports.deleteProduit = async (req , res) =>{
    try{
       await db.Produit.destroy(({
        where: {id: req.params.id}
       }))
       res.sendStatus(204).json(`Produit ${req.params.id} supprimer`);

    }catch(err){
        console.log('une erreur est survenue' , err);
    }
}
exports.getProduit = async (req,res) => {
    try{
        const produit = await db.Produit.findByPk(req.params.id)
        res.status(200).json(produit)
    }catch(err){
        res.status(500).json('Une erreur est survenue' , err)
    }
}