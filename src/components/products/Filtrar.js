import { Button, Grid } from "@mui/material";
import { useEffect, } from "react";
import { useUIContext } from "../../context/ui";
import { ContainerPokemons, Product, ProductAddToCart, ProductImage } from "../../styles/product";
import { Colors } from "../../styles/theme"

function Pokemon({ avatar, name, busqueda, Color1, Color2 }) {
    return (
      <Product>
      <ProductImage src={avatar}  color1={Color1} color2={Color2} />
      <ProductAddToCart variant="contained" className={(busqueda === name) ? "busqueda":""}>
          {name}
      </ProductAddToCart>
  
      </Product>
    
    );
  }

export default function Filtrar(){

  const { filtros, setFiltros, filtro, setFiltro, pfiltrados, setPFiltrados, busqueda} = useUIContext();

  const getFiltros = async (url) => {
  let res = await fetch(url),
  Filtros = await res.json();
  // console.log(Filtros.results);
  setFiltros(Filtros.results);
  }
    useEffect(() => {
        getFiltros(`https://pokeapi.co/api/v2/type`);
    },[])

    const getPokemones = async (url) => {
        let res = await fetch(url),
        Pokemones = await res.json();
        setPFiltrados([]);
        Pokemones.pokemon.map( async(e) => {
            // console.log(e);
            let res = await fetch(e.pokemon.url),
            pokemones = await res.json();
            let pokemon = {
                id: pokemones.id,
                name: pokemones.name,
                color1: pokemones.types[0].type.name,
                color2: pokemones.types[1] ? pokemones.types[1].type.name : "default",
                avatar: pokemones.sprites.front_default,
            };
            setPFiltrados((pokemons) => [...pokemons, pokemon]);
            // console.log(pokemon);
        });
    }
    
    useEffect(() => {

        getPokemones(filtro)
    }, [filtro]);


    return(
        <ContainerPokemons>
            <h1>Filtrar</h1>
            <div style={{width: "98vw", overflow: "auto", display: "flex"}}>
                {filtros.length === 0 ? (
                    <h3>Cargando...</h3>
                    ) : (
                    filtros.map((el) => (
                        <Button variant="outlined" onClick={() => setFiltro(el.url) } key={Math.random()} style={{backgroundColor: Colors[el.name]}} >{el.name}</Button>
                    ))
                )}
            </div>
            <hr/>
            <Grid
            id = "malla"  
            container
            spacing={{ xs: 2, md: 4 }}
            justifyContent="center"
            position= "relative"
            top= "5vh"
            columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {pfiltrados.length === 0 ? (
                    <h3>Cargando...</h3>
                ) : (
                pfiltrados.map((el) => (
                    <Pokemon key={Math.random()} busqueda={busqueda} name={el.name} avatar={el.avatar} Color1={el.color1} Color2={el.color2} />
                ))
                )}
            </Grid>
        </ContainerPokemons>    
    )
}
