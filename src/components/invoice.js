import React, {Fragment} from 'react'
import logo from './images/logo.png'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 10,
        paddingTop: 20,
        paddingLeft:20,
        paddingRight:20,
        lineHeight: 1,
        flexDirection: 'column',
    }, 
    logo: {
        width: 94,
        position:"absolute",
        marginTop: 36,
        padding: '10px',
        marginLeft: '5%',
        marginRight: 'auto',
        textAlign: 'center',
        backgroundColor: 'rgb(16, 108, 160)',
        borderRadius:5,
    },
    logo2: {
        width: 94,
        position:"absolute",
        marginTop: 390,
        padding: '10px',
        marginLeft: '5%',
        marginRight: 'auto',
        textAlign: 'center',
        backgroundColor: 'rgb(16, 108, 160)',
        borderRadius:5,
    },
    titleContainer:{
        flexDirection: 'row',
        marginTop: 14,
    },
    label: {
        width: 20
    },
    headerContainer: {
        marginTop: -43
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        marginBottom:30,
        border:"1px solid grey",
    },
    tableContainer1: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 15,
        border:"1px solid grey",
    },
    container: {
        flexDirection: 'row',
        borderBottomColor: 'grey',
        backgroundColor: 'rgb(16, 108, 160)',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    containerRows:{
        border:'1px solid grey'
    },
    footerHeader: {
        width:"25%",
        flexDirection: 'row',
        borderBottomColor: 'grey',
        backgroundColor: 'rgb(16, 108, 160)',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    firmaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    footerRow: {
        flexDirection: 'row',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        width:"25%",
        fontStyle: 'bold',
        paddingLeft: '10px'
    },
    remitente: {
        width: '50%',
        color:'white',
        fontStyle:"bold",
        paddingTop:"5px",
        height: 24,
        lineHeight:2,
        border:'1px solid white'
    },
    footerRemitente:{
        width:"100%",
        color:'white'
    },

    footerRemitenteRow: {
        width: '100%',
    },
    remitenteRow: {
        width: '50%',
        paddingLeft:"15px"
    },
    destinatario: {
        width: '50%',
        color:"white",
        fontStyle:"bold",
        paddingTop:"5px",
        height: 24,
        lineHeight:2,
        border:'1px solid white'
    },
    destinatarioRow: {
        width: '50%',
        paddingLeft:"15px"
    },
    rate: {
        width: '15%',
        borderRightColor: "grey",
        borderRightWidth: 1,
    },
    firma:{
        textAlign:"center"
    },
    dashed:{
        width:'100%',
        paddingTop:"15px",
        borderBottomWidth: "1px",
        borderBottomStyle:"dotted"
    },
    parche:{
        width:'50%',
        height:'100px',
        backgroundColor:'white',
        marginTop:'15px',
        marginLeft:'20px',
        position:'absolute'
    },
    parche2:{
        width:'50%',
        height:'40px',
        backgroundColor:'white',
        marginTop:'70%',
        marginLeft:'20px',
        position:'absolute'
    }
  });
