import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {BtnLogin} from '../../sesiones/userControl'
import './header.css'
import logo from '../images/logo.png'
import Headerdashboard from '../header_dashboard'

const Header = (props)=>{
    const [sesion, setSesion] = useState(false)
    const show = ()=>{
        document.querySelector('#navigation').classList.toggle('show')
    }
    useEffect(()=>{
        const login = sessionStorage.userSesion
        if(login){
            setSesion(true)
        }else{
            setSesion(false)
        }
    },[])
     if(sessionStorage.userSesion){
        return(
            <Headerdashboard sesion={sesion} setSesion={setSesion}/> 
        )
     }else{
        return (
            <nav className='scroll' id='navigation'>
            <img src={logo} alt=""/>
            <span className='MenuIco1' onClick={show}>menu</span>
            <div>
                <Link to="/">Inicio</Link>
                <a onClick={show} href="#SobreNosotros">Sobre Nosotros</a>
                <a onClick={show} href="#Resenas">Reseñas</a>
                <a onClick={show} href="#Rastrear">Rastrear</a>
                <BtnLogin sesion={sesion} setSesion={setSesion}/>
            </div>
        </nav>      
        )
     }
     return null
}

export default Header