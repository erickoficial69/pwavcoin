import React, {Fragment, useState, useEffect} from'react'
import {Link} from 'react-router-dom'
import {updatePedido,deletePedido,pedidos} from '../../gets_apis/sockets'
import {downloadPdf} from '../../gets_apis/api_sesion'
import palometa from '../../svg/palometa.svg'
import detalles from '../../svg/detalles.svg'
import cerrarDetalles from '../../svg/cerrar.svg'
import advertencia from '../../svg/advertencia.svg'
import enviado from '../../svg/enviado.svg'
import waiting from '../../svg/esperar.svg'
import Loading2 from '../../components/loading/loading2'
import CancelMessage from '../cancelMessage'

import Invoice from '../../components/invoice'
import {PDFDownloadLink} from '@react-pdf/renderer'

const PedidosCliente = (props)=>{
    
        const {typeUser} = props
        const [tabla, setTabla] = useState([{}])
        const [limit, setLimit] = useState(31)
        const [loading,setLoading] = useState(true)
        const [modal,setModal] = useState(false)
        const [loadPdf, setLoadPdf] = useState(false)

       const showModal = e =>{
            if(e.target.attributes.status.textContent === 'cancelada'){
                
                setModal(true)
                return 
            }else{
                updatePedido(e.target.attributes)
            }
            
            return
        }
       const download=async(e)=>{
        setLoadPdf(true)
        downloadPdf(e,setLoadPdf)
        }
       const show = e =>{
           e.target.classList.toggle('detalles')
       }

        useEffect(()=>{
                pedidos(typeUser.idUsuario,setTabla,limit,setLoading)
        },[limit,typeUser.idUsuario])
 return(
        <Fragment>  
            
                <h1>Ultimos pedidos</h1>
                
        <section className="table">
            <div className="thead">
                <h2 className="IDth">ID</h2>
                <h2 className="Fechath">Fecha</h2>
                <h2>Monto</h2>
                <h2>Destino</h2>
                <h2>Detalles</h2>
            </div>
            <div className="tbody">
                    { tabla.map((pedido,i)=>{
                        
                         return pedido.status==='pagada'||pedido.status==='abierta'||pedido.status==='aceptada'?(
                            <span key={i} className="tr">
                                    <div className="td IDtr">
                                        {loading?<Loading2/>:pedido.idPedido}
                                    </div>
                                    <div className="td Fechatd">
                                        {loading?<Loading2/>:pedido.fechaPedido}
                                    </div>
                                    <div className="td">
                                        {loading?<Loading2/>:pedido.montoDeposito}
                                    </div>
                                    <div className="td">
                                        <span>
                                            {loading?<Loading2/>:pedido.montoRetiro} 
                                        </span>
                                    </div>
                                     <p className="status">
                                            {loading?<Loading2/>:pedido.status}
                                    </p>
                                
                                    {
                                        pedido.status === 'aceptada'?(
                                            loading?<Loading2/>:<Link to={`/Dashboard/VerifyOrder/${pedido.idPedido}/${pedido.idUsuario}`}>
                                                <img src={palometa} alt=""/>
                                            </Link>
                                        ):pedido.status==='pagada'?(
                                            <img src={waiting} alt='esperando por administrador'/>
                                        ):pedido.status==='abierta'?(
                                            <img src={waiting} alt='esperando '/>
                                            ):null
                                    }
                                    
                                    {
                                        pedido.status !=='pagada'?(
                                            loading?<Loading2/>:
                                            <Fragment>
                                                <img onClick={showModal}
                                                src={cerrarDetalles}
                                                status='cancelada'
                                            alt=""/>
                                            
                                            {modal?<CancelMessage
                                                modal={modal}
                                                setModal={setModal}
                                                deletePedido={deletePedido}
                                                sesionUser={typeUser}

                                                idPedido={pedido.idPedido}
                                                status='cancelada'
                                                
                                                />:null} 
                                            </Fragment>
                                             
                                            
                                        ):null
                                    }
       
                            { loading?<Loading2/>:<img  src={detalles} alt="" id="cerrar" onClick={show}/>}

                        <div className="tdSub">
                        <article className="DetallesTabla">
                            <div>
                                <img src={enviado} alt=""/>
                                <span>
                                    <h3>Orden status: {pedido.status}</h3>
                                    <p>Id de orden {pedido.idPedido}</p>
                                </span>
                            </div>
                            <article className="DatosDetalles">
                                <div>
                                    <h2>Remitente</h2>
                                    <p>
                                       <span>Tipo Moneda:</span> {pedido.monedaDeposito}
                                        <br/>
                                        <span>Nombres:</span> {pedido.nombre} {pedido.apellido}
                                        <br/>
                                        <span>Doc. Identidad:</span> {pedido.dni}
                                        <br/>
                                        <span>Correo:</span> {pedido.correo}
                                        <br/>
                                        <span>Refenecia Deposito:</span> {!pedido.referenciaDeposito?'Por Definir':pedido.referenciaDeposito}
                                    </p>
                                </div>
                                <img src={advertencia} alt=""/>
                                <div>
                                    <h2>{pedido.status==='abierta' || pedido.status === 'aceptada'?'Cuenta a depositar':'cuenta a recibir'}</h2>
                                    <p>
                                       <span>Pais:</span> {pedido.paisBanco}
                                        <br/>
                                        <span>Nombres:</span> {pedido.titular}
                                        <br/>
                                        <span>Doc. Identidad:</span> {pedido.dniTitular}
                                        <br/>
                                        <span>Banco:</span> {pedido.banco}
                                        <br/>
                                        <span>Tipo de cuenta:</span>{pedido.tipoCuenta}
                                        <br/>
                                        <span>Numero de cuenta:</span> {pedido.numeroCuenta}
                                    </p>
                                </div>
                                <span>
                                   <p>
                                        monto: <span>
                                            {pedido.montoDeposito} {pedido.monedaDeposito}
                                        </span>
                                    </p>
                                    <p>
                                        Tasa del dia: <span>
                                           {pedido.tazaCambio}
                                        </span>
                                       
                                    </p>
                                    <p>
                                     Operador: <span>
                                        {!pedido.nombreOperador?' ':pedido.nombreOperador}
                                        </span>
                                        </p>
                                </span>
                                <br/>
                                <span>
                                   <p>
                                   referencia bancaria: <span>
                                   {
                                    pedido.referenciaRetiro?pedido.referenciaRetiro:'por definir'
                                    }
                                        </span>
                                    </p>
                                    <p>
                                        total recibir: <span className="TotalDestino">
                                            {pedido.montoRetiro} bsf
                                        </span>
                                    </p>                       
                                </span>
                            </article>
                            
                            <div className="Botones">

                            <PDFDownloadLink
                            className="btnBlue"
                            style={
                                {
                                    margin:'10px 5px 0px 0px',
                                    fontSize:'14px'
                                }
                            }
                            document={<Invoice pedido={pedido} />} fileName="pedido.pdf">
                            {({ blob, url, loading, error }) =>
                                loading ? 'Loading...' : 'Imprimir'
                            }
                            </PDFDownloadLink>

                            </div>
                            
                        </article>
                            </div>
                        </span>
                        ):null
                    })
                        
                    }
              </div>
              
        </section> 
        <button
              style={
                  {
                      
                      margin:'3vmin',
                  }
              }
              className='btnBlue'
               onClick={()=>setLimit(limit+31)}>
                  
                  mostrar más</button> 
                 
        </Fragment>   
        ) 
} 

export default PedidosCliente