export default function Invoice({pedido}){
    return <Document>
        <Page size="A4" style={styles.page}>

            {/**Cabecera factura*/}

            <View style={styles.tableContainer1}>
            <Fragment>
                    <View style={styles.footerHeader} >
                        <Text ><Image style={styles.logo}  src={logo} /></Text>
                    </View>
                    <View style={styles.footerRow}  >
                        <Text style={styles.footerRemitenteRow}>{pedido.idPedido}</Text>
                    </View>

                    <View style={styles.footerHeader} >
                        <Text  style={styles.footerRemitente}>ORDEN #:</Text>
                    </View>

                    <View style={styles.footerRow} >
                        <Text style={styles.footerRemitenteRow}> {pedido.idPedido}</Text>
                    </View>
                </Fragment>
            <Fragment>
                    <View style={styles.footerHeader} >
                        <Text  style={styles.footerRemitente}>ORDEN #:</Text>
                    </View>

                    <View style={styles.footerRow} >
                        <Text style={styles.footerRemitenteRow}>{pedido.idPedido}</Text>
                    </View>

                    <View style={styles.footerHeader}>
                        <Text style={styles.footerRemitente}>FECHA:</Text>
                    </View>

                    <View style={styles.footerRow} >
                        <Text style={styles.footerRemitenteRow}> {pedido.fechaPedido}</Text>
                    </View>
                </Fragment>
            </View>

            <View style={styles.parche}></View>
                <Image style={styles.logo} src={logo} />
            <View style={styles.tableContainer}>
                
                <View style={styles.container}>
                    <Text style={styles.remitente}>Remitente</Text>
                    <Text style={styles.destinatario}>{pedido.status==='abierta' || pedido.status==='aceptada'?'Cuenta Vcoin':'Cuenta destinatario'}</Text>
                </View>
                {/**editing */}
                <View style={styles.containerRows}>
                    <View style={styles.row} >
                        <Text style={styles.remitenteRow}><p style={{color:'rgb(16, 108, 160)'}}>MONEDA:</p> {pedido.monedaDeposito}</Text>
                        <Text style={styles.destinatarioRow}><p style={{color:'rgb(16, 108, 160)'}}>PAIS:</p> {pedido.paisBanco?pedido.paisBanco:pedido.paisVcoin}</Text>
                    </View>
                    <View style={styles.row} >
                        <Text style={styles.remitenteRow}><p style={{color:'rgb(16, 108, 160)'}}>NOMBRES:</p> {pedido.nombre?pedido.nombre : pedido.nombreUsuario} {pedido.apellido}</Text>
                        <Text style={styles.destinatarioRow}><p style={{color:'rgb(16, 108, 160)'}}>NOMBRES:</p> {pedido.titular?pedido.titular : pedido.titularVcoin}</Text>
                    </View>
                    <View style={styles.row} >
                        <Text style={styles.remitenteRow}><p style={{color:'rgb(16, 108, 160)'}}>DOC. IDENTIDAD:</p> {pedido.dni?pedido.dni:pedido.dniUsuario}</Text>
                        <Text style={styles.destinatarioRow}><p style={{color:'rgb(16, 108, 160)'}}>DOC. IDENTIDAD:</p> {pedido.dniTitular?pedido.dniTitular:pedido.dniTitularVcoin}</Text>
                    </View>
                    <View style={styles.row} >
                        <Text style={styles.remitenteRow}><p style={{color:'rgb(16, 108, 160)'}}>CORREO:</p> {pedido.correo?pedido.correo:pedido.correoUsuario}</Text>
                        <Text style={styles.destinatarioRow}><p style={{color:'rgb(16, 108, 160)'}}>BANCO:</p> {pedido.banco?pedido.banco:pedido.bancoVcoin} </Text>
                    </View>
                    <View style={styles.row} >
                        <Text style={styles.remitenteRow}><p style={{color:'rgb(16, 108, 160)'}}>REFERENCIA DEPOSITO:</p> {pedido.referenciaDeposito?pedido.referenciaDeposito:'por definir'} </Text>
                        <Text style={styles.destinatarioRow}><p style={{color:'rgb(16, 108, 160)'}}>Dir. Deposito:</p> {pedido.numeroCuenta?pedido.numeroCuenta:pedido.nCuentaVcoin} </Text>
                    </View>
                </View>

                {/**footer table */}

                <Fragment>
                    <View style={styles.footerHeader}>
                        <Text style={styles.footerRemitente}>MONTO:</Text>
                    </View>

                    <View style={styles.footerRow} >
                        <Text style={styles.footerRemitenteRow}> {pedido.montoDeposito} {pedido.monedaDeposito} </Text>
                    </View>

                    <View style={styles.footerHeader}>
                        <Text style={styles.footerRemitente}>N° REFERENCIA:</Text>
                    </View>

                    <View style={styles.footerRow} >
                        <Text style={styles.footerRemitenteRow}> {pedido.referenciaRetiro?pedido.referenciaRetiro:'por definir'} </Text>
                    </View>
                </Fragment>

                    <View style={styles.footerHeader}>
                        <Text style={styles.footerRemitente}>TASA DE CAMBIO:</Text>
                    </View>

                    <View style={styles.footerRow} >
                        <Text style={styles.footerRemitenteRow}> {pedido.tazaCambio} </Text>
                    </View>

                    <View style={styles.footerHeader}>
                        <Text style={styles.footerRemitente}>TOTAL A RECIBIR:</Text>
                    </View>

                    <View style={styles.footerRow} >
                        <Text style={styles.footerRemitenteRow}> {pedido.montoRetiro} bs </Text>
                    </View>
            </View>

            {/**Firmas */}
            <View  style={styles.firma}>
                <View style={styles.firmaRow}>
                    <Text style={styles.remitenteRow}>Operador: _______________________</Text>
                    <Text style={styles.destinatarioRow} >Remitente: _______________________</Text>
                </View>
            </View>
            {/**Dashed */}
            <Text style={styles.dashed}></Text>

            {/**Copia cliente */}

            {/**Cabecera factura*/}

            <View style={styles.tableContainer1}>
            <Fragment>
                    <View style={styles.footerHeader} >
                        <Text ><Image style={styles.logo}  src={logo} /></Text>
                    </View>
                    <View style={styles.footerRow}  >
                        <Text style={styles.footerRemitenteRow}>{pedido.idPedido}</Text>
                    </View>

                    <View style={styles.footerHeader} >
                        <Text  style={styles.footerRemitente}>ORDEN #:</Text>
                    </View>

                    <View style={styles.footerRow} >
                        <Text style={styles.footerRemitenteRow}> {pedido.idPedido}</Text>
                    </View>
                </Fragment>
            <Fragment>
                    <View style={styles.footerHeader} >
                        <Text  style={styles.footerRemitente}>ORDEN #:</Text>
                    </View>

                    <View style={styles.footerRow} >
                        <Text style={styles.footerRemitenteRow}>{pedido.idPedido}</Text>
                    </View>

                    <View style={styles.footerHeader}>
                        <Text style={styles.footerRemitente}>FECHA:</Text>
                    </View>

                    <View style={styles.footerRow} >
                        <Text style={styles.footerRemitenteRow}> {pedido.fechaPedido}</Text>
                    </View>
                </Fragment>
            </View>

            <View style={styles.parche2}></View>
                <Image style={styles.logo2} src={logo} />
            <View style={styles.tableContainer}>
                
                <View style={styles.container}>
                    <Text style={styles.remitente}>Remitente</Text>
                    <Text style={styles.destinatario}>{pedido.status==='abierta' || pedido.status==='aceptada'?'Cuenta Vcoin':'Cuenta destinatario'}</Text>
                </View>
                
                <View style={styles.containerRows}>
                    <View style={styles.row} >
                        <Text style={styles.remitenteRow}><p style={{color:'rgb(16, 108, 160)'}}>MONEDA:</p> {pedido.monedaDeposito}</Text>
                        <Text style={styles.destinatarioRow}><p style={{color:'rgb(16, 108, 160)'}}>PAIS:</p> {pedido.paisBanco}</Text>
                    </View>
                    <View style={styles.row} >
                        <Text style={styles.remitenteRow}><p style={{color:'rgb(16, 108, 160)'}}>NOMBRES:</p> {pedido.nombre} {pedido.apellido}</Text>
                        <Text style={styles.destinatarioRow}><p style={{color:'rgb(16, 108, 160)'}}>NOMBRES:</p> {pedido.titular}</Text>
                    </View>
                    <View style={styles.row} >
                        <Text style={styles.remitenteRow}><p style={{color:'rgb(16, 108, 160)'}}>DOC. IDENTIDAD:</p> {pedido.dni}</Text>
                        <Text style={styles.destinatarioRow}><p style={{color:'rgb(16, 108, 160)'}}>DOC. IDENTIDAD:</p> {pedido.dniTitular}</Text>
                    </View>
                    <View style={styles.row} >
                        <Text style={styles.remitenteRow}><p style={{color:'rgb(16, 108, 160)'}}>CORREO:</p> {pedido.correo}</Text>
                        <Text style={styles.destinatarioRow}><p style={{color:'rgb(16, 108, 160)'}}>BANCO:</p> {pedido.banco} </Text>
                    </View>
                    <View style={styles.row} >
                        <Text style={styles.remitenteRow}><p style={{color:'rgb(16, 108, 160)'}}>REFERENCIA DEPOSITO:</p> {pedido.referenciaRetiro?pedido.referenciaRetiro:'por definir'} </Text>
                        <Text style={styles.destinatarioRow}><p style={{color:'rgb(16, 108, 160)'}}>N. CUENTA:</p> {pedido.numeroCuenta} </Text>
                    </View>
                </View>

                {/**footer table */}

                <Fragment>
                    <View style={styles.footerHeader}>
                        <Text style={styles.footerRemitente}>MONTO:</Text>
                    </View>

                    <View style={styles.footerRow} >
                        <Text style={styles.footerRemitenteRow}> {pedido.montoDeposito} {pedido.monedaDeposito} </Text>
                    </View>

                    <View style={styles.footerHeader}>
                        <Text style={styles.footerRemitente}>N° REFERENCIA:</Text>
                    </View>

                    <View style={styles.footerRow} >
                        <Text style={styles.footerRemitenteRow}> {pedido.referenciaRetiro?pedido.referenciaRetiro:'por definir'} </Text>
                    </View>
                </Fragment>

                    <View style={styles.footerHeader}>
                        <Text style={styles.footerRemitente}>TASA DE CAMBIO:</Text>
                    </View>

                    <View style={styles.footerRow} >
                        <Text style={styles.footerRemitenteRow}> {pedido.tazaCambio} </Text>
                    </View>

                    <View style={styles.footerHeader}>
                        <Text style={styles.footerRemitente}>TOTAL A RECIBIR:</Text>
                    </View>

                    <View style={styles.footerRow} >
                        <Text style={styles.footerRemitenteRow}> {pedido.montoRetiro} bs</Text>
                    </View>
            </View>

            {/**Firmas */}
            <View  style={styles.firma}>
                <View style={styles.firmaRow}>
                    <Text style={styles.remitenteRow}>Operador: _______________________</Text>
                    <Text style={styles.destinatarioRow} >Remitente: _______________________</Text>
                </View>
            </View>
        </Page>
    </Document>
}