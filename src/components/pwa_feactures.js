import React, {Fragment, useState, useEffect,useLayoutEffect} from 'react'
import './pwa_feactures.css'
import noti from '../svg/notificaciones.svg'
import inst from '../svg/descargarblanca.svg'
import resenas from '../svg/resenas.svg'
import atencionalcliente from '../svg/atencionalcliente.svg'
import FormComents from '../rutas/formComents'

let i = null
function PwaFeactures(){
    const [install, setInstall] = useState(null)
    const [online,setOnline] = useState(true)
    const [modalComents, setModalComents] = useState(false)
    const [sesion, setSesion] = useState(false)
    
    const [notification, setNotification] = useState(null)
  
    useEffect(()=>{
        const login = sessionStorage.userSesion
        if(login){
            setSesion(true)
        }
    })

    useLayoutEffect(()=>{
        if(!window)return 
        window.addEventListener('online',()=>{
        setOnline(true)
    })
    window.addEventListener('offline',()=>{
        setOnline(false)
    })

        if(('serviceWorker' in navigator) && ('Notification' in window)){
            if(Notification.permission==='default'){
                setNotification(<div onClick={activateN} className="Notificacion">
                <img src={noti} alt=""/>
            </div>)
            }
        }
        if(('serviceWorker' in navigator)){ 
            window.addEventListener('beforeinstallprompt', async e =>{
                i = e
                await setInstall(<div onClick={installApp} className="Install">
                <img src={inst} alt=""/>
            </div>)
            }) 
        } 
        
    })
    const activateN = async ()=>{
        const sw = await navigator.serviceWorker.getRegistration()
        await Notification.requestPermission()
        if(sw){
            sw.sendNotification('mensaje recivido',{
                body:'has recivido un mensaje'
            })
        }else{
            new Notification('mensaje recivido',{
                body:'has recivido un mensaje'
            })
        }
    }

    const installApp = (e)=>{
        i.prompt()
    }
    return (
        <Fragment>
            {modalComents?<FormComents modalComents={modalComents} setModalComents={setModalComents}/>:null}   
                    {!online?<div className="AlertInternet">
                                <span className="SinInternet">
                                </span>
                             </div>
                    :null}
            <div className="Notificaciones">
                    {notification}
                    {install}
                    
            {
                sesion?
                    <div onClick={()=>setModalComents(modalComents?false:true)} className="Notificacion resenas">
                        <img src={resenas} alt=""/>
                    </div>
                :null
            }

            <div className="Notificacion AtencionEnLinea">
                <img src={atencionalcliente} alt=""/>
            </div>
            </div>
        </Fragment>
    )
}

export default PwaFeactures