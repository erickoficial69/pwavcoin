import io from 'socket.io-client'
import Axios from 'axios'

import {servers} from '../keys'
const {devServer} = servers
const datosFecha = new Date()
const fecha ={
    hora:datosFecha.toLocaleDateString()
}
const sendNotification = async (mensaje)=>{
    const worker = await navigator.serviceWorker.getRegistration()
    if(worker){
        await window.Notification.requestPermission()
        worker.showNotification(mensaje.titulo,{
            body:mensaje.body,
            icon:'/ico.png',
            vibrate: [200, 100, 200, 100, 200, 100, 200]
        })
        return
    }else{
        new Notification(mensaje.titulo,{
            body:mensaje.body,
            icon:'/ico.png',
            vibrate: [200, 100, 200, 100, 200, 100, 200]
        })
    }
}
function paises(setPaises){
        const socket = io(devServer)
        socket.on('paises', e =>{
           
           setPaises(e)
        })
}
const addPais = async (data,setLoading,setOpenTab) =>{
    
    setLoading(true)
    const socket = io(devServer)
    
    socket.emit('newPais',data)
    socket.on('newPais',mensaje=>{
        if(mensaje==='ok'){
             setLoading('cargado')
             setOpenTab('cerrado')
        }
       
        setTimeout(()=>{
            setLoading(false)
        },1000)
    })
    
    return
}
const updatePais = async (data,setLoading) =>{
    setLoading(true)
    const socket = io(devServer)
    socket.emit('updatePais',data)
    socket.on('updatePais',status=>{
        if(status==='ok'){
            setTimeout(setLoading(false), 3000);
        }
    })
         
}
const deletePais = async (data) =>{
    const verify = window.confirm('desea eliminar este elemento?')
    if(!verify){
        return
    }else{
       const socket = io(devServer)
    
        socket.emit('deletePais',data)
        socket.on('deletePais',mensaje=>{
            if(!('Notification' in window) || !('serviceWorker' in navigator)){
                
            }else{
                sendNotification(mensaje) 
            }
        }) 
    }       
  
}
const newOfert = async (data,setLoading,setActiveAlert,btn) =>{
    data.preventDefault()
   
    setLoading('cargando')
    const {montoDeposito,monedaDeposito,montoRetiro,monedaRetiro,idBanco,idUsuario,tazaCambio,referenciaDeposito,correoUsuario,nombreUsuario} = data.target
    if(idBanco.value === ''){
        setLoading('')
        return alert('seleccione el banco')
    }
    const datosPedido = {
      montoDeposito:montoDeposito.value,
      monedaDeposito:monedaDeposito.value,
      referenciaDeposito:referenciaDeposito.value,
      montoRetiro:montoRetiro.value,
      monedaRetiro:monedaRetiro.value,
      tazaCambio:tazaCambio.value,
      idBanco:idBanco?idBanco.value:0,
      idUsuario:idUsuario.value,
      correoUsuario:correoUsuario.value,
      nombreUsuario:nombreUsuario.value,
      fechaPedido:fecha.hora,
      fechaCompletada:Date()     
    }

    const socket = io(devServer)
    
    socket.emit('newPedido',datosPedido)

    socket.on('newPedido', data=>{
            setLoading(data)
            setActiveAlert(true)
            btn(false)
    })
      
     return 
}
function notificationPedido(){

    const user = JSON.parse(sessionStorage.userSesion)
    const iduser = user.idUsuario.toString()
    const socket = io(devServer)
    socket.on('notificacionPedido',mensaje=>{
        
        if(iduser === mensaje.usuario.toString()){
            
            if(!('Notification' in window) || !('serviceWorker' in navigator)){
                return
            }
            showNotification(mensaje)  
        }
    })
}
function notificationtoOperador(){

    const user = JSON.parse(sessionStorage.userSesion)
    const iduser = user.idUsuario.toString()
    const socket = io(devServer)
    socket.emit('notificacionToOperador',iduser)
    socket.on('notificacionToOperador',mensaje=>{
        console.log(mensaje)
        if(iduser === mensaje.operador.toString()){
            
            if(!('Notification' in window) || !('serviceWorker' in navigator)){
                return 
            }
            showNotification(mensaje)  
        }
    })
}
const notificacioNoticias = ()=>{

    const socket = io(devServer)
    
    socket.on('notificacionNoticias',mensaje=>{
            if(!('Notification' in window) || !('serviceWorker' in navigator)){
                
            }else{
                showNotification(mensaje) 
            }
    })
}
async function pedidos(id,setTabla,limit,setLoading){
    setLoading(true)
    const socket = io(devServer)
    const query = {
        idUsuario:id,
        limit
    }
    socket.emit('pedidos',query)
    socket.on(query.idUsuario,async data =>{
           await setTabla(data)
           setTimeout(()=>{
                setLoading(false)
           },2000)
    })
    
}
function pedidosAdministrador(setTabla,limit,setLoading){
    setLoading(true)
    const socket = io(devServer)
    
    socket.emit('pedidosGenerales',limit)
    socket.on('pedidosGenerales', data =>{
        setTabla(data)
        setTimeout(()=>{
            setLoading(false)
        },2000)
    })     
}
function updatePedido(inputs,data2,setVerify){
    const socket = io(devServer)

    if(inputs!==undefined){
        const {referenciaDeposito,idBanco,idPedido,status} = inputs
         const pedido ={
            idPedido:idPedido.value,
            status:status.value,
            referenciaDeposito:referenciaDeposito.value,
            idBanco:idBanco.value,

            idBancoOld: data2.idBanco,
            statusOld: data2.status,
            montoDeposito: data2.montoDeposito,
            monedaDeposito: data2.monedaDeposito,
            montoRetiro: data2.montoRetiro,
            monedaRetiro: data2.monedaRetiro,
            tazaCambio: data2.tazaCambio,
            fechaPedido: data2.fechaPedido,
            idUsuario: data2.idUsuario,
            idOperador:data2.idOperador,
            nombreOperador: data2.nombreOperador,
            correoOperador: data2.correoOperador,
            bancoVcoin:data2.bancoVcoin,
            titularVcoin:data2.titularVcoin,
            dniTitularVcoin:data2.dniTitularVcoin,
            paisVcoin:data2.paisVcoin,
            nacionalVcoin:data2.nacionalVcoin,
            nCuentaVcoin:data2.nCuentaVcoin,
            tipoCuentaVcoin:data2.ipoCuentaVcoin
        }
       
        socket.emit('updatePedido',pedido)
        socket.on('updatePedido',dato=>{
            if(dato==='ok'){
                setVerify('ok')
            }
        })
    }
}
function updatePedidoAdm(data,inputs,setVerify){

    const {id,status,referenciaRetiro} = data
    const socket = io(devServer)

    if(inputs!==undefined){
        
         const pedido ={
            idPedido:id.value,
            status:status.value,
            referenciaRetiro:referenciaRetiro.value
        }
        
        socket.emit('updatePedidoAdm',pedido)
        socket.on('updatePedidoAdm',dato=>{
            if(dato==='ok'){
                setVerify('ok')
            }
        })
        return
    }

    if(inputs===undefined){
        const pedido ={
            idPedido:id.value,
            status:status.value
        }
        socket.emit('updatePedidoAdm',pedido)
    }
}
function deletePedido(data,mensaje,setModal){
    const socket = io(devServer)
    const {idPedido,status,sesionUser} = data
  
       const pedido ={
            idPedido,
            status,
            mensaje:`Pedido cancelado por el ${sesionUser.rango} ${sesionUser.nombre} por motivo: ${mensaje}`
    }
    
        socket.emit('deletePedido',pedido)
        socket.on('deletePedido',message=>{
            message==='cancelada'?setModal(false):setModal(true)
        })
        return
    
}
async function messages(usuario,setMessages,setCount){
    let suma = 0
    const sw = await navigator.serviceWorker.getRegistration()
    const socket = io(devServer)
    socket.emit('rqMessage',usuario)
    socket.on(usuario.correo,messages=>{
        setMessages(messages)
        for(let status of messages){
           if(status.mensajeStatus==='nuevo'){
                 suma++
                if(sw){
                    sw.showNotification(status.titulo,{
                        body:status.body,
                        icon:'/ico.png',
                        vibrate: [200, 100, 200, 100, 200, 100, 200]
                    })
                    
                }else{
                    new Notification(status.titulo,{
                        body:status.mensaje,
                        icon:'/ico.png',
                        vibrate: [200, 100, 200, 100, 200, 100, 200]
                    })
                }
                setCount(suma)
           }else{
            setCount(0)
           }
        }  
    })
}
const sendMessage=async(message,setModalMessage)=>{
    try{
      const sendMessage = await Axios.post(`${devServer}/savemessage`,message)
      const response = await sendMessage.data
      console.log(response)
      if(response==='mensaje enviado'){
          const socket = io(devServer)
          socket.emit('messages',message)
          setModalMessage(false)
      }
    }
    catch(e){
      console.log(e)
    }
  }
