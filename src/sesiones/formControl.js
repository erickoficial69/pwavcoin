import React, {useState, Fragment, useEffect,useLayoutEffect} from 'react'
import './formSesion.css'
import {registerUser, login, verifyMail,getBank} from '../gets_apis/api_sesion'
import {newOfert} from '../gets_apis/sockets'
import Loading from '../components/loading/'
import cerrarBtn from '../svg/cerrarBlanca.svg'

function FormSesion(props){
    const {setOpen, open, setSesion} = props
    const [loading, setLoading] = useState('')
    const [loading2, setLoading2] = useState(false)
    const [verify, setVerify] = useState('')
    const [pass,setPass] = useState('')
    const [disabled,setDisabled] = useState(false)

    const mostrar = ()=>{
        const register = document.querySelector('.BtnSinUp')
        register.classList.toggle('Cambio')
    }

    const verifyPass = (e)=>{
        if(pass !== e.target.value){
            setDisabled(true)
        }else{
            setDisabled(false)
        }
    }

    const startLogin = event => login(event, setLoading, setOpen, setSesion)
    const startVerify = e =>verifyMail(e,setVerify,setLoading2)
    const startRegister = async e =>{
        registerUser(e, setLoading2)
        return document.querySelector('.FormSinUp').reset()
    }
    
    return open === true ?(
        
        <div id='containerForm'>
            {loading === 'logged' ? setSesion(true):null}
            <article className="Entrar">
            
            
            <h2 onClick={mostrar} className="BtnSinUp">Registrarse</h2>
             <h2 onClick={mostrar} className="BtnLogin">Iniciar Sesion</h2>

             <div className="SinUp Cartas"> 
                  <form className="FormSinUp" name='registerForm' onSubmit={startRegister} method='post'>
                  {
                    loading2 === 'ok'?(
                        <Fragment>
                            <h1>Registro exitoso</h1>
                            <label>Revise su coreo electronico para confirmar el registro, no olvide revisar la bandeja de span si no está en recividos</label>
                        </Fragment>
                    ):(
                    <Fragment>
                  <div className="CampoFormulario">
                      <label className="Requerido">Nombre</label>
                       <input type="text" name='nombre' required placeholder="Nombre"/>
                   </div>
                   <div className="CampoFormulario">
                      <label className="Requerido">Apellido</label>
                       <input  name='apellido' required type="text" placeholder="Apellidos"/>
                   </div>
                   <div className="CampoFormulario">
                      <label className="Requerido">Pais</label>
                       <input name='pais'required  type="text" placeholder="Pais"/>
                   </div>
                   <div className="CampoFormulario">
                      <label className="Requerido">Documento de Identidad</label>
                       <input type="text" name='dni' required placeholder="DNI/C.I"/>
                   </div>
                   <div className="CampoFormulario">
                      <label className="Requerido">correo electronico</label>
                       {verify === 'no'?
                        <input type='email' name='correo' style={{border:'1px solid red'}} required onChange={startVerify} onKeyUp={startVerify} placeholder='ejemplo@gmail.com' />:

                        <input type='email' name='correo' required onChange={startVerify} onKeyUp={startVerify} placeholder='ejemplo@gmail.com' />
                    }
                   </div>
                   <div className="CampoFormulario">
                      <label  className="Requerido">contraseña</label>
                       <input name='password' required type="password" onKeyUp={(e)=>setPass(e.target.value)} onChange={(e)=>setPass(e.target.value)} placeholder="*****"/>
                   </div>
                   { <div className="CampoFormulario">
                      <label className="Requerido">Confirmar contraseña</label>
                       <input type="password" placeholder="*****" style={disabled?{border:'1px solid red'}:null} onKeyUp={verifyPass} onChange={verifyPass}  />
                   </div> }
                   <div>
                   <input type='hidden' name='rango' required value='cliente'/>
                    {
                            loading2? <Loading/> : null
                    }
                    <div className="Terminos">
                        <input type='checkbox' name='faqs' id='faqs'/>
                        <label htmlFor='faqs'>aceptar terminos y condiciones</label> 
                    </div>
                    {verify === 'no' ? <span className='btnRed BTN'>correo ocupado</span>:
                    loading2?<span className='btnBlue BTN'>Cargando</span>:
                    <button className='RegistrarBTN btnGreen BTN'>Registrate</button>}
                    </div>
                        </Fragment>
                    )
                    }
                   
                   </form>
               </div>
             <div className="Login Cartas ">
                  <form id='login' name='loginForm' onSubmit={startLogin} method='post'>
                   <div className="CampoFormulario">
                      <label className="Requerido" >correo electronico</label>
                       <input type="email" name='correo' required placeholder="ejemplo@gmail.com"/>
                   </div>
                   <div className="CampoFormulario">
                      <label className="Requerido">contraseña</label>
                       <input type="password" name='password' required placeholder="*****"/>
                   </div>
                   {
                        loading === 'cargando' ? <Loading/> : null
                    }
                    {
                        loading
                    }
                   <div>
                   <input type="submit" className="btnBlue BTN" value="Iniciar Sesion"/>
                   </div>
                   <p>¿olviddo su contraseña?</p>
                   </form>
               </div>
                <span onClick={()=>{setOpen(open ? false : true)}}className="BtnCerrar"><img src={cerrarBtn} alt=""/></span>
            </article>
        </div>
    ):null 
}

