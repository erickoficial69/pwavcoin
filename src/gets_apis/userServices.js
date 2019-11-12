import Axios from 'axios';
import {servers} from '../keys'
const {devServer} = servers

const recover = async (correo)=>{
    
    const send = await Axios.post(`${devServer}/recoverpass`,{correo})
    if(send.data==='revise su correo'){
        window.location.reload()
    }
    
}
export {recover}