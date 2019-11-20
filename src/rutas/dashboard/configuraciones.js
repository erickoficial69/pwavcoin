import React, {useEffect,useState,useLayoutEffect} from 'react'
import './user.css'
import {getOneUser,updateOneUser,savePhoto,updatePhoneNumber} from '../../gets_apis/api_sesion'
import seguro from '../../svg/metodoSeguro.svg'
import './configuraciones.css'
import axios from 'axios'
import avatar from '../../svg/usuario.svg'
import Loading2 from '../../components/loading/loading2'

import {servers}from '../../keys'
const {staticServer} = servers

function ProfileSettings(props){
    const {id} = props.match.params
    const [user, setUser] = useState({})
    const [loading,setLoading] = useState(false)
    const [sesion, setSesion] = useState(false)
    
    const updatePersonalInfo = async e =>{
        e.preventDefault()
        if(e.target.idUsuario.value===''||e.target.nombre.value===''||e.target.apellido.value===''||e.target.password.value===''){
            return alert('no deben haber campos vacios')
        }
        const datos ={
            idUsuario:e.target.idUsuario.value,
            nombre:e.target.nombre.value,
            apellido:e.target.apellido.value,
            password:e.target.password.value,
        }
        updateOneUser(datos,setLoading)
        setUser(JSON.parse(sessionStorage.userSesion))
    }
    
    const updatePhoto = async e =>{
        e.preventDefault()
        const photo = new FormData()
        photo.append('photo',e.target.files[0])
        const sendFile = await axios.post(`${staticServer}/upload.php`,photo)
        const result = sendFile.data
        savePhoto(result,id,setLoading,setUser)
        getOneUser(setUser,id,setLoading)
        
    }

    const updatePhone = async e =>{
        const data ={
            numero:e.target.value,
            id:id
        }
        updatePhoneNumber(data,setLoading)
        setTimeout(() => {
            getOneUser(setUser,id,setLoading)
        }, 2000);
        setUser(JSON.parse(sessionStorage.userSesion))
    }

    useLayoutEffect(()=>{
        getOneUser(setUser,id,setLoading)
    },[])
    
    useEffect(()=>{
        setUser(JSON.parse(sessionStorage.userSesion))
        if(sessionStorage.userSesion){
            setSesion(true)
        }else{
            setSesion(false)
        }
    })

    return sesion?(
        <div className='container'>
            <article className="Configuracion Cartas">
        <h1>configurar cuenta</h1>
        <div className="ActualizarDatos">
          
            <div className="Foto1">
                {!loading?<img src={user.foto?staticServer+user.foto:avatar} alt=""/>:<Loading2 />}
                {
                    loading?<Loading2 />:<div className="Subir">
                    <input type="file" name='foto' onChange={updatePhoto}/>
                </div>
                }
           
            </div>
            <form onSubmit={updatePersonalInfo}>
                <div className="CampoFormulario">
                    <label className="Requerido"> Nombres </label>
                    <input type="text" name='nombre' defaultValue={user.nombre}/>
                </div>
                <div className="CampoFormulario">
                    <label className="Requerido"> apellidos </label>
                    <input type="text" name='apellido' defaultValue={user.apellido}/>
                </div>
                <div className="CampoFormulario">
                    <label className="Requerido"> Contraseña actual </label>
                    <input type="text" name='password' defaultValue={user.password}/>
                </div>
                <input type='hidden' name='idUsuario' value={user.idUsuario} />
                <input className="btnGreen BTN" type="submit" value="Actualizar"/>
            </form>
        </div>
        <h2>Datos de contacto</h2>
        <div>
          <div className="VerificarDatos">
            <form >
                <div className="CampoFormulario">
                    <label className="Requerido"> numero de telefono </label>
                    {loading?<label>actualizando...</label>:null}
                   <input type="text" name='numero' defaultValue={user.telefono} onKeyUp={updatePhone} onChange={updatePhone}/>
                   
                </div>
                <div className="CampoFormulario">
                    <label className="Requerido"> Correo Electronico </label>
                    <input className="CorreoDenegado" type="text" defaultValue={user.correo} readOnly/> 
                </div>
                <input className="btnGreen BTN" type="submit" value="Actualizar"/>
                {/* <div className="CampoFormulario">
                    <label className="Requerido"> Documento de identidad </label>
                    <input type="file" name='dniFile'/>
                </div>
                <div className="CampoFormulario">
                    <label className="Requerido"> Comprobante de direccion fiscal </label>
                    <input type="file" name='addressFile'/>
                </div>
                 */}
            </form>
            <div className="Foto2">
               <img  src={seguro} alt=""/>
           </div>
            </div>
            
        </div>
        </article>
        </div>
    ):null
}
export default ProfileSettings