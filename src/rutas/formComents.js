import React,{Fragment,useEffect,useState} from 'react'
import cerrarBtn from '../svg/cerrarBlanca.svg'
import {sendComent} from '../gets_apis/sockets'
const datosFecha = new Date()
const fecha ={
  
    fecha:datosFecha.toLocaleDateString()
}
const FormComents = (props)=>{
    const {setModalComents, modalComents} = props
    const [user,setUser] = useState({})
    const [loading,setLoading] = useState(false)

    const captureMessage= async e =>{
        e.preventDefault()
        const {idRemitente,mensaje} = e.target
        const message={
            idRemitente:idRemitente.value,
            mensaje:mensaje.value,
            fecha:fecha.fecha,
            statusResena:'nueva'
        }
        sendComent(message,setLoading,setModalComents)
    }
useEffect(()=>{
    setUser(sessionStorage.userSesion?JSON.parse(sessionStorage.userSesion):{})
},[])
    return(
        <Fragment>
            <div id='containerForm'>
                <article className='ConfirmarOrden Cartas'>
                <form onSubmit={captureMessage}>
                    <div className='CampoFormulario'>
                    <h2>
                       Dejanos tu comentario
                    </h2>
                   
                    </div>
                    <div className='CampoFormulario'>
                    <label>
                        Mensaje
                    </label>
                    {!loading?<textarea name='mensaje'>

                    </textarea>:null}
                    </div>

                        <input className='btnGreen BTN' type='submit' value='enviar' />

                        {!loading?<input type='hidden' name='idRemitente' value={user.idUsuario}/>:null}
                </form>
                <span onClick={()=>{setModalComents(modalComents ? false : true)}}className="BtnCerrar1"><img src={cerrarBtn} alt=""/></span>
                </article>
            </div>
        </Fragment>
    )
}
export default FormComents