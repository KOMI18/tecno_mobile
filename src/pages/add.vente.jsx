import Sidebar from "../components/Sidebar"
import axios from "axios"
import Header from "../components/Header"
import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import CryptoJS from 'crypto-js'
import {notification} from 'antd'
import { SidebarProvider } from "../components/SideBarContext"
const AddVente = () => {
  const [produit , setProduit] = useState([])
  const [errorMessage , setErrorMessage] = useState('')
  const [Loading , setLoading] = useState(false)
  const KEY = '@18515'
  const ecryptId = localStorage.getItem('id')
  const id =  CryptoJS.AES.decrypt(ecryptId, KEY).toString(CryptoJS.enc.Utf8);
  const [date , setDate] = useState('')
  const [data , setData] = useState({  
            qte :'',
            montant :'',
            avance :'',
            reste :'',
            client :'',
            ProduitId :'',
            date_pay_reste :'',
            AdminId: id
});
    const [message , setMessage] = useState('')
    const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
            try{
               const insertData = await axios.post('http://172.20.10.6:3001/vente/uniqVente' , data )
              notification.success({message:"Commande enregistrer"})
              setLoading(false)
            }catch(error){
                console.log('une erreur est survennnue' , error);
               setLoading(false)
                notification.error({message: "une erreur est survenu lors de l\'enregistrement de la commande"})
            }
    }
          useEffect(() =>{
              const getData  = async () => {
                try{
                   const response = await axios.get(`http://172.20.10.6:3001/admin/data/${id}`)
                 
                   setProduit(response.data.produits)
                   console.log('donner recuperer');
                }catch(error){
                    console.log(error);
                }
              }
              getData()
          }, [])
    const handleChange = (e) => {
      const { name, value } = e.target;
      setData({
        ...data,
        [name]: value
      });
    };
   
    return(
      <SidebarProvider>

        <div  className=" container" >
            <Header/>
            <Sidebar/>
            <main id="main" class="main">

            <div class="pagetitle">
             <h1>Approvisionnement </h1>
          
           
            </div>
            <section className="card" >
        
                   
                 
            <div class="card-body">
              <h5 class="card-title">Approvisionner le magasin</h5>

            
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
                  <button class="btn btn-primary" onClick={handleSubmit} type="submit">{ Loading ? <Loader/> :'Ajouter le produit'}</button>
               
              </form>

            </div>
      
                
            </section>
            </main>
        </div>
      </SidebarProvider>
        
    )
}

export default AddVente