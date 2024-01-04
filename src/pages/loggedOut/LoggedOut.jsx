import styles from './LoggedOut.module.css';
import { Link } from 'react-router-dom';


function LoggedOut() {
    
    return (
        <div className='section-container'>
            
            <h1 className={styles[ 'logged-out-title' ]}>Logged Out</h1>
            
            <Link
                to='/'
                className={styles[ 'link' ]}
            >Go to MovieSearch</Link>
            <Link
                to='/signin'
                className={styles[ 'link' ]}
            >Go to Sign In
            </Link>
        
        </div>
    );
}

export default LoggedOut;