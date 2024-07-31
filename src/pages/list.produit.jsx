import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import moment from 'moment'
import { Modal, Button } from 'react-bootstrap';
import { SidebarProvider } from "../components/SideBarContext";
import {notification} from 'antd'
import { useEffect , useState } from "react";
import axios from "axios";
import CryptoJS from 'crypto-js'
const ListProduit = () => {
    const [adminData , setAdminData] = useState([]);
    const [searchTerm  , setSearchTerm] = useState('')
    const [showForm , setShowForm] = useState(false)
    const [dataFormModify , setDataFormModify] = useState([])
    const [produitId , setProduitId] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataFormModify({
          ...dataFormModify,
          [name]: value
        });
      }
    const KEY = '@18515'
    const ecryptId = localStorage.getItem('id')

    const id =  CryptoJS.AES.decrypt(ecryptId, KEY).toString(CryptoJS.enc.Utf8);
    useEffect(() =>{
        const fetchCommande = async () =>{
        try{
            const response = await axios.get(`http://172.20.10.6:3001/admin/data/${id}`)
            setAdminData(response.data);
        }catch(error){
            console.log('une erreur est survenue' , error);
        }
            
        }
        fetchCommande();
    }, [adminData]);
    const handleSearch = (term) => {
        setSearchTerm(term)
    }
    const handleShowModifyForm = async (idProduit) => {
        setShowForm(true)


        try{
            const find =  await axios.get(`http://172.20.10.6:3001/produit/findOne/${idProduit}`)
                setDataFormModify(find.data)
        }catch(error){

        }
    }
    const  hideForm = () =>{
        setShowForm(false);
    }
    const handleModify = async (idProduit , e) => {
        e.preventDefault()
        try{
                const modif = await axios.put(`http://172.20.10.6:3001/produit/update/${idProduit}` , dataFormModify)
                notification.success({message:modif.data.message});
                setShowForm(false)
        }catch(error){
            notification.error({message: 'une erreur est survenue'})
            console.log(error);
        }
    }
    const handeleDelete = async (idproduit) => {
        
            try{
                    const deleteProdduit = await axios.delete(`http://172.20.10.6:3001/produit/delete/${idproduit}`)
                    notification.success({message:deleteProdduit.data })
                   setShow(false);
                    
            }catch(err){
                notification.error({message:'une erreur est survenue'})
                setShow(false);
            }
    }
    return(
      <SidebarProvider>

     
        <div>
        <Header onSearch={handleSearch} />
        <Sidebar/>
        <div className="container" style={{marginTop:'100px'}}>
            <div className="row justify-content-center">
                <div className="col-lg-8"> {/* Utilisation de col-lg-8 pour une largeur plus grande sur les écrans larges */}
                  {showForm ? (
                          <main id="main" class="main">

                          <div class="pagetitle">
                           <h1>Ajouter un produit</h1>
                         
                          </div>
                          <section className="card" >
                      
                                 
                               
                      
                          <div class="card-body">
                            <h5 class="card-title">Produit</h5>
              
                        
                            <form class="row g-3">
                              <div class="col-12">
                                <label for="inputNanme4" class="form-label">Libellé</label>
                                <input type="text" class="form-control" name="libelle" onChange={handleChange} value={dataFormModify.libelle}id="inputNanme4"/>
                              </div>
                              <div class="col-12">
                                <label for="inputEmail4" class="form-label">Prix</label>
                                <input type="number" class="form-control" name="prix" onChange={handleChange} value={dataFormModify.prix} id="inputEmail4"/>
                              </div>
                              <button class="btn btn-primary" onClick={(e) => handleModify(dataFormModify.id , e)} type="submit">Modifier</button>
                              <button class="btn btn-danger" onClick={hideForm} type="submit">Anuller </button>

                            </form>
              
                          </div>
                      
                    
                              
                          </section>
                          </main>
                  ): (
                    <div className="card">
                    <div className="card-body">
                        <h5 className="card-title"> Listes des Produits</h5>
                        <div className="table-responsive"> {/* Utilisation de table-responsive pour les tables qui dépassent de la largeur */}
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                         <th scope="col">Ref#</th>
                                        <th scope="col">Libelle</th>
                                        <th scope="col">Prix</th>
                                        <th scope="col">Date Ajout</th>

                                    </tr>
                                </thead>
                                <tbody>
                                      {adminData.produits  ? (
                                            adminData.produits.map((produit , index) => {
                                           
                                            return (
                                                <tr key={index+1}>
                                                <td>{produit.id}</td>

                                                <td>{produit.libelle}</td>
                                                <td>{(produit.prix.toLocaleString())}</td>
                                                <td>{moment(produit.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                                                <td> <div className="filter">
                                                    <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                        <li className="dropdown-header text-start">
                                                        <h6>Actions</h6>
                                                        </li>
                                                        <li><a className="dropdown-item" onClick={() => handleShowModifyForm(produit.id)} href="#">Modifier</a></li>
                                                       
                                                        <li><a className="dropdown-item" onClick={handleShow} href="#">Supprimer</a></li>
                                                    </ul>
                                                    <Modal show={show} onHide={handleClose}>
                                                        <Modal.Header >
                                                          <Modal.Title>Modal heading</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>Voulez vous vraiment supprimer ce produit #ref  {produit.id} ?</Modal.Body>
                                                        <Modal.Footer>
                                                          <Button variant="secondary" onClick={handleClose}>
                                                            Close
                                                          </Button>
                                                          <Button variant="danger" onClick={() => handeleDelete(produit.id)}>
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
                                            <td colSpan="6">Aucune donnée disponible</td>
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
export default ListProduit ;