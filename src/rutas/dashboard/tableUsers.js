import React, {Fragment, useState, useEffect} from'react'
import {Link} from 'react-router-dom'
import {getUsers,getUser} from '../../gets_apis/api_sesion'
import palometa from '../../svg/palometa.svg'
import detalles from '../../svg/detalles.svg'
import cerrarDetalles from '../../svg/cerrar.svg'
import advertencia from '../../svg/advertencia.svg'
import enviado from '../../svg/enviado.svg'
import Loading2 from '../../components/loading/loading2'


const TableUsers = ()=>{
        const [users, setUsers] = useState([{}])
        const [limit, setLimit] = useState(10)
        const [loading,setLoading] = useState(true)

        const searchUser=e=>{
            const {value} = e.target
            if(value !== ''){
                getUser(setUsers,value,setLoading)
                return
            }else{
                getUsers(setUsers,setLoading)
            }
            
        }
        useEffect(()=>{
                getUsers(setUsers,setLoading)
        },[limit])
 return(
        <Fragment>  
                <h1>Listado de Usuarios</h1>

                <div className="Buscador">
                <input type="text" placeholder="Insertar ID de usuario" onKeyUp={searchUser} onChange={searchUser}/>
                <a href="#">
                    <img src="img/svg/buscar.svg" alt=""/>
                </a>
            </div>

            <section className="table">
            <div className="thead">
                <h2 className="IDth">ID</h2>
                <h2 className="Fechath">Nombres</h2>
                <h2>correo</h2>
                <h2>DNI/C.I</h2>
                <h2>Detalles</h2>
            </div>
            <div className="tbody">
                    { 
                    users.length > 1?users.map((items,i)=>{ return(
                        <span key={i} className="tr">
                                <div className="td IDtr">
                                    {loading?<Loading2/>:items.idUsuario}
                                </div>
                                <div className="td Fechatd">
                                    {loading?<Loading2/>:items.nombre+' '+items.apellido}
                                </div>
                                <div className="td">
                                    {loading?<Loading2/>:items.correo}
                                </div>
                                <div className="td">
                                    <span>
                                        {loading?<Loading2/>:items.dni} 
                                    </span>
                                </div>
                                
                                    <p className="status">
                                        {loading?<Loading2/>:items.userStatus}
                                    </p>
                            
                                {
                                        loading?<Loading2/>:<Link to={`/Dashboard/User/2`}>
                                            <img src={palometa} alt=""/>
                                        </Link>
                        
                                }
                    
                    </span>
                    )
                }) :<span className="tr">
                <div className="td IDtr">
                    {loading?<Loading2/>:users.idUsuario}
                </div>
                <div className="td Fechatd">
                    {loading?<Loading2/>:users.nombre+' '+users.apellido}
                </div>
                <div className="td">
                    {loading?<Loading2/>:users.correo}
                </div>
                <div className="td">
                    <span>
                        {loading?<Loading2/>:users.dni} 
                    </span>
                </div>
                
                    <p className="status">
                        {loading?<Loading2/>:users.userStatus}
                    </p>
            
                {
                        loading?<Loading2/>:<Link to={`/Dashboard/User/2`}>
                            <img src={palometa} alt=""/>
                        </Link>
        
                }
    
    </span>
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
               onClick={()=>setLimit(limit+10)}>
                  
                  mostrar más</button> 
                 
        </Fragment>   
        ) 
} 

export default TableUsers