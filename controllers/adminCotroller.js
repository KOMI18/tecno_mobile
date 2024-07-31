const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET; // Remplacez par une valeur plus sécurisée

exports.registerAdmin = async (req, res) => {
  try {
    const { nom, email , username,  password , passwordrepeat } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedRepeat  =await bcrypt.hash(passwordrepeat , 10)
    const admin = await db.Admin.create({ nom,email,username, password: hashedPassword  , passwordrepeat: hashedRepeat});

    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'administrateur' , error });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await db.Admin.findOne({ where: {email} });

    if (!admin) {
      return res.status(400).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }

    const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({token :token , id:admin.id  , nom:admin.nom});
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'authentification' });
  }
};

exports.authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Accès refusé' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalide' });
  }
};
exports.getAdminData = async (req, res) => {
    try {
      const adminData = await db.Admin.findOne({
        where: { id: req.params.id },
        include: [
          { model: db.Commande, as: 'commandes' },
          { model: db.Fournisseur, as: 'fournisseurs' },
          { model: db.Vente , as: 'ventes'},
          { model: db.Stock  , as : 'stocks'},
          { model: db.Produit , as: 'produits'}
        ]
      });
      res.json(adminData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données de l\'administrateur :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données de l\'administrateur' });
    }
  };
  
