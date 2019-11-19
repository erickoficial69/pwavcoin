import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {addBank, imgPaises} from '../../../gets_apis/api_sesion'
import Loading from '../../../components/loading'
import './addBanks.css'

function Redir(){
    return<Redirect to='/Dashboard'/>
}
const AddBanks = (props)=>{
    const {propietario} = props.match.params
    const [usuario, setUsuario] = useState(false)
    const [loading, setLoading] = useState('')
    const [paises,setPaises] = useState([{}])

    const add = async e =>{
        
        e.preventDefault()
        const {paisBanco, banco, tipoCuenta, numeroCuenta, idUsuario, titular, dniTitular, nacional} = e.target
        const data = {
            paisBanco: paisBanco.value,
            banco: banco.value, 
            tipoCuenta: tipoCuenta.value, 
            numeroCuenta: numeroCuenta.value,
            idUsuario: idUsuario.value,
            titular:titular.value,
            dniTitular:dniTitular.value,
            nacional:nacional.value 
        }
        
        if(nacional.value === '' || paisBanco.value === '' || banco.value === '' || tipoCuenta.value === '' || numeroCuenta.value === '' || idUsuario.value === '' || dniTitular.value === '' || titular.value === ''){
            alert('Debes llenar todos los campos')
            return
        }else{
            await setLoading('cargando')
            await addBank(data,setLoading) 
        }
    }
    useEffect(()=>{
        const getUser = JSON.parse(sessionStorage.userSesion)
        setUsuario(getUser)
        imgPaises(setPaises)
    },[])
    if(sessionStorage.userSesion){
        return(
            <div className='container'>
                <article class="AgregarBanco Cartas">
                <h2>Informacion de de cuenta</h2><br/>
                <form class="AgregarBancoForm" onSubmit={add}>
                    <div class="CampoFormulario">
                        <label class="Requerido">Nombre del Titular:</label>
                        <input required name='titular' type="text" placeholder="Nombre y apellido"/>
                    </div>
                    <div class="CampoFormulario">
                        <label class="Requerido">Pais:</label>
                        <select required name="paisBanco">
                            <option value=''>Seleccione pais</option>
                            {
                                paises.map((items,i)=>{
                                    return(
                                        <option value={items.nombre}>{items.nombre}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div class="CampoFormulario">
                        <label>Nacional/extranjero:</label>
                <select name="nacional" >
                    <option value="">Eres nacional/ extranjero</option>
                    <option value="Nacional">Nacional</option>
                    <option value="Extranjero">Extranjero</option>
                </select>
                    </div>
                    <div class="CampoFormulario">
                        <label class="Requerido">Documento de identidad del titular:</label>
                        <input required name='dniTitular' type="text" placeholder="DNI/C.I/Pasaporte"/>
                    </div>
                    <div class="CampoFormulario">
                        <label class="Requerido">Banco:</label>
                        <input required name='banco' type="text" placeholder="Nombre del Banco"/>
                    </div>
                    <div class="CampoFormulario">
                        <label class="Requerido">cuenta:</label>
                        <select name="tipoCuenta">
                            <option value="">selecione el tipo de Cuenta</option>
                            <option value="corriente/cheque">Corriente</option>
                            <option value="ahorro">Ahorro</option>
                        </select>
                    </div>
                    <div class="CampoFormulario">
                        <label class="Requerido">Numero De Cuenta:</label>
                        <input required type="text" name='numeroCuenta' placeholder="Numero de Cuenta Bancaria"/>
                    </div>
                        {loading === 'cargando' ? <Loading/> : null }
                    <input required type='hidden' name='idUsuario' value={propietario?propietario:usuario.idUsuario} />
                    {loading === 'cargando' ?<p className="btnBlue BTN">Cargando</p>:<button className="btnGreen BTN">Agregar</button >
                     }
                </form>
                {
                    loading === 'registro exitoso'? <Redir/>:null
                }
            </article>
            </div>        
    )
    }
    return null
}

export default AddBanks