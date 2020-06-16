import Axios from 'axios';
import {servers} from '../keys'
import {saveAs} from 'file-saver'
const {devServer} = servers

const registerUser = async (data, setLoading) =>{
  setLoading('cargando')
    data.preventDefault()
    const {nombre,apellido,correo,password,pais,dni,idOperador,userStatus,telefono} = data.target
    const newUser ={
        nombre:nombre.value,
        apellido:apellido.value,
        correo:correo.value.toLowerCase(),
        telefono:telefono?telefono.value:null,
        password:password.value,
        pais:pais.value,
        dni:dni.value,
        fechaIncripcion:Date(),
        idOperador:idOperador?idOperador.value:1,
        userStatus:userStatus?userStatus.value:'no confirmado'
    }
    
    if(nombre.value==='' || apellido.value==='' || correo.value==='' || password.value==='' || pais.value === '' || dni.value === ''){
      alert('Rellena todos los campos')
      return
    }

    const start = await Axios.post(`${devServer}/registerUser`, newUser)

    const res = await start.data
          if(res === 'ok'){
            setLoading('ok')
            setTimeout(()=>{
              setLoading(false)
            },8000)
          }else{
            setLoading('hubo un error')
          }
          
}
const verifyMail = async (mail, setVerify,setLoading2) =>{
  const {value} = mail.target
  setLoading2('cargando')
  if(value === '') {
    setLoading2('')
    return setVerify('si')
  }

  const start = await Axios.post(`${devServer}/mailVerify`,{correo:value})
  const res = await start.data

  setLoading2('')
  setVerify(res)
  return
}
const secureSesion = async (value)=>{
  
  const gets = await Axios.get(`${devServer}/getOneUser/${value}`)
  const data = await gets.data
  
  if(gets.status === 200){
    await sessionStorage.setItem('userSesion', JSON.stringify(data))
  }
}
const login = async (data,setLoading)=>{
      data.preventDefault()
      setLoading('cargando')
      const {correo,password} = data.target
      if(correo.value && password.value){
            const user ={
                  correo:correo.value,
                  password:password.value
              }
            const start = await Axios.post(`${devServer}/loginUser`, user)
            const res = start.data

            if(res === 'fail'){
               setLoading('correo no encontrado')
               return 
            }
            if(res === 'contraseña incorrecta'){
              setLoading('contraseña incorrecta')
              return 
            }
            if(res === 'usuario no confirmado'){
              setLoading('usuario no confirmado')
              return 
            }
            if(res === 'usuario suspendido'){
              setLoading('usuario suspendido')
              return 
            }
              sessionStorage.setItem('userSesion', JSON.stringify(res))
              
              setLoading('logged')
            return 
      }else{
        return setLoading('Rellene todos los campos')
      } 

}
const imgPaises = async (setImgs)=>{
  const gets = await Axios.get(`${devServer}/imgpaises`)
  const data = await gets.data
  if(gets.status === 200){
    return setImgs(data)
  } 
}
const dataPais = async (setData,name)=>{
  const gets = await Axios.get(`${devServer}/datapais/${name}`)
  const data = await gets.data
  if(gets.status === 200){
    return setData(data[0])
  } 
}
const getPaises = async (setPaises)=>{
  const gets = await Axios.get(`${devServer}/paises`)
  const data = await gets.data
  if(gets.status === 200){
    return setPaises(data)
  } 
}
const getPedido = async (id,setPedido,setLoad)=>{
  
  const gets = await Axios.post(`${devServer}/pedido`,{id})
  const data = await gets.data
  if(gets.status === 200){
    setPedido(data)
    setTimeout(()=>{
      setLoad(false)
    },2000)
  } 
}
const deletePedido = async (id)=>{
  
  const gets = await Axios.post(`${devServer}/delete`,{id})
  const data = await gets.data
  if(gets.status === 200){
    alert(data)
    return window.location.reload()
  } 
}
const getPedidosg = async (setPedidosg)=>{
  const gets = await Axios.get(`${devServer}/pedidosg`)
  const data = await gets.data
  if(gets.status === 200){
    
    return setPedidosg(data)
  } 
}
const addBank = async (dat,setLoading)=>{
  setLoading('cargando')
  const gets = await Axios.post(`${devServer}/newBankAcount`,dat)
  const data = await gets.data

  if(gets.status === 200 && data.status === 'ok'){
    setLoading('registro exitoso')
  } 
 
}
const getBanks = async (setPaisBanks,id,setLoad)=>{
  setLoad('cargando')
  const gets = await Axios.get(`${devServer}/bankAcounts/${id}`)
  const data = await gets.data
  if(gets.status === 200){
    setPaisBanks(data)
    setLoad('')
  } 
}
const getBankPedido = async (setBanks,id,pais)=>{
  
  const gets = await Axios.get(`${devServer}/bankAcountCountry/${id}/${pais}`)
  const data = gets.data
  if(gets.status === 200){
    setBanks(data)
  } 
}
const getBank = async (setBanks,id)=>{
  setBanks(false)
  const gets = await Axios.get(`${devServer}/bank/${id}`)
  const data = gets.data
  console.log(gets.status)
  if(gets.status === 200){
    setBanks({
      paisBanco:data.paisBanco,
      titular:data.titular,
      dniTitular:data.dniTitular,
      banco:data.banco,
      tipoCuenta:data.tipoCuenta,
      numeroCuenta:data.numeroCuenta
  })
  }else{
    setBanks(false)
  }
}
const deleteBank = async (id)=>{
  const gets = await Axios.get(`${devServer}/deletebank/${id}`)
  
  if(gets.status === 200){
    window.location.reload()
  } 
}
const getUsers = async (setUsers,setLoading)=>{
  setLoading(true)
  const gets = await Axios.get(`${devServer}/getUsers`)
  const data = await gets.data
  
  if(gets.status === 200){
    setUsers(data)
    setLoading(false)
  }
}
const getUser = async (setUser,value,setLoading)=>{
    setLoading(true)
    const gets = await Axios.get(`${devServer}/getUser/${value}`)
    const data = await gets.data
    
    if(gets.status === 200){
      setUser(data)
      setLoading(false)
    }
}
const getOneUser = async (setUser,value,setLoading)=>{
      setLoading(true)
      const gets = await Axios.get(`${devServer}/getOneUser/${value}`)
      const data = await gets.data
      
      if(gets.status === 200){
        setUser(data)
        setLoading(false)
      }
}
const upgradeUser = async (valores,setLoading,setVerify)=>{
  setVerify(false)
  setLoading(true)
  if(valores.rango.value==='cliente'){
    
    const datos={
      rango:'corresponsal',
      idUsuario:valores.idusuario.value
    }
    const gets = await Axios.post(`${devServer}/upgradeUser`,datos)
  
    if(gets.status === 200){
      setLoading(false)
      setVerify(true)
    }
  }

  if(valores.rango.value==='corresponsal'){
    
    const datos={
      rango:'administrador',
      idUsuario:valores.idusuario.value
    }
    const gets = await Axios.post(`${devServer}/upgradeUser`,datos)
  
    if(gets.status === 200){
      setLoading(false)
      setVerify(true)
    }
  }

  if(valores.rango.value==='administrador'){
    
    const datos={
      rango:'cliente',
      idUsuario:valores.idusuario.value
    }
    const gets = await Axios.post(`${devServer}/upgradeUser`,datos)
  
    if(gets.status === 200){
      setLoading(false)
      setVerify(true)
    }
  }
}
const setStatusUser = async (valores,setLoading,setVerify)=>{
  setVerify(false)
  setLoading(true)
  if(valores.userstatus.value !=='suspendido'){
    
    const datos={
      userStatus:'suspendido',
      idUsuario:valores.idusuario.value
    }
    const gets = await Axios.post(`${devServer}/setStatusUser`,datos)
  
    if(gets.status === 200){
      setLoading(false)
      setVerify(true)
    }
  }else{
    const datos={
      userStatus:'confirmado',
      idUsuario:valores.idusuario.value
    }
    const gets = await Axios.post(`${devServer}/setStatusUser`,datos)
  
    if(gets.status === 200){
      setLoading(false)
      setVerify(true)
    }
  }
}
const updateOneUser = async (datos,setLoading)=>{
  setLoading(true)
  const gets = await Axios.post(`${devServer}/updateProfile`,datos)
  const data = gets.data
  data.update==='ok'?setLoading(false):setLoading(false)
  if(data.update==='ok'){
    alert('Datos Actualizados, los cambios estaran presentes en su proxima sesion')
  }
}
const updatePhoneNumber = async (datos,setLoading)=>{
  setLoading(true)
  const gets = await Axios.post(`${devServer}/updatePhoneNumber`,datos)
  const data = gets.data

  if(data.update==='ok'){
    setLoading(false)
  }
}
const downloadPdf=async(e,setLoadPdf)=>{
  const getData = await Axios.post(`${devServer}/pedido`,{id:e.target.attributes.id.value})
   const dataPedido = await getData.data
   
   const createPdf = await Axios.post(`${devServer}/createpdf`,dataPedido)
   const filePdf = await createPdf.data

   if(filePdf !== "error"){
       const desc = await Axios.get(`${devServer}/getpdf/${dataPedido.idPedido}`,{responseType:'blob'})
       const pdfBlob = new Blob([desc.data], { type: 'application/pdf' });
       saveAs(pdfBlob,`${dataPedido.idPedido}`)
       setLoadPdf(false)
   }else{
      setLoadPdf(false)
   }
}
const savePhoto = async(result,idUsuario,setLoading)=>{
  setLoading(true)
   const datos = {
     foto:result,
     idUsuario
   }
    const insert = await Axios.post(`${devServer}/updatePhoto`,datos)
    const rs = insert.data
    
    if(rs==='ok'){
      secureSesion(idUsuario)
      
      setTimeout(()=>{
          setLoading(false)
      },2000)
    }
}

const rastrearPedido = async(idPedido,setPedido)=>{
    
    const insert = await Axios.post(`${devServer}/rastrearpedido`,{idPedido})
    const rs = insert.data
    console.log(rs)
    setPedido(rs)
}
export {verifyMail, login, registerUser, getBanks, addBank,deleteBank,getPedidosg,getPedido,getPaises,deletePedido,imgPaises,dataPais,getUsers,getUser,getOneUser,upgradeUser,setStatusUser,getBank,getBankPedido,updateOneUser,updatePhoneNumber,secureSesion,downloadPdf,savePhoto,rastrearPedido}