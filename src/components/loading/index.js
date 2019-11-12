import React,{Fragment} from 'react'
import espera from './load.svg'
import './load.css'

function Loading(){
    return(
        <Fragment>
            <img className='loadsvg' src={espera} alt=''/>
        </Fragment>
    )
}
export default Loading