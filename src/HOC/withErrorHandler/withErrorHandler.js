import React, {Component} from 'react';
import Modal from '../../Components/UI/Modal/Modal';
import Aux from '../Auxilliary/Auxilliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        
        //ES6
        // constructor(props){
        //     super(props);

        //     axios.interceptors.request.use(req => {
        //         this.setState({error:null});
        //         return req;
        //     });

        //     axios.interceptors.response.use( res => res, error => {
        //         this.setState({error: error});
        //     })
        // }

        state = {
            error: null
        }

        componentWillMount(){
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            });

            this.responseInterceptor =axios.interceptors.response.use( res => res, error => {
                this.setState({error: error});
            })
        }

        componentWillUnmount(){
            //Prevent memory leak
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }
        
        errorConfirmedHandler = () => {
            this.setState({error:null});
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        show = {this.state.error !== null}
                        cancel= {this.errorConfirmedHandler}>
                            { this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>);
        }
        
    }
}

export default withErrorHandler;