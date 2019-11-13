import Axios from 'axios';
import {servers} from '../keys'
const {devServer} = servers

const recover = async (correo,setMessage,setLoading)=>{
    setLoading(true)
    const send = await Axios.post(`${devServer}/recoverpass`,{correo})
    if(send.data==='revise su correo'){
        setLoading(false)
        setMessage('Se ha enviado un correo de verificacion')
        setTimeout(()=>{
            setMessage(false)
        },5000)
    }

}
const updatePass = async (password,token)=>{
    const data = {
        password,
        token
    }

    const send = await Axios.post(`${devServer}/updatepass`,{data})
    if(send.data==='Recuperacion Exitosa!!'){
        alert('Recuperacion Exitosa!!')
        window.location = '/'
    }else{
         window.location.reload()
    }
    
}
export {recover,updatePass }