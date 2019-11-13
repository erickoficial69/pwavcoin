import React,{Fragment,useState} from'react'
import {updatePass} from '../../gets_apis/userServices'

function UpdatePass(props){
    const {token} = props.match.params
    const [pass,setPass] = useState('')
    const [disabled,setDisabled] = useState(false)

    const recoverPass = async (e)=>{
        e.preventDefault()
        if(pass !== e.target.pass2.value){
            setDisabled(true)
        }else{
            updatePass(pass,token)
        }
    }
    const verifyPass = (e)=>{
        if(pass !== e.target.value){
            setDisabled(true)
        }else{
            setDisabled(false)
        }
    }
    if(token){
        return(
            <Fragment>
                <section className="Entrar">
                    <form className="Login Cartas" onSubmit={recoverPass} id='formRecover'>
                        <div className='CampoFormulario' >
                            <label>Nueva contraseña</label>
                            <input type='text' name='password' onKeyUp={(e)=>setPass(e.target.value)} onChange={(e)=>setPass(e.target.value)} /> 
                        </div>
    
                        <div className='CampoFormulario' >
                            <label>Confirmar contraseña</label>
                            <input type='text' name='pass2' style={disabled?{border:'1px solid red'}:null} onKeyUp={verifyPass} onChange={verifyPass}/> 
                        </div>
                        <input className={disabled?'btnRed':'btnGreen'} type='submit' value='confirmar' disabled={disabled}/>
                    </form>
                </section>            
            </Fragment>
        )
    }

    return null
}

export default UpdatePass