function FormPedidos(props){
    const [cliente, setCliente] = useState(false)
    const [loading, setLoading] = useState('')
    const [mostrar, setMostrar] = useState(false)
    const {formula,resultado,btn,open,setActiveAlert,bankDest, propietario} = props
    
    const startOfert = e =>{
        newOfert(e,setLoading,setActiveAlert,btn)
        document.querySelector('.formPedidos').reset()
    }
    const printBank = async(e)=>{
        getBank(setMostrar,e.target.value)
    }
  useEffect(()=>{
      const user = JSON.parse(sessionStorage.userSesion)
      if(!open){
          setMostrar(false)
      }
      setCliente(user)
    },[])
    
    return open === true ?(
        <div id='containerForm'>
                
                <article class="ConfirmarOrden Cartas">
                <h2>Información de orden</h2><br/>
                <form  method='post' className='formPedidos' onSubmit={startOfert}>
                <div className="Lista">
                    <p>
                        <span>Monto depositado:</span> {formula.deposito}
                        <br/>
                        <span>Moneda Depositada:</span> {formula.monedaDeposito}
                        <br/>
                        <span>Taza de Cambio:</span> { 1 / formula.tazacambioorigen}
                        <br/>
                        <span>Monto de Retiro:</span> {resultado} 
                        <br/>
                        <span>Moneda de retiro:</span> {formula.monedaRetiro}
                        <br/>
                    </p>
                </div>
                
                <div class="CampoFormulario">
                    <label class="Requerido">Cuenta a depositar:</label>
                    <select name='idBanco' onChange={printBank}>
                        <option value=''>Banco Destino</option>
                        {
                            bankDest.map((bank,i)=>{return(
                                <option key={i} value={bank.id}>{bank.banco} => {bank.titular}</option>
                            )})
                        }
                    </select>
                </div>
                {
                   mostrar.titular?(
                        <div className="Lista">
                            <h2>{mostrar.paisBanco?mostrar.paisBanco:''}</h2>
                    <p>
                        <span>Tutular:</span> {mostrar.titular?mostrar.titular:''}
                        <br/>
                        <span>Dni/C.i:</span> {mostrar.dniTitular?mostrar.dniTitular:''}
                        <br/>
                        <span>Banco:</span> {mostrar.banco?mostrar.banco:''}
                        <br/>
                        <span>tipo de Cuenta:</span> {mostrar.tipoCuenta?mostrar.tipoCuenta:''} 
                        <br/>
                        <span>Numero de cuenta:</span> {mostrar.numeroCuenta?mostrar.numeroCuenta:''}
                        <br/>
                    </p>
                </div>
                    ):null
                }
                <div>
                    <input type='hidden' name='montoDeposito' step='any'  value={formula.deposito} readOnly/>

                    <input type='hidden' name='monedaDeposito' value={formula.monedaDeposito}readOnly />

                    <input type='hidden' name='montoRetiro' step='any' value={resultado} readOnly/>

                    <input type='hidden' name='monedaRetiro' value={formula.monedaRetiro} readOnly />
                    
                    <input type='hidden' name='idUsuario' step='any' value={propietario?propietario:cliente.idUsuario} readOnly/>
                    <input type='hidden' name='correoUsuario' step='any' value={cliente.correo} readOnly/>
                    <input type='hidden' name='nombreUsuario' step='any' value={cliente.nombre+' '+cliente.apellido} readOnly/>
                    <input type='hidden' name='referenciaDeposito' value=' ' readOnly/>
                    <input type='hidden' name='tazaCambio' step='any' value={formula.tazacambioorigen} readOnly/>

                    
                    
                </div>
                {
                       loading === 'cargando' ? <Loading/> : null
                    }
                <input className='btnGreen BTN' type='submit' value='confirmar' />
                
                </form>
                <span onClick={()=>{btn(open ? false : true)}}className="BtnCerrar1"><img src={cerrarBtn} alt=""/></span>
                
            </article>
            
        </div>
    ): null

}

