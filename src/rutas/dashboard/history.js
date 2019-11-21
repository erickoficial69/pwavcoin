import React, {useEffect,useState} from'react'
import HistoryClient from './historyClient'
import HistoryAdm from './historyAdm'
import HistoryOperador from './historyOperador'

const History = (props)=>{
    const {idUser,rango} = props.match.params
    const [usuario,setUsuario] = useState(false)

    useEffect(()=>{
        setUsuario(JSON.parse(sessionStorage.userSesion))
    })
      return rango === 'cliente'?(
              <HistoryClient usuario={usuario} idUser={idUser}/>
      ):rango === 'administrador'?(
        <HistoryAdm usuario={usuario} idUser={idUser}/>
     ):(
        <HistoryOperador usuario={usuario} idUser={idUser}/>
     )
} 

export default History
