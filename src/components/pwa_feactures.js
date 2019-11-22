import React, {Fragment, useState, useEffect,useLayoutEffect} from 'react'
import './pwa_feactures.css'
import noti from '../svg/notificaciones.svg'
import inst from '../svg/descargarblanca.svg'
import atencionalcliente from '../svg/atencionalcliente.svg'


let i = null
function PwaFeactures(){
    const [install, setInstall] = useState(null)
    const [online,setOnline] = useState(true)
    const [sesion, setSesion] = useState(false)
    
    const [notification, setNotification] = useState(null)
  
    useEffect(()=>{
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
    },[])

    
    const activateN = async ()=>{
        const sw = await navigator.serviceWorker.getRegistration()
        await Notification.requestPermission()
        if(sw){
            sw.showNotification('mensaje recivido',{
                body:'has recivido un mensaje',
                vibrate: [200, 100, 200, 100, 200, 100, 200]
            })
        }else{
            new Notification('mensaje recivido',{
                body:'has recivido un mensaje',
                vibrate: [200, 100, 200, 100, 200, 100, 200]
            })
        }
    }

    const installApp = (e)=>{
        i.prompt()
    }
    return (
        <Fragment>
            <div className="Notificaciones">
                    {notification}
                    {install}

                    {!online?<div className="AlertInternet">
                                <span className="SinInternet">
                                </span>
                             </div>
                    :null}

                    <a href="https://api.whatsapp.com/send?phone=+56959095044&text=Hola%2C+deseo+adquirir+un+soporte+con+ustedes" className="Notificacion AtencionEnLinea">
                        <img src={atencionalcliente} alt=""/>
                    </a>
            </div>
        </Fragment>
    )
}

export default PwaFeactures
