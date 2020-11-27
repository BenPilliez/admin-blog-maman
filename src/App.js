import React from "react"
import {connect} from "react-redux"
import './App.css'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Navigation from "./components/navigations/navigation"
import Login from "./components/auth/login"
import Users from "./components/layout/users"
import Categories from "./components/layout/categories"
import {withStyles} from "@material-ui/core"


const styles = theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
});


class App extends React.Component {
    render() {
        const {user, classes} = this.props
        if (!user) return <div><Login/> <ToastContainer/></div>
        return (
            <BrowserRouter>
                <div className={classes.root}>
                    <Navigation/>
                    <main className={classes.content}>
                        <div className="App">
                            <Switch>
                                <Route component={Users} path={"/users"}/>
                                <Route component={Categories} path={"/categories"}/>
                            </Switch>
                            <ToastContainer/>
                        </div>
                    </main>
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

export default withStyles(styles)(connect(mapStateToProps)(App))
