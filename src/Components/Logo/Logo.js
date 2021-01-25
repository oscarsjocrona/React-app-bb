import React from 'react';
import burgerLogo from '../../assets/Images/burger.png';
import classes from './Logo.css';

const logo = (props) => (
    //Because of webpack. When it bundles, a direct ref to the file in img src wont be found after webpack has bundled. Therefore it needs to be imported so that webpack creates a correct reference in the bundle
    //style={{height: props.height}}
    <div className={classes.Logo} style={{height: props.height}}><img src= {burgerLogo} ></img></div>
);

export default logo;