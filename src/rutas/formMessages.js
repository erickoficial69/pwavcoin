import React,{Fragment} from 'react'
import cerrarBtn from '../svg/cerrarBlanca.svg'
import {sendMessage} from '../gets_apis/sockets'
const datosFecha = new Date()
const fecha ={
  
    hora:datosFecha.toLocaleDateString()
}
const FormMessage = (props)=>{
    const {setModalMessage, modalMessage, idRemitente,remitente,idDestinatario,destinatario} = props

    const captureMessage= async e =>{
        e.preventDefault()
        const {idRemitente,remitente,idDestinatario,destinatario,titulo,mensaje} = e.target
        const message={
            idRemitente:idRemitente.value,
            remitente:remitente.value,
            idDestinatario:idDestinatario.value,
            destinatario:destinatario.value,
            titulo:titulo.value,
            mensaje:mensaje.value,
            fecha:fecha.hora,
            mensajeStatus:'nuevo'
        }
        sendMessage(message,setModalMessage)
    }

    return(
        <Fragment>
            <div id='containerForm'>
                <article className='ConfirmarOrden Cartas'>
                <form onSubmit={captureMessage}>
                    <div className='CampoFormulario'>
                    <label>
                        Titulo
                    </label>
                    <input type='text' name='titulo' placeholder='titulo del mensaje'/>
                    </div>
                    <div className='CampoFormulario'>
                    <label>
                        Mensaje
                    </label>
                    <textarea name='mensaje'>

                    </textarea>
                    </div>

                        <input className='btnGreen BTN' type='submit' value='enviar' />

                    <input type='hidden' name='idRemitente' value={idRemitente}/>
                    <input type='hidden' name='remitente' value={remitente}/>
                    <input type='hidden' name='idDestinatario' value={idDestinatario}/>
                    <input type='hidden' name='destinatario' value={destinatario} />
                </form>
                <span onClick={()=>{setModalMessage(modalMessage ? false : true)}}className="BtnCerrar1"><img src={cerrarBtn} alt=""/></span>
                </article>
            </div>
        </Fragment>
    )
}
export default FormMessage