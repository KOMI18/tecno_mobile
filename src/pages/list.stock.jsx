import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import moment from 'moment'
import Modal from 'react-modal'
import { useEffect , useState } from "react";
import axios from "axios";
import CryptoJS from 'crypto-js'
import { SidebarProvider } from "../components/SideBarContext";
const ListStock = () => {
    const [adminData , setAdminData] = useState([]);
    const [searchTerm  , setSearchTerm] = useState('')
    const ecryptId = localStorage.getItem('id')

    const KEY = '@18515'
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
    // const filteredItems = adminData.produits && adminData.produits.filter(item =>
    //     item.id.parseInt().includes(searchTerm.toLowerCase())
    // );
    return(
        <SidebarProvider>

        
        <div>
        <Header onSearch={handleSearch} />
        <Sidebar />
        <div className="container" style={{marginTop:'100px'}}>
            <div className="row justify-content-center">
                <div className="col-lg-8"> {/* Utilisation de col-lg-8 pour une largeur plus grande sur les écrans larges */}
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"> Listes des Stocks</h5>
                            <div className="table-responsive"> {/* Utilisation de table-responsive pour les tables qui dépassent de la largeur */}
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                             <th scope="col">Ref#</th>
                                             <th scope="col">Produit</th>
                                            
                                            <th scope="col">Qte</th>
                                            <th scope="col">Prix Total (cfa)</th>


                                            <th scope="col">Date regelement reste</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                          {adminData.stocks && adminData.produits ? (
                                                adminData.stocks.map(stock => {
                                                const produit = adminData.produits.find(p => p.id === stock.ProduitId);
                                                return (
                                                    <tr key={stock.id}>
                                                    <td>{stock.id}</td>
                                                    <td>{produit.libelle ? produit.libelle : 'Produit ivalide'}</td>

                                                    <td>{stock.qte}</td>
                                                    <td>{stock.prix.toLocaleString()}</td>
                                                    
                                                    {/* <td>{produit ? produit.libelle : 'Produit inconnu'}</td> */}
                                                   
                                                 
                                                    <td>{moment(stock.date_reglement_reste).format('DD/MM/YYYY HH:mm')}</td>
                                                  
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
                </div>
            </div>
        </div>
    </div>
    
    
    
    </SidebarProvider>
    )
}
export default ListStock ;