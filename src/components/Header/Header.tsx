import * as React from 'react';
import classes from './Header.module.css';

function Header() {
    return (
        <div className={classes.Header}>
            <p>TRADE<span style={{color: '#DC143C'}}>49</span></p>
        </div>
    );
}
export default Header;