import React, {useState, useEffect} from 'react'
import './or.css'
import cont from '../../../svg/contrato.svg'
import {updatePedido,updatePedidoAdm} from '../../../gets_apis/sockets'
import {getBanks,getPedido, downloadPdf} from '../../../gets_apis/api_sesion'
import {Redirect} from 'react-router-dom'

const VerifyOrder = (props)=>{
    const {item,rank,idUser} = props.match.params
    const [load, setLoad] = useState(true)
    const [banks, setBanks] = useState([{}])
    const [pedido,setPedido] = useState({})
    const [verify,setVerify]=useState('')

    const confirmar = e =>{
        e.preventDefault()
        if(e.target.referenciaDeposito.value === ''){
            return alert('llene el deposito')
        }
        if(e.target.idBanco.value === ''){
            return alert('llene el banco')
        }
        updatePedido(e.target,pedido,setVerify)
        return
    }
    const confirmaradm = e =>{
        e.preventDefault()
        if(e.target.referenciaRetiro.value === ''){
            return alert('llene el retiro')
        }
        updatePedidoAdm(e.target,pedido,setVerify)
        return
    }

    const download=async(e)=>{
          downloadPdf(e)
        }

useEffect(()=>{
    getBanks(setBanks,idUser,setLoad)
    getPedido(item,setPedido,setLoad)
},[item,idUser])

    return rank===undefined?(
        <div className='container' >
            <h1>Verificar orden #{item}</h1>
            
            <article className="VerificarOrden Cartas">
            <h2>Transferencia Bancaria</h2><br/>
            <form onSubmit={confirmar}>
            <div className="CampoFormulario">
                <label className='Requerido'>Numero de confirmación bancaria:</label>
                <input type="text" name='referenciaDeposito' placeholder="Numero de referencia" defaultValue=''/>
            </div>
                
                <div class="CampoFormulario">
                <label className='Requerido'>Banco Beneficiario:</label>
                    <select name='idBanco'>
                        <option value=''>Seleccione</option>
                        {
                            banks.map(bank=>{return(
                                <option value={bank.id}>{bank.banco+'=>'+bank.paisBanco}</option>
                            )})
                        }
                    </select>
                </div>

                <input type='hidden' name='status' value='pagada'/>
                <input type='hidden' name='idPedido' value={item}/>
            <input
                className={!load?'btnGreen BTN':'btnRed BTN'} 
                type='submit' value={!load?'Enviar Comprobante':'cargando'} disabled={!load?'':'disabled'} />
             
        </form>

        <h3>Para Depositos en efectivo</h3>
            {/* <button className="BtnDescarga"><img src={desc} alt="Descargar libreta" /><label>Imprimir libreta</label> </button> */}
                <button className={!load?'btnBlue BTN':'btnRed BTN'} id={item} onClick={download} disabled={!load?'':'disabled'} >
                    descargar libreta
                </button>
        </article>
        {verify==='ok'?<Redirect to='/Dashboard'/>:null}
        </div>
    ):rank ==='administrador'?(
        <div className='container' >
        <h1>Verificar orden #{item}</h1>
            <article class="VerificarOrden">
            <h2>Transferencia Bancaria</h2><br/>
            {idUser}
            <form onSubmit={confirmaradm} >

            <div className="CampoFormulario">
                <label className='Requerido'>Numero de confirmación bancaria:</label>
                <input type="text" name='referenciaRetiro' placeholder="Numero de referencia" defaultValue=''/>
                <input type="hidden" name='status'  value='completada'/>
                <input type="hidden" name='id'  value={item}/>
            </div>
            <input
                className='btnGreen BTN' 
                type='submit' value='Terminar' />
    </form>
    </article>
    {verify==='ok'?<Redirect to='/Dashboard'/>:null}
    </div>       
    ):null
}

export default VerifyOrder