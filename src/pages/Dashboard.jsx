import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"
import Chart from 'react-apexcharts';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js'
import { SidebarProvider } from "../components/SideBarContext";

const Dashboard = () => {
    const token = localStorage.getItem('token')
    const ecryptId = localStorage.getItem('id')
    const KEY = '@18515'
    const id =  CryptoJS.AES.decrypt(ecryptId, KEY).toString(CryptoJS.enc.Utf8);
    const navigate = useNavigate()
    const [commande , setCommande] = useState([])
    const [fournisseur , setFournisseur] = useState([])
    const [vente , setVente] = useState([])
    const [stocks , setStocks] = useState([])
    const [produits ,setProduits] = useState([])
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState('mois-encour');
   
  //  fonction pour recuperer les ventes et les commande du mois en cours
    const isCurrentMonth = (date) => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
    
      const givenDate = new Date(date);
      const givenMonth = givenDate.getMonth();
      const givenYear = givenDate.getFullYear();
    
      return currentMonth === givenMonth && currentYear === givenYear;
    };
    // fonction pour recuprerer les ventes et les commande des trois dernier mois en cours 
    const isLastThreeMonths = (date) => {
      const currentDate = new Date();
      const givenDate = new Date(date);
    
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

     return givenDate >= threeMonthsAgo && givenDate <= currentDate;
    };
    // commande pour recuperer les commande et les vente de l'annee en cours
    const isCurrentYear = (date) => {
      const currentYear = new Date().getFullYear();
      return new Date(date).getFullYear() === currentYear;
    };
        
  //  fonction permetant d'afficher les donner en fonction de la periode selectionner
    const getFilteredData = () => {
      switch (selectedPeriod) {
        case 'mois-encour':
          return {
            ventes: vente.filter(v => isCurrentMonth(v.createdAt)),
            commandes: commande.filter(c => isCurrentMonth(c.createdAt))
          };
        case 'trimestre':
          return {
            ventes: vente.filter(v => isLastThreeMonths(v.createdAt)),
            commandes: commande.filter(c => isLastThreeMonths(c.createdAt))
          };
        case 'annee':
          return {
            ventes: vente.filter(v => isCurrentYear(v.createdAt)),
            commandes: commande.filter(c => isCurrentYear(c.createdAt))
          };
        default:
          return {
            ventes: [],
            commandes: []
          };
      }
    };
    // appelle de la fonction getFiltedDate 
    const { ventes: filteredVentes, commandes: filteredCommandes } = getFilteredData();
