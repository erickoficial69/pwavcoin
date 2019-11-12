import React, {useState, Fragment, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {AlertaRoja, Alerta} from '../components/alerts/alerts'


import {FormSesion, FormPedidos} from './formControl'

function BtnLogin(props){
    const {sesion, setSesion, ctrl} = props
    const [open, setOpen] = useState(false)

    const controller =()=>{
        ctrl(false)
    }
    const logout = async ()=>{
        await sessionStorage.removeItem('userSesion')
        ctrl(false)
        setSesion(false)
        setOpen(false)
        window.location = '/'
    }

        return !sesion ?(
            <Fragment>
                <Link onClick={()=>{setOpen(open ? false : true)}} to='/'>
                    ingresar
                </Link>
                <FormSesion
                setOpen={setOpen}
                open={open}
                sesion={sesion}
                setSesion={setSesion} 
                />
            </Fragment>
        ):(
            <Fragment>
                <Link onClick={controller} to='/Dashboard'>
                    Dashboard
                </Link>
            <Link className='btnCancel' onClick={logout} to='/Dashboard'>
                Logout
            </Link>
        </Fragment> 
        )
    
}

function BtnPedido(props){
    const [open, setOpen] = useState(false)
    const [activeAlert, setActiveAlert] = useState(false)

    const {formula,resultado, sesion,bankDest,propietario} = props

    const showAlert=(e)=>{
        e.preventDefault()
        open?setOpen(false):setOpen(true)
        setActiveAlert(true)
        return
    }
    
        return sesion === false ?(
            <Fragment>
                <AlertaRoja activeAlert={activeAlert} setActiveAlert={setActiveAlert} mensaje={'debes ingresar'}/>
                <button className='btnGreen' onClick={showAlert}>
                    Hacer Pedido
                </button>
                
            </Fragment>
        ):(
            <Fragment>
            <button className='btnGreen' onClick={()=>{setOpen(open ? false : true)}} >
                Hacer pedido
            </button>
            <Alerta activeAlert={activeAlert} setActiveAlert={setActiveAlert} mensaje='Completado'/>
            <FormPedidos
                btn={setOpen}
                open={open}
                formula={formula}
                resultado={resultado}
                setActiveAlert={setActiveAlert}
                bankDest={bankDest}
                propietario={propietario}
            />
            
            <Redir activeAlert={activeAlert}/>
        </Fragment> 
        )
}
const Redir = (props)=>{
    return props.activeAlert ? <Redirect to='/Dashboard'/> :null
}
export {BtnLogin, BtnPedido}