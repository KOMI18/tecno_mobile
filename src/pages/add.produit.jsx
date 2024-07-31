import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import CryptoJS from 'crypto-js'
import { useState , useEffect } from "react"
import { notification } from "antd"
import { SidebarProvider } from "../components/SideBarContext"
import axios from "axios"
const AddProduit = () => {
  const KEY = '@18515'
  const ecryptId = localStorage.getItem('id')
  const id =  CryptoJS.AES.decrypt(ecryptId, KEY).toString(CryptoJS.enc.Utf8);

  const [data , setData] = useState({ 
    libelle : '',
    prix : '',
    AdminId : id 
})
    const handleSubmit  = async (e) =>{
      e.preventDefault()
            try{
                const insertProduit = await axios.post('http://172.20.10.6:3001/produit/create' , data )
                notification.success({message: insertProduit.data.message})
                setData({
                  libelle: '',
                  prix: ''
                })
            }catch(err){
                notification.error({message: 'une erreur est survenue'})
                console.log(err);
            }
    }
    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  }
    return(
      <SidebarProvider>

        <div  className=" container" >
            <Header/>
            <Sidebar/>
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
                  <input type="text" class="form-control" name="libelle" onChange={handleChange} value={data.libelle}id="inputNanme4"/>
                </div>
                <div class="col-12">
                  <label for="inputEmail4" class="form-label">Prix</label>
                  <input type="number" class="form-control" name="prix" onChange={handleChange} value={data.prix} id="inputEmail4"/>
                </div>
                <button class="btn btn-primary" onClick={handleSubmit} type="submit">Submit form</button>
              </form>

            </div>
        
      
                
            </section>
            </main>
        </div>
      </SidebarProvider>
        
    )
}

export default AddProduit