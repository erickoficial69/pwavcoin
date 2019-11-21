<<<<<<< HEAD
import React, {useState, useEffect, useLayoutEffect} from'react'
import {updateComent, comentsAdm} from '../../gets_apis/sockets'
import palometa from '../../svg/palometa.svg'
import cerrarDetalles from '../../svg/cerrar.svg'
import Loading2 from '../../components/loading/loading2'
import './resenastabla.css'


const Resenas = ()=>{
        const [limit, setLimit] = useState(10)
        const [loading,setLoading] = useState(true)
        const [wait,setWait] = useState(false)
        const [operador,setOperador] = useState({})
        const [tabla, setTabla] = useState([])

        const update = (e)=>{
            setWait(true)
            const datos = {
                accion:e.target.attributes.accion.value,
                id:e.target.attributes.id.value
            }
            updateComent(setWait,datos)
        }

        useEffect(()=>{
            setOperador(sessionStorage.userSesion?JSON.parse(sessionStorage.userSesion):null)
            comentsAdm(setLoading,setTabla)
        },[limit])

 return operador.rango === 'administrador'?(
        <div className='container'>  
                <h1>Listado de Reseñas</h1>

            <section className="table">
            <div className="thead">
                <h2 className="IDth">ID</h2>
                <h2 className="Fechath">Nombres</h2>
                <h2>Reseña</h2>
                <h2>opciones</h2>
            </div>
            <div className="tbody">
                    { 
                    
                    tabla.map((items,i)=>{ return(
                        <span key={i} className="tr">
                                <div className="td IDtr">
                                    {loading?<Loading2/>:items.id}
                                </div>
                                <div className="td Fechatd">
                                    {loading?<Loading2/>:items.usuario}
                                </div>
                                <div className="td">
                                    <span>
                                        {loading?<Loading2/>:items.resena} 
                                    </span>
                                </div>
                                <p className='status'>
                                   
                                    {loading?<Loading2/>:items.status} 
                                   
                                </p>
                                    {/*botones*/}
                                  
                                        {loading?<Loading2/>:items.status !==0?<img accion='aprobar' id={items.id} onClick={update} src={palometa} />:null} 
                                   
                                   
                                        {loading?<Loading2/>:items.status !==0?<img accion='rechazar' id={items.id} onClick={update} src={cerrarDetalles} />:null} 
                                    
                               
                    </span>
                    )}
                    )
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
import React, {useState, useEffect, useLayoutEffect} from'react'
import {updateComent, comentsAdm} from '../../gets_apis/sockets'
import palometa from '../../svg/palometa.svg'
import cerrarDetalles from '../../svg/cerrar.svg'
import Loading2 from '../../components/loading/loading2'
import './resenastabla.css'


const Resenas = ()=>{
        const [limit, setLimit] = useState(10)
        const [loading,setLoading] = useState(true)
        const [wait,setWait] = useState(false)
        const [operador,setOperador] = useState({})
        const [tabla, setTabla] = useState([])

        const update = (e)=>{
            setWait(true)
            const datos = {
                accion:e.target.attributes.accion.value,
                id:e.target.attributes.id.value
            }
            updateComent(setWait,datos)
        }

        useEffect(()=>{
            setOperador(sessionStorage.userSesion?JSON.parse(sessionStorage.userSesion):null)
            comentsAdm(setLoading,setTabla)
        },[limit])

 return operador.rango === 'administrador'?(
        <div className='container'>  
                <h1>Listado de Reseñas</h1>

            <section className="tableres">
            <div className="theadres">
                <h2 className="IDthres">ID</h2>
                <h2 className="Fechathres">Nombres</h2>
                <h2>Reseña</h2>
                <h2>opciones</h2>
            </div>
            <div className="tbody">
                    { 
                    
                    tabla.map((items,i)=>{ return(
                        <span key={i} className="trres">
                                <div className="tdres IDtrres">
                                    {loading?<Loading2/>:items.id}
                                </div>
                                <div className="tdres Fechatdres">
                                    {loading?<Loading2/>:items.usuario}
                                </div>
                                <div className="tdres">
                                    <span>
                                        {loading?<Loading2/>:items.resena} 
                                    </span>
                                </div>
                                <p className='status'>
                                   
                                    {loading?<Loading2/>:items.status} 
                                   
                                </p>
                                    {/*botones*/}
                                  
                                        {loading?<Loading2/>:items.status !==0?<img accion='aprobar' id={items.id} onClick={update} src={palometa} />:null} 
                                   
                                   
                                        {loading?<Loading2/>:items.status !==0?<img accion='rechazar' id={items.id} onClick={update} src={cerrarDetalles} />:null} 
                                    
                               
                    </span>
                    )}
                    )
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

>>>>>>> b9f86c253df442e9073dcf34875a5fd073257066
export default Resenas