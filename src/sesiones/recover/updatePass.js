import React,{Fragment,useState,useEffect} from'react'
import {Link} from 'react-router-dom'
import {updatePass} from '../../gets_apis/userServices'

function UpdatePass(props){
    const {token} = props.match.params
    const [pass,setPass] = useState('')
    const [disabled,setDisabled] = useState(false)

    const recoverPass = async (e)=>{
        e.preventDefault()
        if(pass !== e.target.value){
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
                <section className='recover'>
                    <form onSubmit={recoverPass} id='formRecover'>
                        <div>
                            <label>Nueva contraseña</label>
                            <input type='text' name='password' onKeyUp={(e)=>setPass(e.target.value)} onChange={(e)=>setPass(e.target.value)} /> 
                        </div>
    
                        <div>
                            <label>Confirmar contraseña</label>
                            <input type='text' name='password' style={disabled?{border:'1px solid red'}:null} onKeyUp={verifyPass} onChange={verifyPass}/> 
                        </div>
                        <input type='submit' value='confirmar' disabled={disabled}/>
                    </form>
                </section>            
            </Fragment>
        )
    }

    return null
}

export default UpdatePass