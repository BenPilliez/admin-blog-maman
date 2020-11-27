import React from "react"
import {connect} from "react-redux"
import './App.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Switch} from "react-router-dom";
import Navigation from "./components/navigations/navigation";
import Login from "./components/auth/login";


class App extends React.Component {
    render() {
        const {user} = this.props
        if (!user) return <div><Login/> <ToastContainer/></div>
        return (
            <BrowserRouter>
                <Navigation />
                <div className="App">
                    <Switch>
                    </Switch>
                    <ToastContainer/>
                </div>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(App)
