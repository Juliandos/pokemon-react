import React from 'react'
import styled from 'styled-components';
import pokebola from "../../data/pokebola.png"
import face from "../../data/facebook.png"
import insta from "../../data/instagram.png"
import git from "../../data/signo-de-github.png"
import linkedin from "../../data/linkedin.png"
import twit from "../../data/gorjeo.png"
import youtube from "../../data/youtube.png"
import { useState, useEffect } from 'react';
// import { width } from '@mui/system';


export default function Footer() {

  const [envio, setEnvio] = useState(false)
  const [email, setEmail] = useState("")
  const [info, setInfo] = useState("")

  useEffect((e) => {
    setEnvio(envio)
    if(envio && email!=="" && info!==""){
      fetch("https://formsubmit.co/ajax/95juliandos@gmail.com",{//este fetch reemplaza los setTimeOut es la api 
          method:"POST",
          body: (email, info)
        })
        .then(res=> (
          res.ok?res.json():Promise.reject(res)
          ))
        .then( res => console.log(res.json))
        .catch(err=>{
          console.log(err);
          let message = err.statusText || "Ocurrió un error";
          console.log(message);
        })
    }
  }, [envio, email, info])
  
  
  return (
    <FooterContenedor>
      <FooterH1>
        <FooterH1Text>
          <h3>información 1</h3>
          <h6>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h6>
        </FooterH1Text>
        <FooterH1Text>
          <h3>información 1</h3>
          <h6>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h6>
        </FooterH1Text>
        <FooterH1Text>
          <h3>información 1</h3>
          <h6>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h6>
        </FooterH1Text>
        <FooterH1Form >
          <h3>Envíanos tus comentarios</h3>
          <input value={email} onChange={ e => setEmail(e.target.value)} type="email" name="email" placeholder="Escribe tu email" title="Email incorrecto"
          pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$" required/>
          <input value={info} onChange={ e => setInfo(e.target.value)} type="text" name="subject" placeholder="Asunto a tratar" title="El Asunto es requerido" required/>
          {/* <input type="submit" src={pokebola}/> */}
          <FooterH1Submmit onClick={() => setEnvio(true)} src={pokebola} alt="sdfg"/>
        </FooterH1Form>
      </FooterH1>
      <Hr/>
      <FooterH2>
        <a href="#"><img src={face} alt="facebook" /></a>
        <a href="#"><img src={youtube} alt="youtube" /></a>
        <a href="#"><img src={insta} alt="instagram" /></a>
        <a href="#"><img src={git} alt="github" /></a>
        <a href="#"><img src={linkedin} alt="linkedin" /></a>
        <a href="#"><img src={twit} alt="twitter" /></a>
      </FooterH2>
      <Hr/>
      <FooterH3>
        <h6>Terms & conditions</h6>
        <h6>Privacity Policy</h6>
        <h6>@2023 copyright Nowrap Inc.</h6>
      </FooterH3>
    </FooterContenedor>
  )
}

const FooterContenedor = styled.footer`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  text-align: center;
  background-image: linear-gradient(0.125turn, rgba(255, 28, 28), rgba(53, 100, 174), rgba(255, 203, 5));
  
`;
const FooterH1 = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px){
    flex-direction: row;
  }
`;
const FooterH1Text = styled.div`
  margin-right: 15px;
  flex-grow: 1;
  @media screen and (min-width: 768px){
    width:20%
  }
`;
const FooterH1Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 2;

  & > *{
    width: 80%;
    margin: auto;
    margin-bottom: 1rem;
  }

  & > input{
    height: 2.5rem;
    font-family: Pokemon-Solid; 
  }
`;
const FooterH1Submmit = styled.img`
  width: 50px;
  heigth: 50px;
  &:hover{
    width: 60px;
    heigth: 60px;
  }
`;
const Hr = styled.hr`
  width: 100vw;
`;
const FooterH2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & > a {
    display: flex;
    justify-content: center;
    margin: 1rem;
    width: 3rem;
    height: 3rem;
  }
`;
const FooterH3 = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 1rem 0 1rem;
  // height: 0rem;

  & > h6{
    height:1rem;
    margin: 0 0 1rem 0;
  }
`;