import {BrowserRouter , Routes , Route} from "react-router-dom";
import './App.css';
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ListApprovisionement from "./pages/list.approvisionement";
import Commande_details from "./pages/commande_details";
import ListProduit from "./pages/list.produit";
import ListVente from "./pages/list.vente";
import AddProduit from "./pages/add.produit";
import ListStock from "./pages/list.stock";
import AddVente from "./pages/add.vente";
import AddApprovisionenement from "./pages/add.approvisionement";
function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index element={<Login/>} />
            <Route path="/Login" element={<Login/>}/>
            <Route path='/Register' element={<Register/>} />
            <Route path='/Dashboard' element={<Dashboard/>} />
            <Route path='/ListApprovisionement' element={<ListApprovisionement/>} />
            <Route path='/list.produit' element={<ListProduit/>} />
            <Route path='/list.vente' element={<ListVente/>} />
            <Route path='/list.stock' element={<ListStock/>} />
            <Route path='/add.produit' element={<AddProduit/>} />
            <Route path='/add.approv' element={<AddApprovisionenement/>} />
            <Route path='/add.vente' element={<AddVente/>} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
