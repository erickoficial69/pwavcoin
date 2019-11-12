import Axios from 'axios';
import {servers} from '../keys'
const {devServer} = servers

const recover = async (correo)=>{
    
    const send = await Axios.post(`${devServer}/recoverpass`,{correo})
    if(send.data==='revise su correo'){
        window.location.reload()
    }
    
}
const updatePass = async (password,token)=>{
    
    const send = await Axios.post(`${devServer}/updatepass`,[{password},{token}])
    if(send.data==='ok'){
        window.location.reload()
    }
    
}
export {recover,updatePass }