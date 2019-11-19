import React,{Fragment, useEffect, useState, useLayoutEffect} from 'react'
import {Link} from 'react-router-dom'
import './header_dashboard.css'
import {notificationPedido, notificacioNoticias,notificationtoOperador,messages,updateMessage,deleteMessage} from '../gets_apis/sockets'
import {secureSesion} from '../gets_apis/api_sesion'
import ViewMessages from '../rutas/viewMessages'
import FormComents from '../rutas/formComents'
import avatar from '../svg/usuario.svg'
import resenas from '../svg/resenas.svg'
import {servers}from '../keys'
const {staticServer} = servers


const Headerdashboard = (props)=>{
    const {sesion, setSesion} = props
    const [user, setUser] = useState('')
    const [count,setCount] = useState(0)
    const [message,setMessage] = useState([])
    const [modalViewMessage,setModalViewMessage] = useState(false)
    const [modalComents, setModalComents] = useState(false)

   const show = ()=>{
    document.querySelector('#navigation').classList.toggle('show')
    }
   const logout = () =>{
        sessionStorage.removeItem('userSesion')
        setSesion(false)
   }
   useLayoutEffect(()=>{
    const usuario = JSON.parse(sessionStorage.userSesion)
    usuario.rango==='cliente'?notificationPedido():notificationtoOperador()
    notificacioNoticias()
    messages(usuario,setMessage,setCount)
    setUser(usuario)
    secureSesion(usuario.idUsuario)
},[])
    useEffect(()=>{
        const usuario = JSON.parse(sessionStorage.userSesion)
        setUser(usuario)
    })
    return sesion?(
        <Fragment>
        {modalComents?
        <FormComents 
            modalComents={modalComents} 
            setModalComents={setModalComents}
        />:null}  

            {modalViewMessage?
            <ViewMessages
                message={message}
                modalViewMessage={modalViewMessage}
                user={user}
                setModalViewMessage={setModalViewMessage}
                updateMessage={updateMessage}
                deleteMessage={deleteMessage}
                setCount={setCount}
                setMessage={setMessage}
            />:null}

            <aside className='scroll' id='navigation'>
            <span onClick={show} className="MenuIco">menu</span>
        <div>
            {
                //boton de mensajes
                <span count={count} className={count>0?'MensajesIcono notiM':'MensajesIcono'} onClick={()=>modalViewMessage?setModalViewMessage(false):setModalViewMessage(true)}>
                </span>
                //boton de mensajes 
            }
            
            <img src={user.foto?staticServer+user.foto:avatar} alt=""/>
            <div>
            <h3>{user.nombre} {user.apelido} </h3>
            <p>rango: {user.rango}</p>
            </div>
        
          </div>
            <div className="Notificaciones2">
            <div onClick={()=>setModalComents(modalComents?false:true)} className="Notificacion resenas">
                <img src={resenas} alt=""/>
            </div>
            </div>
                
                    <Link onClick={show} to="/Dashboard">Tablero</Link>
                    {user.rango !== 'corresponsal' ?<Link onClick={show} to="/Dashboard/BankAcounts">Cuentas Bancarias</Link>:null}
                    {user.rango !== 'corresponsal' ?<Link onClick={show} to="/Dashboard/AddBanks">Agregar Cuentas Bancarias</Link>:null}
                    {user.rango === 'cliente'?( <Link onClick={show} to="/Dashboard/NewOrder">Nueva Orden</Link>):null}
                    {user.rango === 'administrador'?( <Link onClick={show} to="/Dashboard/resenas">Resenas</Link>):null}
                    {<Link onClick={show} to={`/Dashboard/History/${user.idUsuario}/${user.rango}`}>Historial</Link>}
                    {user.rango === 'administrador' ?( <Link onClick={show} to="/Dashboard/AddPais">Administrar de monedas</Link>):null}
                    {user.rango !== 'cliente' ?( <Link onClick={show} to="/Dashboard/Users">Control de usuarios</Link>):null}
                    {<Link onClick={show} to={`/Dashboard/ProfileSettings/${user.idUsuario}`}>Configuración</Link>}
                    <Link to="/Logout">Salir</Link>
    </aside>
        </Fragment>
    ):null
}
export default Headerdashboard