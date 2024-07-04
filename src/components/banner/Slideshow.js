import React, {useRef, useEffect, useCallback, useState} from 'react';
import {ReactComponent as FlechaIzquierda} from '../../data/iconmonstr-angel-left-thin.svg';
import {ReactComponent as FlechaDerecha} from '../../data/iconmonstr-angel-right-thin.svg';
import styled from 'styled-components';

const Slideshow = ({
		children,
		controles = false,
		
		autoplay = false,
		velocidad="500",
		intervalo="5000"
	}) => {
	// 
	const slideshow = useRef(null);
	const intervaloSlideshow = useRef(null);
	const [click, setClick] = useState(false)
	
	const siguiente = useCallback(() => {
		// Comprobamos que el slideshow tenga elementos
		if(slideshow.current && slideshow.current.children.length > 0){
			// console.log('Siguiente')

			// Obtenemos el primer elemento del slideshow.
			const primerElemento = slideshow.current.children[0];

			// Establecemos la transicion para el slideshow.
			slideshow.current.style.transition = `${velocidad}ms ease-out all`;

			const tamañoSlide = slideshow.current.children[0].offsetWidth;

			// Movemos el slideshow
			slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`;

			const transicion = () => {
				// Reiniciamos la posicion del Slideshow.
				slideshow.current.style.transition = 'none';
				slideshow.current.style.transform = `translateX(0)`;

				// Tomamos el primer elemento y lo mandamos al final.
				slideshow.current.appendChild(primerElemento);
				// console.log(primerElemento)

				slideshow.current.removeEventListener('transitionend', transicion);
			}

			// Eventlistener para cuando termina la animacion.
			slideshow.current.addEventListener('transitionend', transicion);

		}
	}, [velocidad]);
	
	const anterior = () => {
		// console.log('Anterior');
		if(slideshow.current && slideshow.current.children.length > 0){
			// Obtenemos el ultimo elemento del slideshow.
			const index = slideshow.current.children.length - 1;
			const ultimoElemento = slideshow.current.children[index];
			slideshow.current.insertBefore(ultimoElemento, slideshow.current.firstChild);
			
			slideshow.current.style.transition = 'none';
			const tamañoSlide = slideshow.current.children[0].offsetWidth;
			slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`;
		
			setTimeout(() => {
				slideshow.current.style.transition = `${velocidad}ms ease-out all`;
				slideshow.current.style.transform = `translateX(0)`;
			}, 30);
		}
	}

	useEffect(() => {
		if(click){
			intervaloSlideshow.current = setInterval(() => {
				siguiente();
			}, intervalo);
		}else{
			clearInterval(intervaloSlideshow.current);
		}
		console.log(click)

	}, [autoplay, click, intervalo, siguiente]);

	return (
		// <div>
		<ContenedorPrincipal>
			<Botoon onClick={()=>setClick(!click)}></Botoon>
			<ContenedorSlideshow ref={slideshow}>
				{children }
			</ContenedorSlideshow>
			{controles && <Controles>
				<Boton onClick={anterior}>
					<FlechaIzquierda />
				</Boton>
				<Boton derecho onClick={siguiente}>
					<FlechaDerecha />
				</Boton>
			</Controles>}
			</ContenedorPrincipal>
		// </div>
	);
}

const ContenedorPrincipal = styled.div`
	position: relative;
	top: 6rem;
	z-index: 2;
	width: 100%;
	height: 400px;
`;
	
const ContenedorSlideshow = styled.div`
	object-fit: cover;
	display: flex;
	flex-wrap: nowrap;
	height: 400px;

`;

const Slide = styled.div`
	min-width: 100%;
	overflow: hidden;
	transition: .3s ease all;
	z-index: 10;
	/* max-height: 500px; */
	position: relative;
	
	img {
		width: 100%;
		vertical-align: top;
		height: 400px;
	}

`;

const TextoSlide = styled.div`
	background: ${props => props.colorFondo ? props.colorFondo : 'rgba(0,0,0,.3)'};
	color: ${props => props.colorTexto ? props.colorTexto : '#fff'};
	width: 100%;
	padding: 10px 60px;
	text-align: center;
	position: absolute;
	bottom: 0;

	@media screen and (max-width: 700px) {
		position: relative;
		background: #000;
	}
`;

const Controles = styled.div`
	position: absolute;
	top: 0;
	z-index: 20;
	width: 100%;
	height: 100%;
	pointer-events: none;
`;

const Boton = styled.button`
	pointer-events: all;
	background: none;
	border: none;
	cursor: pointer;
	outline: none;
	width: 50px;
	height: 100%;
	text-align: center;
	position: absolute;
	transition: .3s ease all;
	/* &:hover {
		background: rgba(0,0,0,.2);
		path {
			fill: #fff;
		}
	} */

	path {
		filter: ${props => props.derecho ? 'drop-shadow(-2px 0px 0px #fff)' : 'drop-shadow(2px 0px 0px #fff)'};
	}

	${props => props.derecho ? 'right: 0' : 'left: 0'}
`;

const Botoon = styled.button`
	position: absolute;
	display: block;
	border-radius: 50%;
	cursor: pointer;
	outline: none;
	width: 10px;
	height: 10px;
	padding: 0px;
	margin: 0 50% 0 50% ;
	z-index: 11;
	bottom: 2px;
`;
 
export {Slideshow, Slide, TextoSlide};