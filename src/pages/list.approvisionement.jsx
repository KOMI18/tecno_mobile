import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import moment from 'moment'
import { useEffect , useState } from "react";
import axios from "axios";
import CryptoJS from 'crypto-js'
import { Modal, Button } from 'react-bootstrap';
import React from 'react'
import { notification } from "antd";
import Loader from "../components/Loader";
import { SidebarProvider } from "../components/SideBarContext";
const ListApprovisionement = () => {
    const [adminData , setAdminData] = useState([]);
    const [searchTerm  , setSearchTerm] = useState('')
    const [produit , setProduit] = useState([]);
    const [fournisseur , setFournisseur] = useState([])
    const [showform , setShowForm]  = useState(false)
    const [Loading , setLoading] = useState(false)
    const [dataUpdate , setUpdate] = useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [idTomodify , setIdToModify] = useState('')
    const KEY = '@18515'

    const ecryptId = localStorage.getItem('id')
    const id =  CryptoJS.AES.decrypt(ecryptId, KEY).toString(CryptoJS.enc.Utf8);

    
    useEffect(() =>{
        const fetchCommande = async () =>{
        try{
            const response = await axios.get(`http://172.20.10.6:3001/admin/data/${id}`)
            setAdminData(response.data);
       
            setFournisseur(response.data.fournisseurs)
            setProduit(response.data.produits)
        }catch(error){
            console.log('une erreur est survenue' , error);
        }
            
        }
        fetchCommande();
    }, [adminData]);
    
    const handleSearch = (term) => {
        setSearchTerm(term)
    }
    const handleCloturer = async (id)  => {
        console.log('idantifiant' , id);
        try{
            const clotureAchat = await axios.put(`http://172.20.10.6:3001/commande/cloturer/${id}` )
            notification.success({message:clotureAchat.data.message})
            
        }catch(error){
            console.log(error);
             notification.error({message:'une erreur est survenue'})
        }
    }
    const handleShowForm  = async (idCommandeToModify) => {
            setShowForm(true)
            setIdToModify(idCommandeToModify)
            try{
                const response = await axios.get(`http://172.20.10.6:3001/commande/getcommande/${idCommandeToModify}`)
                setUpdate(response.data)
            }catch(error){
                console.log('une erreur est survenue' , error);
            }
    }
    const handeleDelete = async (idCommandeDelete) => {
          try{
              const response = await axios.delete(`http://172.20.10.6:3001/commande/delete/${idCommandeDelete}`)
              setShow(false)
            
              notification.success({message:`Commande ${idCommandeDelete} supprimer`})
          }catch(error){
            setShow(false)
            
            notification.error({message:'une erreur est survenue'})

          }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdate({
          ...dataUpdate,
          [name]: value
        });
      };
      const handleSubmit = async (event) => {
        event.preventDefault()

        setLoading(true)
              try{
                 const insertData = await axios.put(`http://172.20.10.6:3001/commande/update/${idTomodify}` , dataUpdate )
                notification.success({message:"Commande Modifier"})
                setShowForm(false)
                setLoading(false)
              }catch(error){
                  console.log('une erreur est survennnue' , error);
                 setLoading(false)
                  notification.error({message: "une erreur est survenu lors de la modification de la commande"})
              }
      }
      const handleSetShowForm = () => {
        setShowForm(false)
      }
     
    return(
      <SidebarProvider>

        <div>
        <Header onSearch={handleSearch} />
        <Sidebar />
        <div className="container" style={{marginTop:'100px'}}>
            <div className="row justify-content-center">
          
                <div className="col-lg-8"> {/* Utilisation de col-lg-8 pour une largeur plus grande sur les écrans larges */}
                  { showform ? (
                         <section className="card" >
        
                   
                 
                         <div class="card-body">
                           <h5 class="card-title">Modifier la commande</h5>
             
                         
                           <form onSubmit={handleSubmit} class="row g-3" method="post">
                           <div class="col-md-6">
                               <label for="inputState" class="form-label">Produit</label>
                               <select id="ProduitId" class="form-select" name="ProduitId" onChange={handleChange} value={dataUpdate.ProduitId}>
                                 <option >Chosir...</option>
                                 {produit.map(prod =>(
                                    <option value={prod.id}>{prod.libelle}</option>
             
                                 ))}
                               </select>
                             </div>
                             <div class="col-md-6">
                               <label for="inputEmail5" class="form-label">Quantite</label>
                               <input type="number" class="form-control" id="qte" name="qte"  onChange={handleChange} value={dataUpdate.qte}/>
                             </div>
                             <div class="col-md-6">
                               <label for="inputPassword5" class="form-label">Montant</label>
                               <input type="number" class="form-control" id="montant" name="montant"  onChange={handleChange} value={dataUpdate.montant}/>
                             </div>
                             <div class="col-6">
                               <label for="inputAddress5" class="form-label">Avance</label>
                               <input type="number" class="form-control" id="avance" name="avance" placeholder=" Ex: 10000"  onChange={handleChange} value={dataUpdate.avance}/>
                             </div>
                             <div class="col-6">
                               <label for="inputAddress2" class="form-label">Reste</label>
                               <input type="number" class="form-control" id="reste" name="reste" placeholder="Ex: 5000"  onChange={handleChange} value={dataUpdate.reste}/>
                             </div>
                             
                             <div class="col-md-6">
                               <label for="inputState" class="form-label">Fournisseur</label>
                               <select id="FournisseurId" class="form-select" name="FournisseurId" value={dataUpdate.FournisseurId} onChange={handleChange} >
                                 <option>Chosir...</option>
                                 {fournisseur.map(fourn =>(
                                    <option value={fourn.id}>{fourn.nom}</option>
             
                                 ))}
                               </select>
                             </div>
                             <div class="col-12">
                               <label for="inputAddress2" class="form-label">Date</label>
                               <input type="date" class="form-control" id="date_reglement_reste" name="date_reglement_reste" placeholder="Ex: 5000" value={dataUpdate.date_reglement_reste} onChange={handleChange}/>
                             </div>
                               <button class="btn btn-primary" onClick={handleSubmit} type="submit">{ Loading ? <Loader/> :'Modifier'}</button>
                               <button class="btn btn-danger" onClick={handleSetShowForm} type="submit">Anuuler la modification</button>
                                 
                           </form>
             
                         </div>
                   
                             
                         </section>
                  ) : (

                    <div className="card">
                      
                    <div className="card-body">
                        <h5 className="card-title"> Historique des Approvisionnements</h5>
                        <div className="table-responsive"> {/* Utilisation de table-responsive pour les tables qui dépassent de la largeur */}
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                         <th scope="col">Ref#</th>
                                       
                                        <th scope="col">Qte</th>
                                        <th scope="col">Produit</th>

                                        <th scope="col">Montant</th>
                                        <th scope="col">Avance</th>
                                        <th scope="col">Reste</th>
                                        <th scope="col">Fournisseur</th>
                                        <th scope="col">Date</th>

                                        <th scope="col">Date regelement reste</th>

                                    </tr>
                                </thead>
                                <tbody>
                                      {adminData.commandes && adminData.produits ? (
                                            adminData.commandes.map((commande,index) => {
                                            const produit = adminData.produits.find(p => p.id === commande.ProduitId);
                                            const fournisseur = adminData.fournisseurs.find(f => f.id === commande.FournisseurId);

                                            return (
                                                <tr key={index+1}>
                                                <td>{produit.id}</td>

                                                <td>{commande.qte}</td>
                                                <td>{produit ? produit.libelle : 'Produit inconnu'}</td>
                                                <td>{commande.montant.toLocaleString()}</td>
                                                <td>{commande.avance.toLocaleString()}</td>
                                                <td>{commande.reste.toLocaleString()}</td>
                                                <td>{fournisseur.nom}</td>
                                                <td>{moment(commande.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                                                <td>{moment(commande.date_reglement_reste).format('DD/MM/YYYY HH:mm')}</td>
                                                <td> <div className="filter">
                                                    <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                        <li className="dropdown-header text-start">
                                                        <h6>Actions</h6>
                                                        </li>
                                                        <li><a className="dropdown-item" href="#" onClick={() => handleShowForm(commande.id)}>Modifier</a></li>
                                                        {commande.reste> 0? <li><a className="dropdown-item" href="#" onClick={() => handleCloturer(commande.id)}>Cloturer </a></li>:''}
                                                        <li><a className="dropdown-item" href="#" onClick={handleShow}>Supprimer</a></li>
                                                    </ul>
                                                    <Modal show={show} onHide={handleClose}>
                                                        <Modal.Header >
                                                          <Modal.Title>Modal heading</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>Voulez vous vraiment supprimer cette commande ?</Modal.Body>
                                                        <Modal.Footer>
                                                          <Button variant="secondary" onClick={handleClose}>
                                                            Close
                                                          </Button>
                                                          <Button variant="danger" onClick={() => handeleDelete(commande.id)}>
                                                            Supprimer
                                                          </Button>
                                                        </Modal.Footer>
                                                      </Modal>
                                                    </div>
                                                </td>
                                                </tr>
                                                
                                            );
                                            })
                                        ) : (
                                            <tr>
                                            <td colSpan="7">Aucune donnée disponible</td>
                                            </tr>
                                        )}
                                                                    
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                  )}
                    
                                                     
                </div>
            </div>
        </div>
       
    </div>
    
    
    </SidebarProvider>
    
 
    )
}
export default ListApprovisionement ;