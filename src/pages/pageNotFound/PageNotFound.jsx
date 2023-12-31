import React from 'react';
import { Link } from "react-router-dom";
import styles from './PageNotFound.module.css';


function PageNotFound() {
    
    return (
        
        <>
            <main className='main-outer-container'>
                <main className='main-inner-container'>
                    <section className='about-container section-outer-container'>
                        <div className='section-inner-container'>
                            
                            <h2 className='login-title'>Page not found</h2>
                            
                            <p>Oops... This page does not exist</p>
                        
                        </div>
                    </section>
                </main>
            </main>
        </>
    );
}

export default PageNotFound;