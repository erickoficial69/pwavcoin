import React, {useState, useEffect, Fragment, useLayoutEffect} from'react'
import {Link} from 'react-router-dom'
import {pedidos,pedidosAdministrador,updatePedido} from '../../gets_apis/sockets'
import palometa from '../../svg/palometa.svg'
import cerrar from '../../svg/cerrar.svg'
import contrato from '../../svg/contrato.svg'



function Pedidos(){
  const [user, setUser] = useState(false)
  const [pedidosr, setPedidos] = useState([{}])
  const [limit, setLimit] = useState(4)
  const [table,setTable] = useState()
    
 /*  const update = e =>{
    e.preventDefault()
    window.confirm('Desea seguir con la operacion?')
    return updatePedido(e.target.attributes)
  } */
  const mostrar = e => console.log(table)

  useLayoutEffect(()=>{
      const userget = JSON.parse(sessionStorage.userSesion)
      setTable(document.querySelector('#test'))
      setUser(userget)
      userget.rango === 'administrador' ? pedidosAdministrador(setPedidos,limit) : pedidos(userget.correo,setPedidos)
     
    },[])

    return(
      <Fragment>
          <h1>ultimas ordenes div</h1>

  <table>
                <thead>
                    <tr>
                        <th colSpan="1">
                            Id de orden</th>
                        <th colSpan="1">
                            fecha</th>
                        <th colSpan="1">
                            Monto</th>
                        <th colSpan="1">
                            destino</th>
                        <th colSpan="1">
                            Detalles</th>
                    </tr>
                </thead>
                <tbody >
                    {
                      pedidosr.map((items,i)=>{
                        return items.status !== 'rechazada' ?(
                          <Fragment>
                            <tr key={i} onClick={mostrar} >
                        <td>
                            {items.id}
                        </td>
                        <td>
                            {items.fechaPedido}
                        </td>
                        <td>
                            {items.montoDeposito} {items.monedaDeposito}
                        </td>
                        <td>
                            <span>
                                {items.montoRetiro}
                            </span>
                            <span>
                                {items.nombreBeneficiario}
                            </span>
                        </td>
                        <td>
                        <p>
                            {items.status}
                        </p>
                        <div>
                            <img src={palometa} alt=""/>
                        </div>
                        <div>
                            <img src={cerrar} alt=""/>
                        </div>
                        <div>
                            <img src={contrato} alt=""/>
                        </div>
                        </td>
                    </tr>
                    <tr id='test'>
                        <td colSpan="5">
                            
                            <article className="DatosBancarios">
                                <p>
                                    <span>Nombres:</span> {items.nombreRemitente}
                                    <br/>
                                    <span>Correo:</span> {items.correoRemitente}
                                    <br/>
                                    <span>C.I:</span> {items.montoDeposito}
                                    <br/>
                                    <span>Banco:</span> 
                                    <br/>
                                    <span>Tipo de Cuenta:</span> {items.monedaRetiro}
                                    <br/>
                                    <span>Numero de Cuenta:</span> {items.montoRetiro}
                                </p>
                            </article>
                            
                        </td>
                    </tr>
                          </Fragment>
                        ):null
                      })
                    }
                </tbody>
            </table>
  
    <Link to='/dashboard/pedidos' className='btnBlue'>Ver mas</Link>

      </Fragment>
  
    )
} 

export default Pedidos