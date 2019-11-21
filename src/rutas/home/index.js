import React, {Fragment, useEffect,useState, useLayoutEffect} from'react'
import {Link,Redirect} from 'react-router-dom'
import {coments} from '../../gets_apis/sockets'
import {rastrearPedido} from '../../gets_apis/api_sesion'
import './home.css'
import Calculator from '../../components/calculator/calculator'
import logo1 from '../../components/images/logo.png'
import btc from '../../svg/bitcoin1.svg'
import metodoSeguro from '../../svg/metodoSeguro.svg'
import pMonitoreado from '../../svg/procesoMonitoreado.svg'
import mejorTazaMercado from '../../svg/mejorTazaMercado.svg'
import atencionLinea from '../../svg/atencionEnLinea.svg'
import profile from '../../components/images/team-member01-150x150.jpg'
import BancoBci from '../../components/images/BancoBci.png'
import BancoBrou from '../../components/images/BancoBrou.jpg'
import BancoEstado from '../../components/images/BancoEstado.jpg'
import Bancolombia from '../../components/images/Bancolombia.png'
import BancoPichincha from '../../components/images/BancoPichincha.jpg'
import BancoUala from '../../components/images/BancoUala.jpg'
import mercadoPago from '../../components/images/mercadopago.jpg'
import Skrill from '../../components/images/skrill.png'
import BitCoin from '../../components/images/bitcoin.png'
import Brubank from '../../components/images/brubank.png'
import {servers} from '../../keys'

const {staticServer} = servers

