import React,{Fragment} from'react'

import logo from '../../logo.png'
function About(){
    return(
        <Fragment>
            <article className="content">
                <img src={logo} alt="diaz web app"/>
                <h1>Diaz Web App</h1>
                <p>
                    Es la plataforma especializada en el desarrollo integral de aplicaciones, programación avanzada y consultoría compuesta creada por <strong>Erick Diaz Desarrollador Full Stack.</strong>

                    Creada para ayudarte en la creación, diseño y desarrollo de apps multiplataforma para diferentes soluciones de movilidad como del desarrollo y programación de software a medida para empresas.             
                </p>
            </article>
            
            <section className="content">
                <p>
                    Cotactame a traves de nuestro correo y te ayudaremos a conseguir la solucion completamente  gratis. 
                </p>
            </section>            
        </Fragment>
    )
}

export default About