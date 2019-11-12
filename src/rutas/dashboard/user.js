import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import photo from '../../components/images/team-member01-150x150.jpg'
import './user.css'
import PedidosOnlyClient from './pedidosOnlyClient'
import {getOneUser,upgradeUser,setStatusUser} from '../../gets_apis/api_sesion'
import FormMessage from '../formMessages'

function User(props){
    const {id} = props.match.params
    const [user, setUser] = useState({})
    const [loading,setLoading] = useState(true)
    const [admin, setAdmin] = useState(JSON.stringify(sessionStorage.userSesion))
    const [verify,setVerify] = useState(false)
    const [modal,setModal] = useState(false)
    const [modalMessage,setModalMessage] = useState(false)
    
    const setStatus = async e =>{
        setStatusUser(e.target.attributes,setLoading,setVerify)
    }
    const upgrade = async e =>{
            upgradeUser(e.target.attributes,setLoading,setVerify)
    }

    useEffect(()=>{
        const adm = JSON.stringify(sessionStorage.userSesion)
        setAdmin(adm)
        verify?getOneUser(setUser,id,setLoading):getOneUser(setUser,id,setLoading)
    },[verify])

    return(
        <div className='container'>
            <h1>Planilla de Usuario</h1>
            <div className='headerUser Cartas'>
                <div className="Foto">
                    <img src={photo}/>
                    <p><span>{user.idUsuario}</span></p>
                </div>
                <div className="DatosPersonales">
                    <span>
                        <h2>Datos personales</h2>
                        <p>
                            <span>nombre:</span> {user.nombre}
                        </p>
                        <p>
                            <span>apellido</span> {user.apellido}
                        </p>
                        <p>
                            <span>C.i/dni:</span> {user.dni}
                        </p>
                        <p>
                            <span>pais:</span> {user.paisOrigen?user.paisOrigen:user.paisActual}
                        </p>
                    </span>
                </div>
                <div className="DatosPlataforma">
                    <span>
                        <h2>Datos de la cuenta</h2>
                        <p>
                            <span>rango:</span> {user.rango}
                        </p>
                        <p>
                            <span>F. registro:</span> {user.feachaIncripcion}
                        </p>
                        <p>
                            <span>status:</span> {user.userStatus}
                        </p>
                        <p>
                            <span>correo:</span> {user.correo}
                        </p>
                    </span>
                </div>
            </div>

            
            <div className='userActions'>
            {JSON.parse(sessionStorage.userSesion).rango==='administrador'?
                <button className='btnBlue' idusuario={user.idUsuario} rango={user.rango} onClick={upgrade}>{user.rango}</button>
                :null}
                
            {JSON.parse(sessionStorage.userSesion).rango==='administrador'?
                <button className='btnBlue' idusuario={user.idUsuario} userstatus={user.userStatus} onClick={setStatus}>{user.userStatus!=='suspendido'?'suspender':'habilitar'}</button>
                :null}

            {JSON.parse(sessionStorage.userSesion).rango==='administrador'?
                <button className='btnBlue' onClick={()=>setModal(modal?false:true)} >mensaje</button>
                :null}
                
                {user.idOperador === JSON.parse(sessionStorage.userSesion).idUsuario?<Link className='btnBlue BTN' to={`/Dashboard/AddBanks/${user.idUsuario}`} >añadir bancos</Link>:null}
                {user.idOperador === JSON.parse(sessionStorage.userSesion).idUsuario?<Link className='btnBlue BTN' to={`/dashboard/NewOrder/${user.idUsuario}`} >pedido</Link>:null}
            </div>
            {
                modalMessage?
                    <FormMessage
                    setModalMessage={setModalMessage}
                    modalMessage={modalMessage}
                    //parametros de contacto
                    idRemitente={admin.idUsuario}
                    remitente={admin.nombre}
                    idDestinatario={user.idUsuario?user.idUsuario:''}
                    destinatario={user.nombre?user.nombre+' '+user.apellido:''}
                    />:
                    false
            }
            <PedidosOnlyClient rango={user.rango} idUsuario={user.idUsuario}/>
        </div>
    )
}
export default User