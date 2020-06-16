import React, {useState,useLayoutEffect} from'react'
import {updatePedido,pedidosAdministrador} from '../../gets_apis/sockets'
import {downloadPdf} from '../../gets_apis/api_sesion'
import detalles from '../../svg/detalles.svg'
import advertencia from '../../svg/advertencia.svg'
import enviado from '../../svg/enviado.svg'
import Loading2 from '../../components/loading/loading2'

const HistoryOperador = (props)=>{
    const {usuario} = props
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
                    { tabla.map((items,i)=>{
                        if(items.idOperador===usuario.idUsuario){
                            return items.status==='completada'||items.status==='cancelada'||items.status==='rechazada'?(
                                <span key={i} className="tr">
                                        <div className="td IDtr">
                                            {loading?<Loading2/>:items.idPedido}
                                        </div>
                                        <div className="td Fechatd">
                                            {loading?<Loading2/>:items.fechaPedido}
                                        </div>
                                        <div className="td">
                                            {loading?<Loading2/>:items.montoDeposito}
                                        </div>
                                        <div className="td">
                                            <span>
                                                {loading?<Loading2/>:items.montoRetiro} 
                                            </span>
                                        </div>
                                        
                                            <p className="status">
                                                {loading?<Loading2/>:items.status}
                                            </p>
                                    
                                        
           
                                { loading?<Loading2/>:<img  src={detalles} alt="" id="cerrar" onClick={show}/>}
    
                            <div className="tdSub">
                            <article className="DetallesTabla">
                                <div>
                                    <img src={enviado} alt=""/>
                                    <span>
                                        <h3>Orden status: {items.status}</h3>
                                        <p>Id de orden {items.idPedido}</p>
                                    </span>
                                </div>
                                <article className="DatosDetalles">
                                    <div>
                                        <h2>Remitente</h2>
                                        <p>
                                           <span>Tipo Moneda:</span> {items.monedaDeposito}
                                            <br/>
                                            <span>Nombres:</span> {items.nombre} {items.apellido}
                                            <br/>
                                            <span>Doc. Identidad:</span> {items.dni}
                                            <br/>
                                            <span>Correo:</span> {items.correo}
                                            <br/>
                                            <span>Refenecia Deposito:</span> {!items.referenciaDeposito?'Por Definir':items.referenciaDeposito}
                                        </p>
                                    </div>
                                    <img src={advertencia} alt=""/>
                                    <div>
                                        <h2>{items.status==='abierta' || items.status === 'aceptada'?'Cuenta a depositar':'cuenta a recibir'}</h2>
                                        <p>
                                           <span>Pais:</span> {items.paisBanco}
                                            <br/>
                                            <span>Nombres:</span> {items.titular}
                                            <br/>
                                            <span>Doc. Identidad:</span> {items.dniTitular}
                                            <br/>
                                            <span>Banco:</span> {items.banco}
                                            <br/>
                                            <span>Tipo de cuenta:</span>{items.tipoCuenta}
                                            <br/>
                                            <span>Numero de cuenta:</span>{items.numeroCuenta}
                                        </p>
                                    </div>
                                    <span>
                                       <p>
                                            monto: <span>
                                                {items.montoDeposito} {items.monedaDeposito}
                                            </span>
                                        </p>
                                        <p>
                                            Tasa del dia: <span>
                                               {items.tazaCambio}
                                            </span>
                                           
                                        </p>
                                         Operador: <span>
                                            {!items.nombreOperador?' ':items.nombreOperador}
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
                                                {items.montoRetiro} bsf
                                            </span>
                                        </p>                       
                                    </span>
                                </article>
                                <div className="Botones">
                                <p className="btnBlue print" id={items.idPedido} onClick={download}>{!loadPdf?'descargar':'espere'}</p> 
                                </div>
                                
                            </article>
                                </div>
                            </span>
                            ):null
                        }
                         
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

export default HistoryOperador