// fonction pour calculer le revenu ( sa peut etre pour la mois pour le trimestre ou pour l'annee)
    const countRevenu = (ventes) => {
      let total = 0;
      ventes.forEach(vent => {
        total += vent.montant;
      });
      return total;
    };
    // modification du state des periodes
    const showData = (period) => {
      setSelectedPeriod(period);
    };
   
    // recuperation des donnee ( quantite et libelle) des stock pour allimenter l'option1
    const dataStock = stocks.map(stock => (
        
    {
      value: stock.qte,
      name:  produits.find(p => p.id === stock.ProduitId)?.libelle || 'Produit inconnu'
    }));
      // option pour la contruction des graphe en ligne 
    const options = {
          chart: {
            height: 350,
            type: 'area',
            toolbar: {
              show: false
            },
          },
          markers: {
            size: 4
          },
          colors: ['#4154f1', '#2eca6a'],
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.3,
              opacityTo: 0.4,
              stops: [0, 90, 100]
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
            width: 2
          },
          xaxis: {
            type: 'datetime',
            categories: commande.map(row => row.createdAt)
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },
          }
        };
      const series = [
          {
            name: 'Achat',
            data:commande.map(row => row.montant),
          },
          {
            name: 'Vente',
            data: vente.map(row => row.montant)
          }
        ];

        // option pour la construction du graphe circulaire
      const options1 = {
            tooltip: {
              trigger: 'item'
            },
            legend: {
              top: '5%',
              left: 'center'
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '18',
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data: dataStock
              }
            ]
          };
          // fetch les donnee avec le useffect
          useEffect(() => {
            const fetchUser = async () => {
              const token = localStorage.getItem('token');
              if (!token) {
                navigate('/Login');
                return;
              }
        
              try {
                const response = await axios.get(`http://172.20.10.6:3001/admin/data/${id}`);


                setCommande(response.data.commandes);
                setVente(response.data.ventes)
                setFournisseur(response.data.fournisseurs)
                setStocks(response.data.stocks)
                setProduits(response.data.produits)
              } catch (error) {
                console.error('Error fetching user:', error);
              
                navigate('/login');
              }
            };
        
            fetchUser();
          }, [navigate]);
        
          


    return(
<SidebarProvider> 
        <div>
            <Header/>
            <Sidebar/>
             <main id="main" className="main">

                    <div className="pagetitle">
                    <h1>Tableau de bord</h1>
                    <nav>
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Acceuil</a></li>
                        <li className="breadcrumb-item active">Tableau de bord</li>
                        </ol>
                    </nav>
                    </div>

                    <section className="section dashboard">
                    <div className="row">

                    
                        <div className="col-lg-8">
                        <div className="row">

                        
                            <div className="col-xxl-4 col-md-6">
                            <div className="card info-card sales-card">

                                <div className="filter">
                                <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li className="dropdown-header text-start">
                                    <h6>Filter</h6>
                                    </li>

                                    <li><a className="dropdown-item" onClick={() => showData('mois-encour')}  href="#">Ce mois</a></li>
                                    <li><a className="dropdown-item" onClick={() => showData('trimestre')}    href="#">Trimestre</a></li>
                                    <li><a className="dropdown-item" onClick={() => showData('annee')} href="#">Cette année</a></li>
                                </ul>
                                </div>

                                <div className="card-body">
                                <h5 className="card-title">Achat <span></span></h5>

                                <div className="d-flex align-items-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                    <i className="bi bi-cart"></i>
                                    </div>
                                    <div className="ps-3">
                                    <h6>{filteredCommandes.length.toLocaleString()}</h6>
                                    

                                    </div>
                                </div>
                                </div>

                            </div>
                            </div>

                        
                            <div className="col-xxl-4 col-md-6">
                            <div className="card info-card revenue-card">

                                <div className="filter">
                                <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li className="dropdown-header text-start">
                                    <h6>Filter</h6>
                                    </li>

                                    <li><a className="dropdown-item" onClick={() => showData('mois-encour')}  href="#">Ce mois</a></li>
                                    <li><a className="dropdown-item" onClick={() => showData('trimestre')}    href="#">Trimestre</a></li>
                                    <li><a className="dropdown-item" onClick={() => showData('annee')} href="#">Cette année</a></li>
                                </ul>
                                </div>

                                <div className="card-body">
                                <h5 className="card-title">Revenue <span></span></h5>

                                <div className="d-flex align-items-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                    <i className="bi bi-currency-dollar"></i>
                                    </div>
                                    <div className="ps-3">
                                    <h6>{countRevenu(filteredVentes).toLocaleString()}</h6>

                                    </div>
                                </div>
                                </div>

                            </div>
                            </div>

                    
                            <div className="col-xxl-4 col-xl-12">

                            <div className="card info-card customers-card">

                                <div className="filter">
                                <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li className="dropdown-header text-start">
                                    <h6>Filter</h6>
                                    </li>

                                    <li><a className="dropdown-item" onClick={() => showData('mois-encour')}  href="#">Ce mois</a></li>
                                    <li><a className="dropdown-item" onClick={() => showData('trimestre')}    href="#">Trimestre</a></li>
                                    <li><a className="dropdown-item" onClick={() => showData('annee')} href="#">Cette année</a></li>
                                </ul>
                                </div>

                                <div className="card-body">
                                <h5 className="card-title">Vente <span></span></h5>

                                <div className="d-flex align-items-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                    <i className="bi bi-people"></i>
                                    </div>
                                    <div className="ps-3">
                                    <h6>{filteredVentes.length.toLocaleString()}</h6>

                                    </div>
                                </div>

                                </div>
                            </div>

                            </div>

                        
                            <div className="col-12">
                            <div className="card">

                             

                                <div className="card-body">
                                <h5 className="card-title">Historique | Achat & Vente </h5>

                                
                                    <div id="reportsChart">
                                        <Chart options={options} series={series} type="area" height={350} />
                                        
                                    </div>
                                </div>

                            </div>  
                            </div>

                    
                        

                        </div>
                        </div>

                    
                        <div className="col-lg-4">
                        
                        <div className="card">
                            <div className="filter">
                            <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                <li className="dropdown-header text-start">
                                <h6>Filter</h6>
                                </li>

                                <li><a className="dropdown-item" href="#">Today</a></li>
                                <li><a className="dropdown-item" href="#">This Month</a></li>
                                <li><a className="dropdown-item" href="#">This Year</a></li>
                            </ul>
                            </div>

                            <div className="card-body pb-0">
                            <h5 className="card-title">Etat des stoks </h5>

                            <div id="trafficChart"    className="echart" ></div>
                                    <ReactECharts option={options1} style={{ height: '350px', width: '100%' }} />
                            </div>

                        </div>
                        </div>

                    </div>
                    </section>

                </main>
            <Footer/>
        </div>
  </SidebarProvider>
    
    )
}
export default Dashboard ;