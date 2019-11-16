import React, {useState,useLayoutEffect} from 'react'
import {addPais} from '../../../gets_apis/sockets'
import {imgPaises,dataPais} from '../../../gets_apis/api_sesion'
import TazaActual from '../tazaActual'
import './addPais.css'

const AddPais = ()=>{
    const [loading, setLoading] = useState(false)
    const [imgs, setImgs] = useState([{}])
    const [openTab, setOpenTab] = useState('cerrado')
    const [data, setData] = useState({
        id: 0,
        nombre: '',
        codArea: '',
        ico: '',
        shortNombre: '',
        moneda: '',
        shortMoneda: ''
      }
    )

    const setPais = async e =>{
        dataPais(setData,e.target.value)
    }
    const add = e =>{
        e.preventDefault()
        const {nombre,codArea,ico,shortNombre,moneda,shortMoneda,tazaCambio} = e.target
        const data={
            nombre:nombre.value,
            codArea:codArea.value,
            ico:ico.value,
            shortNombre:shortNombre.value,
            moneda:moneda.value,
            shortMoneda:shortMoneda.value,
            tazaCambio:tazaCambio.value}
        if(data.nombre === ''){
            return alert('seleccione un pais')
        }
        if(data.tazaCambio === ''){
            return alert('introduzca la taza de cambio')
        }
        addPais(data,setLoading,setOpenTab)
    }
    
    useLayoutEffect(()=>{    
            imgPaises(setImgs)  
    },[])
    return(
            <div className='container'>
                <h1>Gestionar monedas</h1>
                <div className='containerTazaActual'>
                    <TazaActual setLoading={setLoading} loading={loading} dir={document.location.pathname}/>
                </div>
                
                <form style={openTab==='cerrado'?
                {right:'-325px'}
                :{right:'0'}} className='newMoneda' onSubmit={add}>
                
                <span onClick={()=>openTab==='abierto'?setOpenTab('cerrado'):setOpenTab('abierto')} className='btnNewMoneda'>Nueva moneda</span>
                        <select onChange={setPais} name='nombre'>
                            <option value=''>Seleccione pais</option>
                        {
                            imgs.map((img,i)=>(
                                <option key={i}  value={imgs.nombre}>
                                {img.nombre}
                                </option>
                            ))
                        }
                        </select >
                        
                        <label>Taza de cambio</label>
                        <input type='number' step='any' name='tazaCambio' id='taza' />

                        <input type='hidden' name='shortNombre' value={data.shortNombre}/>
                        <input type='hidden' name='moneda' value={data.moneda}/>
                        <input type='hidden' name='shortMoneda' value={data.shortMoneda}/>
                        <input type='hidden' name='ico' value={data.ico}/>
                        <input type='hidden' name='codArea' value={data.codArea}/>
                <button className="btnGreen">Agregar</button>
                
            </form>
            </div>  
              
    )
}

export default AddPais