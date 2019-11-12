import React,{Fragment} from'react'
import {Redirect} from 'react-router-dom'
import {recover} from '../../gets_apis/userServices'

function Recover(props){
    const {service,dato} = props.match.params

    const recoverPass = async (e)=>{
        e.preventDefault()
        const email = e.target.correo.value
        if(!email){
            return alert('ingrese el correo')
        }else{
            recover(email)
        }
    }

    if(service==='confirmado'){
        return(
            <Fragment>
                <section className='recover'>
                    <h1>ya puedes logearte</h1>
                    {
                        setTimeout(()=>{
                            return <Redirect to='/' />
                        },2000)
                    }
                </section>            
            </Fragment>
        )
    }
    
    if(service==='recover'){
        return(
            <Fragment>
                <section className='recover'>
                    <form onSubmit={recoverPass}>
                        <div>
                            <label>correo</label>
                            <input type='email' name='correo' /> 
                        </div>
                        <input type='submit' value='confirmar' />
                    </form>
                </section>            
            </Fragment>
        )
    }
    return null
}

export default Recover