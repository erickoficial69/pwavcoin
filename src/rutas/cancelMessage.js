import React,{Fragment} from 'react'
import cerrarBtn from '../svg/cerrarBlanca.svg'
import './mensajes.css'

const CancelMassage = (props)=>{
    const {setModal, modal,deletePedido} = props
    const sendStatus = async e =>{
        e.preventDefault()
        deletePedido(props,e.target.mensaje.value,setModal)
    }
    return(
        <Fragment>
            <div id='containerForm'>
            <article className='ConfirmarOrden Cartas'>
                <form onSubmit={sendStatus} >
                    <h2>
                       Desea cancelar la operación?
                    </h2>
                    <div className='CampoFormulario'>
                    <label>
                        Diganos por qué y ayudenos a mejorar
                    </label>
                    <textarea name='mensaje'>
                        
                    </textarea>
                    </div>

                        <input className='btnGreen BTN' type='submit' value='enviar' />
                </form>
                <span onClick={()=>{setModal(modal ? false : true)}}className="BtnCerrar1"><img src={cerrarBtn} alt=""/></span>
                </article>
            </div>
        </Fragment>
    )
}
export default CancelMassage