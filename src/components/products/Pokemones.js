import {  Grid, Button } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import {
  Product,
  ProductAddToCart,
  ProductImage,
  ContainerPokemons
} from "../../styles/product";
import { useUIContext } from "../../context/ui";


function Pokemon({ avatar, name, busqueda, Color1, Color2 }) {
  return (
    <Product>
      <ProductImage src={avatar} color1={Color1} color2={Color2} />
      <ProductAddToCart variant="contained" className={(busqueda === name) ? "busqueda":""}>
          {name}
      </ProductAddToCart>
    </Product>
  );
}

export default function Pokemones() {

  const { pokemons, setPokemons, offset, setOffset, busqueda } = useUIContext();
  
  useEffect(() => {
    const getPokemons = async (url) => {
      setPokemons([]);
      let res = await fetch(url),
        json = await res.json();
  
      json.results.forEach(async (el) => {
        let res = await fetch(el.url),
        json = await res.json();
  
        let pokemon = {
          id: json.id,
          name: json.name,
          color1: json.types[0].type.name,
          color2: json.types[1] ? json.types[1].type.name : "default",
          avatar: json.sprites.front_default,
        };
        setPokemons((pokemons) => [...pokemons, pokemon]);
      }); 
    };
    getPokemons(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`);
  }, [offset, setPokemons]);

  return (
    <ContainerPokemons>
      <h1 style={{textAlign: "center"}}>Peticiones Asíncronas en Hooks</h1>
      <div style={{ position: "sticky", top: "13vh", zIndex: "15" , display: "flex", width: "80%", justifyContent:"space-around", margin: "auto" }}>
        <Button variant="contained" onClick={() => setOffset(offset === 0 ? 0 : offset-20)}>Atras</Button>
        <Button variant="contained" onClick={() =>setOffset(offset+20)}>Adelante</Button>
      </div>
        <Grid
          // className={classes.btn}
          id = "malla"  
          container
          spacing={{ xs: 2, md: 4 }}
          justifyContent="center"
          position= "relative"
          top= "12vh"
          columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {pokemons.length === 0 ? (
              <h3>Cargando...</h3>
            ) : (
              pokemons.map((el) => (
                <Pokemon key={Math.random()} busqueda={busqueda} name={el.name} avatar={el.avatar} Color1={el.color1} Color2={el.color2} />
              ))
            )}
        </Grid>
    </ContainerPokemons>
  );
}
