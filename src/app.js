import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

import Header from './components/header'
import Home from './rutas/home'

import PwaFeacture from './components/pwa_feactures'

import Dashboard from './rutas/dashboard'
import BankAcounts from './rutas/dashboard/BankAcounts'
import NewOrder from './rutas/dashboard/newOrder'
import History from './rutas/dashboard/history'
import AddBanks from './rutas/dashboard/forms/addBanks'
import AddPais from './rutas/dashboard/forms/addPais'
import VerifyOrder from './rutas/dashboard/forms/verificarOrden'
import User from './rutas/dashboard/user.js'
import Users from './rutas/dashboard/users.js'
import ProfileSettings from './rutas/dashboard/configuraciones'
import Resenas from './rutas/dashboard/resenas'
import Recover from './sesiones/recover/index'
import UpdatePass from './sesiones/recover/updatePass'

function Logged(){
    return <Redirect to='/dashboard'/>
}
function Logout(){
    sessionStorage.removeItem('userSesion')
    return window.location = '/'
    
}

function App(){
    
         return(
                <Router>
                    <PwaFeacture/>
                        <Header/>

                        <Route exact path="/" component={Home}/>
                        <Route exact path="/Dashboard" component={Dashboard}/>
                        <Route  path="/Logout" component={Logout}/>
                        <Route exact path="/Dashboard/NewOrder/:propietario?" component={NewOrder}/>
                        <Route exact path="/Dashboard/BankAcounts" component={BankAcounts}/>
                        <Route exact path="/Dashboard/Resenas" component={Resenas}/>
                        <Route exact path="/Dashboard/AddBanks/:propietario?" component={AddBanks}/>
                        <Route exact path="/Dashboard/AddPais" component={AddPais}/>
                        <Route exact path="/Dashboard/User/:id?" component={User}/>
                        <Route exact path="/Dashboard/Users" component={Users}/>
                        <Route exact path="/Recover/:service?" component={Recover}/>
                        <Route exact path="/UpdatePass/:token?" component={UpdatePass}/>
                        <Route exact path="/Dashboard/ProfileSettings/:id" component={ProfileSettings}/>
                        <Route exact path="/Dashboard/VerifyOrder/:item?/:idUser?/:rank?" component={VerifyOrder}/>
                        <Route  path="/Dashboard/History/:idUser/:rango?" component={History}/>
                    
                        <Route path="/logged" component={Logged}/>
                        
                </Router>    
                
            )
        
}

export default App