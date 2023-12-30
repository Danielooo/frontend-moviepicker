import React from 'react';
import styles from './Footer.module.css';


function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className={styles[ 'footer' ]}>
            <p>&copy; {currentYear} Moo-V-Pickr Limited. All Rights Reserved</p>
        </footer>
    );
}

export default Footer;