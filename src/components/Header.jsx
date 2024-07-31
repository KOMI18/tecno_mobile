import { useNavigate } from "react-router-dom"
import { useState } from "react";
import React, { useContext } from "react";
import { SidebarContext } from "./SideBarContext";
const Header = ({onSearch}) => {
    const name = localStorage.getItem('usName')
    const [term, setTerm] = useState('');

    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('usName')

        navigate('/Login')
    }
    const { toggleSidebar } = useContext(SidebarContext);
    const handleChange = (e) => {
        const newterms = e.target.value ;
        setTerm(newterms)
        onSearch(newterms)
        
    }
    return(
    <header id="header" class="header fixed-top d-flex align-items-center">

        <div class="d-flex align-items-center justify-content-between">
        <a href="index.html" class="logo d-flex align-items-center">
       
            <span class="d-none d-lg-block">Tecno</span>
        </a>
       
               <i className="bi bi-list toggle-sidebar-btn" onClick={toggleSidebar}></i>
           

        </div>

        <div class="search-bar">
        <form class="search-form d-flex align-items-center" method="POST" action="#">
            <input type="text" 
               placeholder="Enter la reference du produit .." aria-label="Search"
               aria-describedby="basic-addon2"
               onChange={handleChange}
               value={term}
               
           />
            <button type="submit" title="Search"><i class="bi bi-search"></i></button>
        </form>
        </div>

        <nav class="header-nav ms-auto">
        <ul class="d-flex align-items-center">

            <li class="nav-item d-block d-lg-none">
            <a class="nav-link nav-icon search-bar-toggle " href="#">
                <i class="bi bi-search"></i>
            </a>
            </li>

            <li class="nav-item dropdown pe-3">

            <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle"/>
                <span class="d-none d-md-block dropdown-toggle ps-2">{name}</span>
            </a>

            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li class="dropdown-header">
                <h6>{name}</h6>
                <span>Admin</span>
                </li>
                <li>
                <hr class="dropdown-divider"/>
                </li>

                <li>
                <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
                    <i class="bi bi-person"></i>
                    <span>My Profile</span>
                </a>
                </li>
                <li>
                <hr class="dropdown-divider"/>
                </li>

            
                <li>
                <hr class="dropdown-divider"/>
                </li>

            
                <li>
                <hr class="dropdown-divider"/>
                </li>

                <li>
                <a class="dropdown-item d-flex align-items-center" href="#" onClick={logout}>
                    <i class="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                </a>
                </li>

            </ul>
            </li>

        </ul>
        </nav>

    </header>

    )
}
export default Header