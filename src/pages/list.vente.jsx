import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import moment from 'moment'
import { useEffect , useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import CryptoJS from 'crypto-js'
import { notification } from "antd";
import { SidebarProvider } from "../components/SideBarContext";
const ListVente = () => {
    const [adminData , setAdminData] = useState([]);
    const [searchTerm  , setSearchTerm] = useState('')
    const [showform , setShowForm] = useState(false)
    const [Loading , setLoading] = useState(false)
    const [data , setData] = useState([]);
    const [produit , setProduit] = useState([])
    const [idTomodify , setIdToNodify] = useState('')
    const KEY = '@18515'
    const ecryptId = localStorage.getItem('id')

    const id =  CryptoJS.AES.decrypt(ecryptId, KEY).toString(CryptoJS.enc.Utf8);
    useEffect(() =>{
        const fetchCommande = async () =>{
        try{
            const response = await axios.get(`http://172.20.10.6:3001/admin/data/${id}`)
            setAdminData(response.data);
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
    // const filteredItems = adminData.produits && adminData.produits.filter(item =>
    //     item.id.parseInt().includes(searchTerm.toLowerCase())
    // );
    const handleCloturer = async (id)  => {
        console.log('idantifient' , id);
        try{
            const clotureAchat = await axios.put(`http://172.20.10.6:3001/getVente/cloturer/${id}` )
            notification.success({message:clotureAchat.data.message})
            
        }catch(error){
            console.log(error);
             notification.error({message:'une erreur est survenue'})
        }
    }
    const handleSetShowForm = async (idVenteDelete) => {
        setShowForm(true)
        console.log('idvente' , idVenteDelete);
        setIdToNodify(idVenteDelete)
        try{
                const response = await axios.get(`http://172.20.10.6:3001/fournisseur/getvente/${idVenteDelete}`)
                setData(response.data)
                
        }catch(err){
            console.log(err);
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault()

        setLoading(true)
              try{
                 const modifyData = await axios.put(`http://172.20.10.6:3001/getVente/update/${idTomodify}` , data )
                notification.success({message:"vente Modifier"})
                setShowForm(false)
                setLoading(false)
              }catch(error){
                  console.log('une erreur est survennnue' , error);
                 setLoading(false)
                  notification.error({message: "une erreur est survenu lors de la modification de la vente"})
              }
      }
      const handleCloseForm = () => {
        setShowForm(false)
      }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
          ...data,
          [name]: value
        });
      };
    
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
                      <h5 class="card-title">Modifier la vente</h5>
        
                    
                      <form onSubmit={handleSubmit} class="row g-3">
                      <div class="col-md-6">
                          <label for="inputState" class="form-label">Produit</label>
                          <select id="ProduitId" class="form-select" name="ProduitId" onChange={handleChange} value={data.ProduitId}>
                            <option >Chosir...</option>
                            {produit.map(prod =>(
                               <option value={prod.id}>{prod.libelle}</option>
        
                            ))}
                          </select>
                        </div>
                        <div class="col-md-6">
                          <label for="inputEmail5" class="form-label">Quantite</label>
                          <input type="number" class="form-control" id="qte" name="qte"  onChange={handleChange} value={data.qte}/>
                        </div>
                        <div class="col-md-6">
                          <label for="inputPassword5" class="form-label">Montant</label>
                          <input type="number" class="form-control" id="montant" name="montant"  onChange={handleChange} value={data.montant}/>
                        </div>
                        <div class="col-6">
                          <label for="inputAddress5" class="form-label">Avance</label>
                          <input type="number" class="form-control" id="avance" name="avance" placeholder=" Ex: 10000"  onChange={handleChange} value={data.avance}/>
                        </div>
                        <div class="col-6">
                          <label for="inputAddress2" class="form-label">Reste</label>
                          <input type="number" class="form-control" id="reste" name="reste" placeholder="Ex: 5000"  onChange={handleChange} value={data.reste}/>
                        </div>
                        
                        <div class="col-6">
                          <label for="inputAddress2" class="form-label">Nom client</label>
                          <input type="text" class="form-control" id="client" name="client" placeholder=""  onChange={handleChange} value={data.client}/>
                        </div>
                        
                        <div class="col-12">
                          <label for="inputAddress2" class="form-label">Date</label>
                          <input type="date" class="form-control" id="date_pay_reste" name="date_pay_reste" placeholder="Ex: 5000" value={data.date_pay_reste} onChange={handleChange}/>
                        </div>
                          <button class="btn btn-primary" onClick={handleSubmit} type="submit">{ Loading ? <Loader/> :'Modifier'}</button>
                          <button class="btn btn-danger" onClick={handleCloseForm} type="submit">Anuuler la modification</button>
                       
                      </form>
        
                    </div>
              
                        
                    </section>
                ): (
                    <div className="card">
                    <div className="card-body">
                        <h5 className="card-title"> Listes des ventes</h5>
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
                                        <th scope="col">Client</th>

                                        <th scope="col">Date</th>
                                        <th scope="col">Date regelement reste</th>

                                    </tr>
                                </thead>
                                <tbody>
                                      {adminData.ventes && adminData.produits ? (
                                            adminData.ventes.map(vente => {
                                            const produit = adminData.produits.find(p => p.id === vente.ProduitId);
                                            return (
                                                <tr key={vente.id}>
                                                <td>{produit.id}</td>

                                                <td>{vente.qte}</td>
                                                <td>{produit ? produit.libelle : 'Produit inconnu'}</td>
                                                <td>{vente.montant.toLocaleString()}</td>
                                                <td>{vente.avance.toLocaleString()}</td>
                                                <td>{vente.reste.toLocaleString()}</td>
                                                <td>{vente.client}</td>
                                                <td>{moment(vente.createdAt).format('DD/MM/YYYY HH:mm')}</td>

                                                <td>{moment(vente.date_pay_reste).format('DD/MM/YYYY HH:mm')}</td>
                                                <td> <div className="filter">
                                                    <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                        <li className="dropdown-header text-start">
                                                        <h6>Actions</h6>
                                                        </li>
                                                        <li><a className="dropdown-item" href="#" onClick={() => handleSetShowForm(vente.id)}>Modifier</a></li>
                                                        {vente.reste> 0? <li><a className="dropdown-item" href="#" onClick={() => handleCloturer(vente.id)}>Cloturer </a></li>:''}
                                                        <li><a className="dropdown-item" href="#">Supprimer</a></li>
                                                    </ul>
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
export default ListVente ;