const updateMessage=async(datos)=>{

    const socket = io(devServer)
    socket.emit('updateMessage',datos)
  }
const deleteMessage=async(user,setMessages,setCount,id)=>{
    const datos={
        correo:user.correo,
        idUsuario:user.idUsuario,
        idMessage:id,
    }
    let suma = 0
    const socket = io(devServer)
    socket.emit('deleteMessage',datos)
    socket.on(user.correo,messages=>{
        setMessages(messages)
        for(let status of messages){
           if(status.mensajeStatus==='nuevo'){
                 suma++
                setCount(suma)
           }else{
            setCount(0)
           }
        }  
    })
  }
const sendComent=async(coment,setLoading,setModalComents)=>{
    setLoading(true)
    const socket=io(devServer)
    socket.emit('newComent',coment)
    socket.on('newComent',data=>{
       if(data==='reseña exitosa'){
            setLoading(false)
           return setModalComents(false)
       }
    })
  }
const coments=(setLoading,setComents)=>{
      setLoading(true)
    const socket=io(devServer)

    socket.on('coments',data=>{
           setLoading(false)
           setComents(data)
    })
  }
  const comentsAdm=(setLoading,setComents)=>{
    setLoading(true)
  const socket=io(devServer)

  socket.on('comentsAdm',data=>{
         setLoading(false)
         setComents(data)
  })
}
  const updateComent=(setLoading,data)=>{
      setLoading(true)
  const socket=io(devServer)

  socket.emit('updateComent',data)
  socket.on('updateComent',mensaje=>{
    setLoading(false)
  })
}
export {paises,pedidos, newOfert, pedidosAdministrador,updatePedido,updatePedidoAdm,notificationPedido,addPais,deletePais,updatePais,notificacioNoticias,notificationtoOperador,messages,sendMessage,updateMessage,deleteMessage,deletePedido,sendComent,coments,updateComent,comentsAdm}
