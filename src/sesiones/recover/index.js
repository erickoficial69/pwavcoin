import React,{Fragment,useState} from'react'
import {Redirect} from 'react-router-dom'
import {recover} from '../../gets_apis/userServices'

function Recover(props){
    const {service} = props.match.params
    const [loading, setLoading] = useState(false)
    const [message,setMessage] = useState(false)
    const [redir,setRedir] = useState(false)

    const recoverPass = async (e)=>{
        e.preventDefault()
        const email = e.target.correo.value
        if(!email){
            return alert('ingrese el correo')
        }else{
            recover(email,setMessage,setLoading)
        }
    }
    
    if(service==='confirmado'){
        setTimeout(()=>setRedir(true),3000)
        return (
            <section className="Entrar">
                        <form className="Login Cartas " onSubmit={recoverPass}>
                                
                                <div className='CampoFormulario'>
                                        <h2>Ya puedes iniciar sesion!!!</h2>     
                                </div>
                            {
                                redir?<Redirect to='/' />:null
                            }
                        </form>
                </section>       
        )     
    }
    
    if(service==='recover'){
        return(
            <Fragment>
                <section className="Entrar">
                        <form className="FormSinUp Cartas" onSubmit={recoverPass}>
                           
                                {
                                    loading?
                                        <h1>Enviando correo de recuperacion</h1>:
                                        <div className='CampoFormulario'>
                                            <label>Inserte su correo</label>
                                            <input type='email' name='correo' placeholder='example@gmail.com' autoFocus /> 
                                            {message?
                                                <p>
                                                    {message}
                                                </p>:
                                                <button className='btnGreen'>Enviar</button>
                                            }
                                            
                                        </div>
                                }
                            
                            
                        </form>
                </section>            
            </Fragment>
        )
    }
    return null
}

export default Recover