function Home(){ 
    const [resenas, setResena] = useState([])
    const [loading, setLoading] = useState(false)
    const [pedido, setPedido] = useState(false)
    const [sesion, setSesion] = useState(false)

    useLayoutEffect(()=>{
        coments(setLoading,setResena)
    },[])

    useEffect(()=>{
        setSesion(sessionStorage.userSesion)
    })
    return !sesion? (
        <Fragment>
            <header>
        <div>
            <img src={logo1} alt=""/>
            <h2>
                Otra forma de enviar dinero
            </h2>
        </div>
        <form>
            <div className="CalculadoraContenedor Cartas">
                <Calculator />
            </div>

        </form>
    </header>
    <main className='scroll'>
        <section className="SobreNosotros" id="SobreNosotros">
            <span>
                <img src={btc} alt=""/>
            </span>
            <article>
                <h1>Sobre Nosotros</h1>
                <p>
                    Somos una empresa dedicada desde hace 2 años al servicio de remesas internacionales, con el interés principal de satisfacer las necesidades de los clientes con el menor costo, mayor rapidez, y facilidad que nos permite el mundo de hoy.
                </p>
                <p>
                    Permitiendo a nuestros clientes ahorrar, dinero y de esa forma satisfacer al 100% más de 2000 clientes.
                </p>
            </article>
            <div>
                <p>
                    Contactanos vía WhatsApp para cotizaciones en otras monedas
                </p>
                <Link className="btnGreen" to='/home'>
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
	 viewBox="0 0 418.135 418.135"  >
<g>
	<path d="M198.929,0.242C88.5,5.5,1.356,97.466,1.691,208.02c0.102,33.672,8.231,65.454,22.571,93.536
		L2.245,408.429c-1.191,5.781,4.023,10.843,9.766,9.483l104.723-24.811c26.905,13.402,57.125,21.143,89.108,21.631
		c112.869,1.724,206.982-87.897,210.5-200.724C420.113,93.065,320.295-5.538,198.929,0.242z M323.886,322.197
		c-30.669,30.669-71.446,47.559-114.818,47.559c-25.396,0-49.71-5.698-72.269-16.935l-14.584-7.265l-64.206,15.212l13.515-65.607
		l-7.185-14.07c-11.711-22.935-17.649-47.736-17.649-73.713c0-43.373,16.89-84.149,47.559-114.819
		c30.395-30.395,71.837-47.56,114.822-47.56C252.443,45,293.218,61.89,323.887,92.558c30.669,30.669,47.559,71.445,47.56,114.817
		C371.446,250.361,354.281,291.803,323.886,322.197z"/>
	<path  d="M309.712,252.351l-40.169-11.534c-5.281-1.516-10.968-0.018-14.816,3.903l-9.823,10.008
		c-4.142,4.22-10.427,5.576-15.909,3.358c-19.002-7.69-58.974-43.23-69.182-61.007c-2.945-5.128-2.458-11.539,1.158-16.218
		l8.576-11.095c3.36-4.347,4.069-10.185,1.847-15.21l-16.9-38.223c-4.048-9.155-15.747-11.82-23.39-5.356
		c-11.211,9.482-24.513,23.891-26.13,39.854c-2.851,28.144,9.219,63.622,54.862,106.222c52.73,49.215,94.956,55.717,122.449,49.057
		c15.594-3.777,28.056-18.919,35.921-31.317C323.568,266.34,319.334,255.114,309.712,252.351z"/>
</g>
</svg>

        <br/>
                    WhatsApp +58 451 58 61</Link>
            </div>
        </section>
        <section className="BancosAfiliados">
            <h1>Bancos Para depositos</h1>
            <article>
                <div className="Cartas">
                    <img src={BancoBci}alt=""/>
                </div>
                <div className="Cartas">
                    <img src={BancoBrou} alt=""/>
                </div>
                <div className="Cartas">
                    <img src={BancoEstado} alt=""/>
                </div>
                <div className="Cartas">
                    <img src={mercadoPago} alt=""/>
                </div>
                <div className="Cartas">
                    <img src={Brubank} alt=""/>
                </div>
                <div className="Cartas">
                    <img src={Skrill} alt=""/>
                </div>
                <div className="Cartas">
                    <img src={BitCoin} alt=""/>
                </div>
                <div className="Cartas">
                    <img src={Bancolombia} alt=""/>
                </div>
                <div className="Cartas">
                    <img src={BancoPichincha} alt=""/>
                </div>
                <div className="Cartas">
                    <img src={BancoUala} alt=""/>
                </div>
            </article>
        </section>
        <section className="PorQueElegirnos">
            <h1>Por que elegirnos</h1>
            <p>Permitiendo a nuestros clientes ahorrar tiempo, dinero y de esa forma satisfacer al 100% mas de 2000 clientes </p>
            <article>
                <div className="Cartas">
                    <img src={pMonitoreado} alt=""/>
                    <p><span>Proceso Bajo tu supervisión</span></p>
                </div>
                <div className="Cartas">
                    <img src={metodoSeguro} alt=""/>
                    <p><span>Metodo seguro</span></p>
                </div>
                <div className="Cartas">
                    <img src={mejorTazaMercado} alt=""/>
                    <p><span>La mejor taza del mercado</span></p>
                </div>
                <div className="Cartas">
                    <img src={atencionLinea} alt=""/>
                    <p><span>Atencion en linea</span></p>
                </div>
            </article>
        </section>
        <section id="Resenas">
            <h1>Reseñas de clientes</h1>
            <div>
                {
                    loading?(
                        <article className="Resenas">
                    <img src={profile} alt=""/>
                    <div className="Resena">
                        <p>cargando</p>
                        <h3>cargando</h3>
                    </div>
                </article>
                    ): resenas.map((res,i)=>{
                    return res.status === 'aprobar'?(
                        <article className="Resenas">
                            <img src={res.foto?staticServer+res.foto:profile} alt=""/>
                            <div className="Resena">
                                <p>{res.resena}</p>
                            </div>
                        </article>
                    ):null
                })
                }
            </div>
        </section>
        <section id="Rastrear" className="Rastreador">
            <h1>Rastreador</h1>
            <div className="Buscador">
                <input type="text" placeholder="Introduce el ID de tu orden aqui" onChange={(e)=>rastrearPedido(e.target.value,setPedido)} onKeyUp={(e)=>rastrearPedido(e.target.value,setPedido)}/>
            {
                pedido?
                <div className="ResultadoRastreador">
            
            <h2>{pedido.status}</h2>
               <p>
                   <span>ID:</span> {pedido.idPedido}
                   <br/>
                   <span>Remitente:</span> {pedido.remitente}
                   <br/>
                   <span>Deposito:</span> {pedido.montoDeposito}
                   <br/>
                   <span>monto deposito:</span> {pedido.remitente}
                   <br/>
                   <span>Moneda</span> {pedido.monedaDeposito}
                   <br/>
                   <span>Remitente:</span> {pedido.remitente}
                   <br/>
                   <span>Monto de retiro</span> {pedido.monedaDeposito}
               </p>
               </div>:null
            }
            
                <Link to='/' className="btnGreen">
                    Rastrear orden
                </Link>
            </div>
        </section>
    </main>
    <div className="Footer">
        <span>Copyright © 2019 <a href="#">VCoin Transfer</a> | WebMasters <a href="#">@NovatoCreativo</a></span>
    </div>
    
        </Fragment>
    ):<Redirect to='/Dashboard'/>
} 

export default Home