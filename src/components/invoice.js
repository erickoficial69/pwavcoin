import React from 'react'
import './css.invoice.css'
export default function Invoice({pedido}){
    return <div id="wrapper">
        <div className="headerInvoice">
            <span><img alt="" src="http://vcointransfer.herokuapp.com/static/images/logo_correo.png" /></span>
            <table className="meta">
                <tr>
                    <th><span>Orden #</span></th>
                    <td><span>${pedido.idPedido}</span></td>
                </tr>
                <tr>
                    <th><span>Fecha</span></th>
                    <td><span>${pedido.fechaPedido}</span></td>
                </tr>
            </table>
        </div >
        <article>      
            <table className="inventory">
                <thead>
                    <tr>
                        <th><span>Remitente</span></th>
                        <th><span>${pedido.status==='pagada' || pedido.status==='completada' ?'destinatario':'Cuenta Vcoin'}</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <p>
                                <span>Moneda:</span> ${pedido.monedaDeposito}
                                <br/>
                                <span>Nombres:</span> ${pedido.nombreUsuario}
                                <br/>
                                <span>Doc. Identidad:</span> ${pedido.dniUsuario}
                                <br/>
                                <span>Telefono:</span> ${pedido.telefonoUsuario}
                                <br/>
                                <span>Referencia Deposito:</span> ${pedido.referenciaDeposito?pedido.referenciaDeposito:'por definir'}
                            </p>
                        </td>
                        <td className="Cuentas">
                            <p>
                                <span>Pais:</span> ${pedido.paisVcoin?pedido.paisVcoin:''}
                                <br/>
                                <span>Nombres:</span> ${pedido.titularVcoin?pedido.titularVcoin:''}
                                <br/>
                                <span>Doc. IDENTIDAD</span> ${pedido.dniTitularVcoin?pedido.dniTitularVcoin:''}
                                <br/>
                                <span>Banco:</span> ${pedido.bancoVcoin?pedido.bancoVcoin:''}
                                <br/>
                                <span>Numero de cuenta:</span>
                                ${pedido.nCuentaVcoin?pedido.nCuentaVcoin:''}
                                <br/>
                            </p>
                       </td>
                    </tr>
                    <tr>
                       <td>
                        <table className="Tol">
                <tr>
                    <th className="Cuentas"><span>Monto</span></th>
                    <td><span>${pedido.montoDeposito}</span></td>
                </tr>
                <tr>
                    <th className="Cuentas"><span>Tasa</span></th>
                    <td><span>${pedido.tazaCambio} </span></td>
                </tr>
                <tr>
                    <th className="Cuentas"><span>Operador</span></th>
                    <td><span>${pedido.nombreOperador}</span></td>
                </tr>
            </table>
                   </td>
                   <td>
                       <table>
              
                <tr>
                    <th className="Cuentas"><span>N° Referencia</span></th>
                    <td><span>${pedido.referenciaRetiro?pedido.referenciaRetiro:'por definir'}</span></td>
                </tr>
                <tr>
                    <th className="Cuentas"><span>Total</span></th>
                    <td><span>${pedido.montoRetiro} bsf</span></td>
                </tr>
            </table>
                   </td>
                    </tr>
                </tbody>
            </table>
            <div className="Firmas">
                         <div className="FirmaOperador">
                          <p>Operador:    _______________________</p>
                      </div>
                      <div className="FirmaRemitente">
                          <p>Remitente:    _______________________</p>
                      </div>
            </div>
        </article>
    </div>
}