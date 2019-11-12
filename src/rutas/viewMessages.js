import React,{Fragment,useState,useEffect} from 'react'
import cerrarBtn from '../svg/cerrarBlanca.svg'
import './mensajes.css'
import mostrarM from '../svg/mostrar.svg'
import eliminarM from '../svg/eliminar.svg'

const ViewMessages = (props)=>{
    const {setModalViewMessage, modalViewMessage, message,user,updateMessage, deleteMessage, setCount,setMessage} = props
    const [tabla,setTabla] = useState([])

    const show = e =>{
        e.target.classList.toggle('detallesM')
        const datos={
            correo:user.correo,
            mensajeStatus:'visto',
            idUsuario:e.target.attributes.iddestinatario.value
        }
        if(e.target.attributes.mensajeStatus.value==='visto'){
            return
        }
        if(e.target.attributes.mensajeStatus.value==='nuevo'){
            return updateMessage(datos)
        }
       
    }
    const deleteM = async e =>{
        deleteMessage(user,setMessage,setCount,e.target.attributes.iddestinatario.value)
    }
    useEffect(()=>{
        setTabla(message)
    })
    return(
        <Fragment>
            <div id='containerForm'>
                
            <section class="tableM">
                <div class="theadM">
                    <h2>Mensajes</h2>
                </div>
            <div className="tbodyM">
                    { tabla.map((items,i)=>{
                        return(
                            <span key={i} className="trM">
                                    <div class="tdM">
                            {items.fecha}
                        </div>
                        <div class="tdM">
                            {items.titulo}
                        </div>
                        
                            <img src={mostrarM} alt="" id="cerrar" mensajeStatus={items.mensajeStatus} iddestinatario={items.idDestinatario} onClick={show}/>

                            <img onClick={deleteM} iddestinatario={items.idDestinatario} src={eliminarM} alt="" id="cerrar" />
                        <div className="tdSubM">
                        <article className="DetallesTablaM">
                        <p>
                        {items.mensaje}    
                        </p>
                        <span className="FirmaM">Atentamente: {items.remitente}</span>
                        
                        </article>
                            </div>
                        </span>
                        )
                    })
                        
                    }
                    <span onClick={()=>{setModalViewMessage(modalViewMessage ? false : true)}}className="BtnCerrar1"><img src={cerrarBtn} alt=""/></span>
              </div>
              
        </section>
            </div>
        </Fragment>
    )
}
export default ViewMessages