import React,{useEffect,useState} from'react'
import TazaActual from './tazaActual'
import './dashboard.css'

import PedidosAdm from './pedidosAdm'
import PedidosCliente from './pedidosCliente'
import PedidosOperador from './pedidosOperador'

function Dashboard(){
  const [typeUser, setTypeUser] = useState(false)
  const [sesion,setSesion] = useState(false)
   
useEffect(()=>{
    const user = JSON.parse(sessionStorage.userSesion)
    user ? setSesion(true):setSesion(false)
    setTypeUser(user)
},[])
    return sesion ? (
      <div className='container scroll'>
              <TazaActual typeUser={typeUser}/>
              {
                typeUser.rango === 'administrador' ?(
                  <PedidosAdm typeUser={typeUser}/>
                ): typeUser.rango === 'cliente' ?(
                  <PedidosCliente typeUser={typeUser}/>
                ):typeUser.rango==='corresponsal'?(
                  <PedidosOperador typeUser={typeUser}/>
                ):null
              }
      </div>
  
    ):null  

} 

export default Dashboard