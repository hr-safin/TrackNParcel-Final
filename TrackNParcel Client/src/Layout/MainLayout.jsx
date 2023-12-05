import React from 'react';
import NavBar from '../Shared/NavBar/NavBar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';

const MainLayout = () => {
    const location = useLocation()
    const noHeaderFooter =  location.pathname.includes("signIn") || location.pathname.includes("signUp") 
    return (
        <div>
            {/* {noHeaderFooter || <NavBar /> } */}
            
        
            <Outlet></Outlet>
            
            {noHeaderFooter || <Footer/>}
            
            
        </div>
    );
};

export default MainLayout;