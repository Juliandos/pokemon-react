import "./App.css";
import { Container, Stack } from "@mui/material";
// import { Slideshow } from "./components/banner/Slideshow.jsx";
import {Slideshow, Slide, TextoSlide} from '../src/components/banner/Slideshow'
import Appbar from "./components/appbar";
import { ThemeProvider } from "@mui/system";
import theme from "./styles/theme";
import { UIProvider } from "./context/ui";
import { useEffect } from "react";
import Pokemones from "./components/products/Pokemones";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Buscar from "./components/products/Buscar";
import Filtrar from "./components/products/Filtrar";
// import Banner from "./components/banner";
import Footer from "./components/products/footer";
import { useState } from "react";
import pokemon1 from "../src/data/pokemon1.jpg";
import pokemon2 from "../src/data/pokemon2.jpg";
import pokemon3 from "../src/data/pokemon3.jpeg";
import pokemon4 from "../src/data/pokemon4.webp";


function App() {
  // const { buscar } = useUIContext();
  const [auto, setauto] = useState(false)

  useEffect(() => {
    document.title = "Pokemon React App";
  });
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container
          disableGutters
          maxWidth="xl"
          sx={{
            background: "#fff",
          }}>
          <Stack>
            <UIProvider>
              <Appbar/>
              <Slideshow controles={true} setauto={setauto} auto={auto}>
                <Slide>
                  <a href="https://www.falconmaters.com">
                    <img src={pokemon1} alt=""/>
                  </a>
                  <TextoSlide>
                    <p>15% descuento en productos Apple</p>
                  </TextoSlide>
                </Slide>
                <Slide>
                  <a href="https://www.falconmaters.com">
                    <img src={pokemon2} alt=""/>
                  </a>
                  <TextoSlide>
                    <p>15% descuento en productos Apple</p>
                  </TextoSlide>
                </Slide>
                <Slide>
                  <a href="https://www.falconmaters.com">
                    <img src={pokemon3} alt=""/>
                  </a>
                  <TextoSlide>
                    <p>15% descuento en productos Apple</p>
                  </TextoSlide>
                </Slide>
                <Slide>
                  <a href="https://www.falconmaters.com">
                    <img src={pokemon4} alt=""/>
                  </a>
                  <TextoSlide>
                    <p>15% descuento en productos Apple</p>
                  </TextoSlide>
                </Slide>
              </Slideshow>
              <Routes>
                <Route path="/" element = {<Pokemones/>} /> 
                <Route path="/Pokemones" element = {<Pokemones/>} />
                <Route path="/buscar" element = {<Buscar/>}/>
                <Route path="/filtrar" element = {<Filtrar/>} />
              </Routes>
              <Footer/>
            </UIProvider>
          </Stack>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
