import React, {useState, useEffect, useLayoutEffect} from 'react'
import {paises} from '../../gets_apis/sockets'
import {getBankPedido} from '../../gets_apis/api_sesion'
import {BtnPedido} from '../../sesiones/userControl'
import vzla from '../images/venezuela.png'
import './calculator.css'
import {servers}from '../../keys'

const {staticServer} = servers


const Calculator = (props)=>{
    const [sesion, setSesion] = useState(false)
    const [divisas, setDivisas] = useState([{}])
    const [bankDest,setBankDest] = useState([{}])
    const {propietario} = props

    const [resultado, setResultado] = useState(0)
    const [formula, setFormula] = useState({
        deposito:0,
        tazacambioorigen:0,
        monedaDeposito:'',
        monedaRetiro:'Bolivar Venezolano',
        paisOrigen:''
    })

    const monedaOrigen =  e =>{
        e.preventDefault()
        const {tazacambioorigen, alt,paisorigen} = e.target.attributes
        
        let adm=1

        const newValues = {
            deposito:formula.deposito,
            tazacambioorigen:tazacambioorigen.value,
            monedaDeposito:alt.value,
            monedaRetiro:'Bolivar Venezolano',
            paisOrigen:paisorigen.value
        }
        getBankPedido(setBankDest,adm,paisorigen.value)
        setFormula(newValues)
    }
    const cantidadDeposito = async e =>{
        const {value} = e.target

        let adm=1

        const newValues = {
            deposito:value,
            tazacambioorigen: formula.tazacambioorigen,
            monedaDeposito:formula.monedaDeposito,
            monedaRetiro:formula.monedaRetiro,
            paisOrigen:formula.paisOrigen
        }
        getBankPedido(setBankDest,adm,formula.paisOrigen)
        setFormula(newValues)
    }
    const calcular = () =>{
        const rs = Math.fround(formula.deposito * formula.tazacambioorigen)
        setResultado(rs.toFixed(2))
    }
    useLayoutEffect(()=>{
        paises(setDivisas)
        sessionStorage.userSesion ? setSesion(true): setSesion(false)
    },[])

    useEffect(()=>{
        calcular()
    })

    return (
        <article className='calculadora'>
                    <h1>Calculadora de remesas</h1>
                    <div>
                        <span>
                        <p>De: </p>

                    {divisas.map((items,key)=>
                            <img
                                key={key}
                                tazacambioorigen={items.tazaCambio}
                                paisorigen={items.nombre}

                                alt={items.moneda}

                                src={staticServer+items.ico}
                                onClick={monedaOrigen}
                             />)
                        }
                        </span>
                        <div className="InputCalculadora">
                        <p>{formula.monedaDeposito}</p>
                        <input type="number" step='0.1' placeholder="cantidad a depositar" onChange={cantidadDeposito} onKeyUp={cantidadDeposito}  />
                        </div>
                    </div>

                        
                      <div>
                          <span>
                          <p>a:</p>
                          <img src={vzla} alt='Venezuela'/>
                          </span>
                          </div>
                      <div className="InputCalculadora">
                      <p>Bolivar Venezolano</p>
                          <input value={resultado === 'NaN' ? 0 : resultado }/>
                          </div> 
                          
                    <span className="BtnPedido"><BtnPedido propietario={propietario} sesion={sesion} formula={formula} resultado={resultado} bankDest={bankDest}/></span>   
                </article>
           
    )
}

export default Calculator