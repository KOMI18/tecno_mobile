require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

const adminRoute = require('./routes/adminRoute')
const fournisseurRoute = require('./routes/fournisseirRoute')
const commandeRoute = require('./routes/commandeRoute')
const venteRoute = require('./routes/venteRoute')
const produitRouter  = require('./routes/produitRoute')
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());  
app.use(bodyParser.json());

// Routes
 
app.use('/admin' , adminRoute)
app.use('/fournisseur' , fournisseurRoute)
app.use('/commande' , commandeRoute)
app.use('/getVente' , venteRoute)
app.use('/produit' , produitRouter);

// Synchroniser les modèles avec la base de données
db.sequelize.sync().then(() => {
  console.log('Database synced');
});

// Démarrer le serveur
app.listen(port, '0.0.0.0',() => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});
