import React from 'react';
import { Link } from "react-router-dom";
import styles from './SignedUp.module.css';


function SignedUp() {
    
    return (
        
        <>
            <section className='section-container'>
                <h2 className='login-title'>Sign up succesful!</h2>
                
                <p>You have succefully signed up for Moo-V-Pickr<br/>
                    Click <Link to='/login'>here</Link> to log in<br/>
                </p>
            </section>
        
        </>
    );
}

export default SignedUp;