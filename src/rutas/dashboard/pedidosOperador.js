import React, {Fragment, useState, useEffect} from'react'
import {Link} from 'react-router-dom'
import {updatePedidoAdm,pedidosAdministrador,deletePedido} from '../../gets_apis/sockets'
import {downloadPdf} from '../../gets_apis/api_sesion'
import palometa from '../../svg/palometa.svg'
import detalles from '../../svg/detalles.svg'
import cerrarDetalles from '../../svg/cerrar.svg'
import advertencia from '../../svg/advertencia.svg'
import enviado from '../../svg/enviado.svg'
import waiting from '../../svg/esperar.svg'
import Loading2 from '../../components/loading/loading2'
import CancelMessage from '../cancelMessage'

const PedidosAdm = (props)=>{
    const [tabla, setTabla] = useState([{}])
    const [status,setStatus] = useState('abierta')
    const [limit,setLimit] = useState(31)
    const [loading,setLoading] = useState(true)
    const [modal,setModal] = useState(false)
    const [loadPdf, setLoadPdf] = useState(false)
    const {typeUser} = props

    const showModal = e =>{
        if(e.target.attributes.status.textContent === 'rechazada'){
            
            setModal(true)
            return 
        }else{
            updatePedidoAdm(e.target.attributes)
           
           }
           return
       }

       const show = e =>{
           e.target.classList.toggle('detalles')
       }

       const download=async(e)=>{
        setLoadPdf(true)
        downloadPdf(e,setLoadPdf)
        }
       
        useEffect(()=>{
            pedidosAdministrador(setTabla,limit,setLoading)
        },[limit])
 return(
    <Fragment>  
    <h1>Ultimos pedidos</h1>
    {loading === 'cargando' ? ''
            :(
                <Fragment>
                    <div className='btnsTabla'>
                        <button className={status==='abierta'?'btnGreen':'btnBlue'} onClick={()=>setStatus('abierta')}>Abiertas</button>
                        <button className={status==='aceptada'?'btnGreen':'btnBlue'} onClick={()=>setStatus('aceptada')}>Aceptadas</button>
                        <button className={status==='pagada'?'btnGreen':'btnBlue'} onClick={()=>setStatus('pagada')}>pagadas</button>
                        <button className={status==='completada'?'btnGreen':'btnBlue'} onClick={()=>setStatus('completada')}>completadas</button>
                    </div>
                    
                </Fragment>
            )
        }
    <section className="table">
        
<div className="thead">
    <h2 className="IDth">ID</h2>
    <h2 className="Fechath">Fecha</h2>
    <h2>Monto</h2>
    <h2>Destino</h2>
    <h2>Detalles</h2>
</div>
<div className="tbody">
        {
            tabla.map((pedido,i)=>{
                return pedido.idOperador===typeUser.idUsuario && pedido.status === status?(
                        <span key={i} className="tr">
                            <div className="td IDtr">
                                {loading?<Loading2/>:pedido.idPedido}
                            </div>
                            <div className="Fechatd td">
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
                            pedido.status==='pagada'?(
                                <img  src={waiting} alt="espera"/>
                            ):status==='abierta'?(
                                loading?<Loading2/>:
                                <Fragment>
                                    <img onClick={showModal}
                                                src={palometa}
                                                id={pedido.idPedido}
                                                status='aceptada'
                                                idoperador={!pedido.idOperador?0:pedido.idOperador}
                                                nombreoperador={!pedido.nombreOperador?' ':pedido.nombreOperador}
                                                correooperador={!pedido.correoOperador?' ':pedido.correoOperador}
                                                idusuario={typeUser.idUsuario}
                                                correousuario={typeUser.correo}
                                                nombreusuario={typeUser.nombre+' '+typeUser.apellido}
                                            alt="aceptar"/>
                                                <img onClick={showModal}
                                                src={cerrarDetalles}
                                                status='rechazada'
                                            alt="rechazar"/>
                                            
                                            {modal?<CancelMessage
                                                modal={modal}
                                                setModal={setModal}
                                                deletePedido={deletePedido}
                                                sesionUser={typeUser}

                                                idPedido={pedido.idPedido}
                                                status='rechazada'
                                                
                                                />:null} 
                                            </Fragment>
                            ):status==='aceptada'?(
                                <Link to={`/Dashboard/VerifyOrder/${pedido.idPedido}/${pedido.idUsuario}`}>
                                <img src={palometa} alt=""/>
                            </Link>
                            ):
                            <img onClick={showModal}
                            src={palometa}
                            id={pedido.idPedido}
                            status='completada'
                        alt="completar"/>
                    } 
                    
                
                {loading?<Loading2/>:<img  src={detalles} onClick={show} alt=""
                    id="cerrar" />}
                

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
                                <span>Correo:</span> {pedido.correo}<br/>
                                <span>Referencia deposito:</span> {pedido.referenciaDeposito}
                            </p>
                        </div>
                        <img src={advertencia} alt=""/>
                        <div>
                            <h2>{pedido.status==='abierta' || pedido.status==='aceptada'?'Cuenta Vcoin':'Cuenta destinatario'}</h2>
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
                                <span>Numero de cuenta:</span>{pedido.numeroCuenta}
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
                                   {pedido.nombreOperador}
                                </span>
                            </p>
                        </span>
                        <br/>
                        <span>
                           <p>
                           referencia bancaria: <span>
                                   Definir por administrador
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
                    <p className="btnBlue print" id={pedido.idPedido} onClick={download}>{!loadPdf?'descargar':'espere'}</p>
                    </div>
                    
                </article>
                    </div>
                </span>
                ):null
            })
                
        }
  </div>
</section> 
<button className='btnBlue' onClick={()=>setLimit(limit+31)}>mas</button>      
</Fragment>   
        ) 
} 

export default PedidosAdm