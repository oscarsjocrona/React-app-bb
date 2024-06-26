import React, {Component} from 'react';
import Auxilliary from '../../../HOC/Auxilliary/Auxilliary';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component { 
    
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate(){
        console.log('[Modal] componentWillUpdate');
    }

    render() {
        return (
            <Auxilliary>
                <Backdrop show={this.props.show} modalClosed={this.props.cancel}/>
                <div 
                className={classes.Modal}
                style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)', 
                        opacity: this.props.show ? 1 : 0
                    }}>
                    {this.props.children}
                </div>
            </Auxilliary>);
        }
}

export default Modal;