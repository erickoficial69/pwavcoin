<<<<<<< HEAD
import React, {useState, useEffect, useLayoutEffect} from'react'
import {Link} from 'react-router-dom'
import {getUsers,getUser} from '../../gets_apis/api_sesion'
import detalles from '../../svg/detalles.svg'
import Loading2 from '../../components/loading/loading2'
import {FormRegisterUser} from '../../sesiones/formControl'


const Users = ()=>{
        const [users, setUsers] = useState([{}])
        const [limit, setLimit] = useState(10)
        const [loading,setLoading] = useState(true)
        const [modalReg, setModalReg] = useState(false)
        const [operador,setOperador] = useState({})

        const searchUser=e=>{
            const {value} = e.target
            if(value !== ''){
                getUser(setUsers,value,setLoading)
                return
            }else{
                getUsers(setUsers,setLoading)
            }
            
        }
        useLayoutEffect(()=>{
            setOperador(sessionStorage.userSesion?JSON.parse(sessionStorage.userSesion):null)
            getUsers(setUsers,setLoading)
        },[limit])

 return operador.rango === 'administrador' || operador.rango === 'corresponsal'?(
        <div className='container'>  
                <h1>Listado de Usuarios</h1>
                <button className='btnBlue' onClick={()=>setModalReg(true)} >Registrar nuevo usuario</button>
                {
                    modalReg?
                        <FormRegisterUser modalReg={modalReg} setModalReg={setModalReg} idOperador={operador.idUsuario}/>:
                    null
                }
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
                    
                    users.map((items,i)=>{ return items.idOperador === operador.idUsuario?(
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
                                        loading?<Loading2/>:<Link to={`/Dashboard/User/${items.idUsuario}`}>
                                            <img src={detalles} alt=""/>
                                        </Link>
                        
                                }
                    
                    </span>
                    ) : operador.rango==='administrador'?(
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
                                        loading?<Loading2/>:<Link to={`/Dashboard/User/${items.idUsuario}`}>
                                            <img src={detalles} alt=""/>
                                        </Link>
                        
                                }
                    
                    </span>
                    ) :null
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
               onClick={()=>setLimit(limit+10)}>
                  
                  mostrar más</button> 
                 
        </div>   
        ) : <div className='container'><h1>No autorizado</h1></div>
} 

=======
import React, {useState, useEffect} from'react'
import {Link} from 'react-router-dom'
import {getUsers,getUser} from '../../gets_apis/api_sesion'
import detalles from '../../svg/detalles.svg'
import Loading2 from '../../components/loading/loading2'
import {FormRegisterUser} from '../../sesiones/formControl'


const Users = ()=>{
        const [users, setUsers] = useState([{}])
        const [limit, setLimit] = useState(10)
        const [loading,setLoading] = useState(true)
        const [modalReg, setModalReg] = useState(false)
        const [operador,setOperador] = useState({})

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
            setOperador(sessionStorage.userSesion?JSON.parse(sessionStorage.userSesion):null)
            getUsers(setUsers,setLoading)
        },[limit])
 return (
        <div className='container'>  
                <h1>Listado de Usuarios</h1>
                <button className='btnBlue' onClick={()=>setModalReg(true)} >Registrar nuevo usuario</button>
                {
                    modalReg?
                        <FormRegisterUser modalReg={modalReg} setModalReg={setModalReg} idOperador={operador.idUsuario}/>:
                    null
                }
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
                    
                    users.map((items,i)=>{ return items.idOperador === operador.idUsuario?(
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
                                        loading?<Loading2/>:<Link to={`/Dashboard/User/${items.idUsuario}`}>
                                            <img src={detalles} alt=""/>
                                        </Link>
                        
                                }
                    
                    </span>
                    ) : operador.rango==='administrador'?(
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
                                        loading?<Loading2/>:<Link to={`/Dashboard/User/${items.idUsuario}`}>
                                            <img src={detalles} alt=""/>
                                        </Link>
                        
                                }
                    
                    </span>
                    ) :null
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
               onClick={()=>setLimit(limit+10)}>
                  
                  mostrar más</button> 
                 
        </div>   
        ) 
} 

>>>>>>> 4db5092d6467c836177423a26bfe47beb4295217
export default Users