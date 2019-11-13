import React, {Fragment, useState, useEffect} from 'react'
import {getBanks, deleteBank} from '../../gets_apis/api_sesion'
import './bankAcounts.css'
import cerrarBtn from '../../svg/cerrarBlanca.svg'


function BankAcount(){
    const [banks, setBanks] = useState(false)
    const [load,setLoad] = useState('')
    useEffect(()=>{
        const getUser = JSON.parse(sessionStorage.userSesion)
        getBanks(setBanks,getUser.idUsuario,setLoad)
    },[])

    return !banks ?(
        <h1>Loading</h1>
    ):(
        <Fragment>
            <div className='container'>
            <h1>Cuentas Bancarias</h1>
        <section className="CuentasBancarias">
            
            {
               !load?banks.map((items, i)=><article key={i} className="DatosBancarios Cartas">
               <h2>{items.banco}</h2>
               <p>
                   <span>titular:</span> {items.titular}
                   <br/>
                   <span>C.I:</span> {items.dniTitular}
                   <br/>
                   <span>Banco:</span> {items.banco}
                   <br/>
                   <span>Tipo de Cuenta:</span> {items.tipoCuenta}
                   <br/>
                   <span>Numero de Cuenta:</span> {items.numeroCuenta}
               </p>
               <span onClick={()=>deleteBank(items.id)} className="BtnCerrar"><img src={cerrarBtn} alt=""/></span>
           </article>):null
            }
            </section>
            </div>        
        </Fragment>
    )
}

export default BankAcount