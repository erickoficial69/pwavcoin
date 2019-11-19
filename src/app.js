<<<<<<< HEAD
import React, {useState, useEffect} from 'react'
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

function Logged(){
    return <Redirect to='/dashboard'/>
}
function Logout(){
    sessionStorage.removeItem('userSesion')
    return window.location = '/'
    
}

function App(){
    const [sesion,setSesion] = useState(false)
    
    useEffect(()=>{
        setSesion(sessionStorage.userSesion?true:false)
    },[])
   
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
                        <Route exact path="/Dashboard/ProfileSettings/:id" component={ProfileSettings}/>
                        <Route exact path="/Dashboard/VerifyOrder/:item?/:idUser?/:rank?" component={VerifyOrder}/>
                        <Route  path="/Dashboard/History/:idUser/:rango?" component={History}/>
                    
                        <Route path="/logged" component={Logged}/>
                        
                </Router>    
                
            )
        
}

=======
import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

import Header from './components/header'
import Home from './rutas/home'
import Recover from './sesiones/recover'
import UpdatePass from './sesiones/recover/updatePass'

import PwaFeacture from './components/pwa_feactures'

import Dashboard from './rutas/dashboard'
import BankAcounts from './rutas/dashboard/BankAcounts'
import NewOrder from './rutas/dashboard/newOrder'
import HistoryClient from './rutas/dashboard/history'
import AddBanks from './rutas/dashboard/forms/addBanks'
import AddPais from './rutas/dashboard/forms/addPais'
import VerifyOrder from './rutas/dashboard/forms/verificarOrden'
import User from './rutas/dashboard/user.js'
import Users from './rutas/dashboard/users.js'
import ProfileSettings from './rutas/dashboard/configuraciones'

function Logged(){
    return <Redirect to='/dashboard'/>
}

function App(){
    const [sesion,setSesion] = useState(false)
    useEffect(()=>{
        setSesion(sessionStorage.userSesion?true:false)
    },[])
         return(
                <Router>
                    <PwaFeacture/>
                        <Header sesion={sesion} setSesion={setSesion}/>

                        <Route exact path="/" component={Home}/>
                        <Route exact path="/Dashboard" component={Dashboard}/>
                        {sesion?<Route exact path="/Dashboard/NewOrder/:propietario?" component={NewOrder}/>:null}
                        {sesion?<Route exact path="/Dashboard/BankAcounts" component={BankAcounts}/>:null}
                        {sesion?<Route exact path="/Dashboard/AddBanks/:propietario?" component={AddBanks}/>:null}
                        {sesion?<Route exact path="/Dashboard/AddPais" component={AddPais}/>:null}
                        {sesion?<Route exact path="/Dashboard/User/:id?" component={User}/>:null}
                        {sesion?<Route exact path="/Dashboard/Users" component={Users}/>:null}
                        {sesion?<Route exact path="/Dashboard/ProfileSettings/:id" component={ProfileSettings}/>:null}
                        {sesion?<Route exact path="/Dashboard/VerifyOrder/:item?/:idUser?/:rank?" component={VerifyOrder}/>:null}
                        {sesion?<Route  path="/Dashboard/History" component={HistoryClient}/>:null}

                        <Route exact path="/Recover/:service?" component={Recover}/>
                        <Route exact path="/UpdatePass/:token?" component={UpdatePass}/>
                        <Route  path="/logged" component={Logged}/>
                </Router>    
                
            )
        
}

>>>>>>> 4db5092d6467c836177423a26bfe47beb4295217
export default App