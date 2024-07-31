import React, { useContext } from "react";
import { SidebarContext } from "./SideBarContext";

const Sidebar = () => {

  const { isSidebarVisible } = useContext(SidebarContext);
  const { toggleSidebar } = useContext(SidebarContext);

  return (
      <div className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${isSidebarVisible ? '' : 'toggled'}`} id="accordionSidebar">
          <i className="bi bi-list toggle-sidebar-btn" onClick={toggleSidebar}></i>
      
          <ul class="sidebar-nav" id="sidebar-nav">
      
            <li class="nav-item">
              <a class="nav-link " href="/Dashboard">
                <i class="bi bi-grid"></i>
                <span>Dashboard</span>
              </a>
            </li>
      
            <li class="nav-item">
              <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                <i class="bi bi-menu-button-wide"></i><span>Ajout</span><i class="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul id="components-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li>
                  <a href="/add.approv">
                    <i class="bi bi-circle"></i><span>Approvisionement</span>
                  </a>
                </li>
                <li>
                  <a href="/add.vente">
                    <i class="bi bi-circle"></i><span>Ventes</span>
                  </a>
                </li>
                <li>
                  <a href="/add.produit">
                    <i class="bi bi-circle"></i><span>Produits</span>
                  </a>
                </li>
              </ul>
            </li>
      
            <li class="nav-item">
              <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                <i class="bi bi-journal-text"></i><span>Historiques</span><i class="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul id="forms-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li>
                  <a href="/ListApprovisionement">
                    <i class="bi bi-circle"></i><span>Approvisionement</span>
                  </a>
                </li>
                <li>
                  <a href="/list.vente">
                    <i class="bi bi-circle"></i><span>Vente</span>
                  </a>
                </li>
                <li>
                  <a href="/list.produit">
                    <i class="bi bi-circle"></i><span>Produits</span>
                  </a>
                </li>
              </ul>
            </li>
      
            <li class="nav-item">
              <a class="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                <i class="bi bi-layout-text-window-reverse"></i><span>Stocks</span><i class="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul id="tables-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li>
                  <a href="/list.stock">
                    <i class="bi bi-circle"></i><span>Tout les stoks</span>
                  </a>
                </li>
               
              </ul>
            </li>
          </ul>
      
        </div>
    )
}
export default Sidebar