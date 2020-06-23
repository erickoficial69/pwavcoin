import React, {useState,useLayoutEffect} from'react'
import {updatePedido,pedidosAdministrador} from '../../gets_apis/sockets'
import {downloadPdf} from '../../gets_apis/api_sesion'
import detalles from '../../svg/detalles.svg'
import advertencia from '../../svg/advertencia.svg'
import enviado from '../../svg/enviado.svg'
import Loading2 from '../../components/loading/loading2'

import Invoice from '../../components/invoice'
import {PDFDownloadLink} from '@react-pdf/renderer'

const HistoryClient = (props)=>{
    const [tabla, setTabla] = useState([{}])
    const [limit, setLimit] = useState(31)
    const [loading,setLoading] = useState(true)
    const [loadPdf, setLoadPdf] = useState(false)

    const download=async(e)=>{
        setLoadPdf(true)
        downloadPdf(e,setLoadPdf)
        }
       const show = e =>{
           e.target.classList.toggle('detalles')
       }
    useLayoutEffect(()=>{
        pedidosAdministrador(setTabla,limit,setLoading)
    },[limit])

      return(
          <div className='container'>
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
                        
                         return pedido.status==='completada'||pedido.status==='cancelada'||pedido.status==='rechazada'?(
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
                                        Taza del dia: <span>
                                           {pedido.tazaCambio}
                                        </span>
                                       
                                    </p>
                                     Operador: <span>
                                        {!pedido.nombreOperador?' ':pedido.nombreOperador}
                                        </span>
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

          </div>
      )
} 

export default HistoryClient