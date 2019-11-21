-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2019 at 06:24 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vc`
--

-- --------------------------------------------------------

--
-- Table structure for table `cuentasbancarias`
--

CREATE TABLE `cuentasbancarias` (
  `id` int(11) NOT NULL,
  `titular` text COLLATE utf8_spanish_ci NOT NULL,
  `dniTitular` text COLLATE utf8_spanish_ci NOT NULL,
  `nacional` text COLLATE utf8_spanish_ci NOT NULL,
  `paisBanco` text COLLATE utf8_spanish_ci,
  `banco` text COLLATE utf8_spanish_ci,
  `numeroCuenta` int(40) DEFAULT NULL,
  `tipoCuenta` text COLLATE utf8_spanish_ci,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `cuentasbancarias`
--

INSERT INTO `cuentasbancarias` (`id`, `titular`, `dniTitular`, `nacional`, `paisBanco`, `banco`, `numeroCuenta`, `tipoCuenta`, `idUsuario`) VALUES
(1, 'Erick Diaz E.', '23413903', 'Nacional', 'venezuela', 'mercantil', 2147483647, 'corriente/cheque', 2);

-- --------------------------------------------------------

--
-- Table structure for table `imgpaises`
--

CREATE TABLE `imgpaises` (
  `id` int(11) NOT NULL,
  `nombre` text COLLATE utf8_spanish_ci,
  `codArea` text COLLATE utf8_spanish_ci,
  `ico` text COLLATE utf8_spanish_ci,
  `shortNombre` text COLLATE utf8_spanish_ci,
  `moneda` text COLLATE utf8_spanish_ci NOT NULL,
  `shortMoneda` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `imgpaises`
--

INSERT INTO `imgpaises` (`id`, `nombre`, `codArea`, `ico`, `shortNombre`, `moneda`, `shortMoneda`) VALUES
(1, 'Colombia', '+57', '/paises/colombia.svg', 'col', 'Peso Colombiano', 'cop'),
(2, 'Venezuela', '+58', '/paises/venezuela.svg', 'ven', 'Bolivar Venezolano', 'bs'),
(3, 'Estados Unidos', '+1', '/paises/estados-unidos.svg', 'usa', 'Dolar Americano', 'usd'),
(4, 'Argentina', '+54', '/paises/argentina.svg', 'arg', 'Peso Argentino', 'ars'),
(5, 'Chile', '+56', '/paises/chile.svg', 'chl', 'Peso Chileno', 'clp'),
(6, 'Peru', '+51', '/paises/peru.svg', 'per', 'Nuevo sol', 'pen'),
(7, 'Uruguay', '+598', '/paises/uruguay.svg', 'ury', 'Peso Uruguayo', 'uyu'),
(8, 'Bolivia', '+591', '/paises/bolivia.svg', 'bol', 'Boliviano', 'bob'),
(9, 'Brasil', '+55', '/paises/brasil.svg', 'bra', 'Real Brasileño', 'brl'),
(10, 'Costa Rica', '+506', '/paises/costa-rica.svg', 'CRI', 'Colón costarricense', 'CRC'),
(11, 'Cuba', '+53', '/paises/cuba.svg', 'CUB', 'Peso cubano', 'CUP'),
(12, 'Ecuador', '+593', '/paises/ecuador.svg', 'Ecu', 'Dólar estadounidense', 'usd'),
(13, 'Guatemala', '+502', '/paises/guatemala.svg', 'GTM', 'Quetzal', 'GTQ'),
(14, 'España', '+34', '/paises/espana.svg', 'Esp', 'Euro', 'eur'),
(15, 'Haití', '+509', '/paises/haiti.svg', 'HTI', 'Gourde haitiano', 'HTG'),
(16, 'México', '+52', '/paises/mexico.svg', 'MEX', 'Peso mexicano', 'MXN'),
(17, 'Nicaragua', '+505', '/paises/nicaragua.svg', 'NIC', 'Córdoba nicaragüense', 'NIO'),
(18, 'Panamá', '+507', '/paises/panama.svg', 'pan', 'Dólar estadounidense', 'usd'),
(19, 'Paraguay', '+595', '/paises/paraguay.svg', 'PRY', 'Guaraní paraguayo', 'PYG'),
(20, 'República Dominicana', '+1 809', '/paises/republica-dominicana.svg', 'dom', 'Peso dominicano', 'DOP');

-- --------------------------------------------------------

--
-- Table structure for table `mensajes`
--

CREATE TABLE `mensajes` (
  `id` int(11) NOT NULL,
  `titulo` text NOT NULL,
  `mensaje` text NOT NULL,
  `fecha` text NOT NULL,
  `status` text NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `paises`
--

CREATE TABLE `paises` (
  `id` int(11) NOT NULL,
  `nombre` text COLLATE utf8_spanish_ci,
  `codArea` text COLLATE utf8_spanish_ci,
  `ico` text COLLATE utf8_spanish_ci,
  `shortNombre` text COLLATE utf8_spanish_ci,
  `moneda` text COLLATE utf8_spanish_ci NOT NULL,
  `shortMoneda` text COLLATE utf8_spanish_ci NOT NULL,
  `tazaCambio` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `paises`
--

INSERT INTO `paises` (`id`, `nombre`, `codArea`, `ico`, `shortNombre`, `moneda`, `shortMoneda`, `tazaCambio`) VALUES
(2, 'Venezuela', '+58', '/images/venezuela.png', 've', 'Bolivares', 'bs', 1),
(4, 'Estados Unidos', '+1', '/images/usa.png', 'usa', 'Dolar Americano', 'usd', 26000),
(7, 'Uruguay', '+598', '/paises/uruguay.svg', 'ury', 'Peso Uruguayo', 'uyu', 3400),
(8, 'Colombia', '+57', '/paises/colombia.svg', 'col', 'Peso Colombiano', 'cop', 5.6),
(9, 'Uruguay', '+598', '/paises/uruguay.svg', 'ury', 'Peso Uruguayo', 'uyu', 34),
(10, 'Bolivia', '+591', '/paises/bolivia.svg', 'bol', 'Boliviano', 'bob', 43);

-- --------------------------------------------------------

--
-- Table structure for table `pedidos`
--

CREATE TABLE `pedidos` (
  `idPedido` bigint(6) UNSIGNED ZEROFILL NOT NULL,
  `montoDeposito` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `monedaDeposito` text COLLATE utf8_spanish_ci,
  `montoRetiro` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `monedaRetiro` text COLLATE utf8_spanish_ci,
  `tazaCambio` text COLLATE utf8_spanish_ci NOT NULL,
  `status` varchar(20) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'abierta',
  `fechaPedido` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `idUsuario` int(11) NOT NULL,
  `idBanco` text COLLATE utf8_spanish_ci NOT NULL,
  `idOperador` int(11) DEFAULT NULL,
  `nombreOperador` text COLLATE utf8_spanish_ci,
  `correoOperador` int(11) DEFAULT NULL,
  `referenciaDeposito` text COLLATE utf8_spanish_ci NOT NULL,
  `fechaCompletada` varchar(200) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `pedidos`
--

INSERT INTO `pedidos` (`idPedido`, `montoDeposito`, `monedaDeposito`, `montoRetiro`, `monedaRetiro`, `tazaCambio`, `status`, `fechaPedido`, `idUsuario`, `idBanco`, `idOperador`, `nombreOperador`, `correoOperador`, `referenciaDeposito`, `fechaCompletada`) VALUES
(000001, '23', 'Dolar Americano', '1265.000', 'Bolivar Venezolano', '55', 'rechazada', '10/27/2019', 2, '1', 1, 'Test Adm', 0, ' ', 'Sun Oct 27 2019 12:03:28 GMT-0400 (Venezuela Time)'),
(000002, '222', 'Dolar Americano', '5772000.000', 'Bolivar Venezolano', '26000', 'abierta', '10/29/2019', 2, '1', NULL, NULL, NULL, ' ', 'Tue Oct 29 2019 12:59:25 GMT-0400 (Venezuela Time)');

-- --------------------------------------------------------

--
-- Table structure for table `telefonos`
--

CREATE TABLE `telefonos` (
  `id` int(11) NOT NULL,
  `codPais` varchar(4) COLLATE utf8_spanish_ci NOT NULL,
  `numero` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombre` text COLLATE utf8_spanish_ci,
  `apellido` text COLLATE utf8_spanish_ci,
  `correo` text COLLATE utf8_spanish_ci,
  `password` text COLLATE utf8_spanish_ci NOT NULL,
  `rango` varchar(20) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'cliente',
  `userStatus` varchar(20) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'no confirmado',
  `foto` text COLLATE utf8_spanish_ci,
  `dni` text COLLATE utf8_spanish_ci,
  `direccion` text COLLATE utf8_spanish_ci,
  `token` int(11) DEFAULT NULL,
  `fechaIncripcion` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `userPaisOrigen` text COLLATE utf8_spanish_ci NOT NULL,
  `userPaisActual` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombre`, `apellido`, `correo`, `password`, `rango`, `userStatus`, `foto`, `dni`, `direccion`, `token`, `fechaIncripcion`, `userPaisOrigen`, `userPaisActual`) VALUES
(1, 'Test', 'Adm', 'pruebasvcointransfer@gmail.com', 'admin', 'administrador', 'confirmado', NULL, '334423232', NULL, NULL, '', '', ''),
(2, 'Test', 'cliente', 'cliente@gmail.com', 'cliente', 'cliente', 'confirmado', NULL, '54556564', NULL, NULL, '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cuentasbancarias`
--
ALTER TABLE `cuentasbancarias`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `imgpaises`
--
ALTER TABLE `imgpaises`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `paises`
--
ALTER TABLE `paises`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idPedido`),
  ADD UNIQUE KEY `idPedido` (`idPedido`);

--
-- Indexes for table `telefonos`
--
ALTER TABLE `telefonos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cuentasbancarias`
--
ALTER TABLE `cuentasbancarias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `imgpaises`
--
ALTER TABLE `imgpaises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `paises`
--
ALTER TABLE `paises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idPedido` bigint(6) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `telefonos`
--
ALTER TABLE `telefonos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