const FormRegisterUser = (props)=>{
    const {modalReg, setModalReg, idOperador} = props
    const [loading2, setLoading2] = useState(false)
    const [verify, setVerify] = useState('')
    const [ctrl, setCtrl] = useState(false)

    const startVerify = e =>verifyMail(e,setVerify,setLoading2)
    const startRegister = async e =>{
        e.preventDefault()
        registerUser(e, setLoading2,setModalReg,setCtrl)
        return document.querySelector('#reg').reset()
    }
useEffect(()=>{
    loading2 === 'ok'?window.location.reload():setLoading2(false)
},[loading2])
    return(
        <div id='containerForm'>
            <article class="ConfirmarOrden Cartas" onSubmit={startRegister}>
            <h2>Registro de clientes</h2>
                <form id='reg' className='FormSinUp'>

                    <div className='CampoFormulario'>
                        <label>Nombre</label>
                        <input type='text' name='nombre' placeholder='nombre del cliente'/>
                    </div>

                    <div className='CampoFormulario'>
                        <label>Apellido</label>
                        <input type='text' name='apellido' placeholder='apellido del cliente'/>
                    </div>

                    <div className='CampoFormulario'>
                        <label>dni/ci.</label>
                        <input type='text' name='dni' placeholder='dni del cliente'/>
                    </div>

                    <div className='CampoFormulario'>
                        <label>Pais</label>
                        <input type='text' name='pais' placeholder='pais del cliente'/>
                    </div>

                    <div className="CampoFormulario">
                      <label className="Requerido">correo electronico</label>
                       {verify === 'no'?
                        <input type='email' name='correo' style={{border:'1px solid red'}} required onChange={startVerify} onKeyUp={startVerify} placeholder='ejemplo@gmail.com' />:

                        <input type='email' name='correo' required onChange={startVerify} onKeyUp={startVerify} placeholder='ejemplo@gmail.com' />
                    }
                    </div>

                    <div className='CampoFormulario'>
                        <label>Telefono</label>
                        <input type='number' name='telefono' required/>
                    </div>
                    <div className='CampoFormulario'>
                        <label>contraseña</label>
                        <input type='password' name='password' placeholder='contraseña del cliente'/>
                    </div>

                   <div>
                   {verify === 'no' ? <span className='btnRed BTN'>correo ocupado</span>:
                    loading2?<span className='btnBlue BTN'>Cargando</span>:
                    <button className='btnGreen BTN'>Registrate</button>}
                    </div>
                   <input type='hidden' name='idOperador' value={idOperador} />
                   <input type='hidden' name='userStatus' value='confirmado' />
                </form>
                <span onClick={()=>{setModalReg(modalReg ? false : true)}}className="BtnCerrar"><img src={cerrarBtn} alt=""/></span>
            </article>
        </div>
    )
}

export {FormSesion, FormPedidos, FormRegisterUser}