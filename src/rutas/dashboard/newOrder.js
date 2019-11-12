import React,{Fragment} from 'react'
import Calculator from '../../components/calculator/calculator'

function NewOrder(props){
    const {propietario} = props.match.params
    return(
        <Fragment>
            <div className='container'>
                <h1>Nueva Orden</h1>
                <section className='contanerCalc'>
                    <Calculator propietario={propietario}/>
                </section>
            </div>  
        </Fragment>
    )
}
export default NewOrder