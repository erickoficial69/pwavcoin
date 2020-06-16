import React, {useState, useEffect, Fragment} from'react'
import {paises, updatePais,deletePais} from '../../gets_apis/sockets'
import updatebtn from '../../svg/actualizar.svg'
import cerrarBtn from '../../svg/cerrarBlanca.svg'
import './tazaActual.css'
import {servers} from '../../keys'
const {staticServer} = servers

function TazaActual(){
  const [typeUser, setTypeUser] = useState(JSON.parse(sessionStorage.userSesion))
    const [taza,setTaza] = useState([{}])
    const [loading,setLoading] = useState(false)
    const [data, setData] = useState({
      id:'',
      tazaCambio:''
  })

const setValues = e =>{
  const {id} = e.target.attributes
  const newValues = {
    id:id.value,
    tazaCambio:e.target.value
  }
  setData(newValues)
}

const add = e =>{
    e.preventDefault()
    setLoading(true)
    if(data.id === ''){
        return alert('seleccione un pais')
    }else if(data.tazaCambio === ''){
        return alert('verifique si los campos')
    }else{
      updatePais(data,setLoading)
  }
  
  const forms = document.querySelectorAll('.ActMonedas')
  forms.forEach(form=>{
    form.reset()
  })
}

   useEffect(()=>{
     setTypeUser(JSON.parse(sessionStorage.userSesion))
    paises(setTaza,setLoading)
   },[])

    return  typeUser.rango !=='cliente' && document.location.pathname === '/Dashboard/AddPais'?(
      <Fragment>
          {
            taza.map((items,i)=>(
              <Fragment>
                <form className="ActMonedas Cartas">
                  <img src={staticServer+items.ico} alt={items.moneda}/>
                  <div>
                      <label>
                         {items.moneda}
                      </label>
                      <input type="number" step="any" id={items.id} onFocus={setValues} onKeyUp={setValues} onChange={setValues} placeholder={loading?'wait':items.tazaCambio}/>
                      <span onClick={add}><img src={updatebtn} alt="update"/></span>
                      
                  </div>
                  <span onClick={()=>deletePais(items.id)} className="BtnCerrar"><img src={cerrarBtn} alt=""/></span>   
                </form>
              </Fragment>
            ))
          }
      </Fragment>
          
    ):document.location.pathname !== '/Dashboard/AddPais'?(
      <Fragment>
          <h1>Tasa del dia</h1>
          <section className="Monedas">
              {
                taza.map((items, i)=>(
                  <article key={i}>
                    <img src={staticServer+items.ico} alt={items.nombre} />
                    <h3>1 {items.shortMoneda} = {items.tazaCambio} BsS</h3>
                  </article>
                ))
              }
          </section>
      </Fragment>
    ):null

} 

export default TazaActual