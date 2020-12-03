import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'fontsource-roboto';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore} from 'redux';
import rootReducers from './store/reducers/rootReducers'
import thunk from 'redux-thunk'
import {CssBaseline} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles"
import {Provider} from 'react-redux'
import {axiosInstance, setAuthorization} from "./config/axiosConfig"
import {localStorageTokenConfig} from "./config/localStorageToken";
import theme from "./config/theme"
import {toast} from "react-toastify";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faComment, faFolder, faLock, faNewspaper, faSignOutAlt, faUser, faTrash, faEdit, faEye, faTimes, faEyeSlash, faPlus} from '@fortawesome/free-solid-svg-icons'


library.add(faLock, faNewspaper, faFolder, faComment, faSignOutAlt, faUser, faTrash, faEdit, faEye, faTimes, faEyeSlash, faPlus)

const token = localStorage.getItem('token')
if (token) {
    setAuthorization(axiosInstance, token)
}
localStorageTokenConfig()

const store = createStore(rootReducers, applyMiddleware(thunk.withExtraArgument({axiosInstance, toast})))

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <CssBaseline/>
            <App/>
        </Provider>
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
