import React from 'react';
import styles from './About.module.css';


function About() {
    
    
    return (
        <>
            <div className='section-container'>
                
                <h1 className='login-title'>About</h1>
                
                <p className={styles[ 'about-text' ]}>Moo-V-Pickr is a product of Moo-V-Pickr Limited<br/>
                    When you want to watch a movie but don't know which one...<br/>
                </p>
                <a
                    className='link-to-moviesearch'
                    href='/'
                >Try Moo-V-Pickr!</a>
            
            </div>
        </>
    );
}

export default About;

