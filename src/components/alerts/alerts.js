import React from 'react'
import './alerts.css'

function AlertaRoja(props){
    const {activeAlert,setActiveAlert,mensaje} = props
    const alerta = document.querySelector('.AlertaRoja')
if(activeAlert){
    alerta.style.right = '0'
    setTimeout(()=>{
        alerta.style.right = '-200%'

        setActiveAlert(false)
    },2500)
}
    return(
        <article className="AlertaRoja position">
                        <p>
                            <span>
                                {mensaje}
                            </span>
                        </p>
                    </article>
    )
}

function Alerta(props){
    const {activeAlert,setActiveAlert,mensaje} = props
    const alerta = document.querySelector('.Alerta')
if(activeAlert){
    alerta.style.right = '0'
    setTimeout(()=>{
        alerta.style.right = '-200%'

        setActiveAlert(false)
    },2500)
}
    return(
        <article className="Alerta position">
                        <p>
                            <span>
                                {mensaje}
                            </span>
                        </p>
                    </article>
    )
}

export {Alerta, AlertaRoja}