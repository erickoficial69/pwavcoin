import React,{Fragment} from 'react'
import espera from '../../svg/cargalineas2.svg'
import './load.css'

function Loading2(){
    return(
        <Fragment>
            <img src={espera} alt=''/>
        </Fragment>
    )
}
export default Loading2