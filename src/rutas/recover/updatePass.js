import React,{Fragment} from'react'
import {Link} from 'react-router-dom'
import {recover} from '../../gets_apis/userServices'

function UpdatePass(props){
    const {token} = props.match.params

    const recoverPass = async (e)=>{
        e.preventDefault()
        const email = e.target.correo.value
        if(!email){
            return alert('ingrese el correo')
        }else{
            recover(email)
        }
    }

    const updatePass = ()=>{

    }
    
    if(token){
        return(
            <Fragment>
                <section className='recover'>
                    <form onSubmit={recoverPass}>
                        <div>
                            <label>Nueva contraseña</label>
                            <input type='text' name='password' /> 
                        </div>
    
                        <div>
                            <label>Nueva contraseña</label>
                            <input type='text' name='password' /> 
                        </div>
                        <input type='submit' value='confirmar' />
                    </form>
                </section>            
            </Fragment>
        )
    }

    return null
}

export default UpdatePass