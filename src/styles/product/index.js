import styled from "@emotion/styled";
import { Button, InputLabel  } from "@mui/material";
import { Box, width } from "@mui/system";
// import { slideInBottom, slideInRight } from "../../animation";
import { Colors } from "../theme";

export const ContainerPokemons = styled(Box)(({ theme }) => ({
  position: "relative", 
  top: "18vh",
  marginBottom: "200px"
}));
export const ContainerForm = styled(Box)(({ theme }) => ({
  margin: "auto",
  width: "60%"
}));


export const Product = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  // [theme.breakpoints.up("md")]: {
  //   position: "relative",
  // },
}));

export const ProductImage = styled("img")(({ src, color1, color2 }) => ({
  src: `url(${src})`,
  width: "80%",
  padding: '10px',
  background: `radial-gradient(${Colors[color2]} 33%, ${Colors[color1]} 33%)`,
  backgroundSize: "5px 5px",
  borderRadius: "50%"
}));

export const Colores = styled(Box)(({ color1, color2 }) => ({
  width: "100%",
  padding: '10px',
  background: `radial-gradient(${Colors.color1} 33%, ${Colors.color2} 33%)`,
  borderRadius: "50%"
}));

export const ProductAddToCart = styled(InputLabel)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "pokemon-solid",
  padding: "8px",
  fontSize: "1rem",
  background: Colors.secondary,
  opacity: 0.9,
  borderRadius: "1rem",
  margin: "1rem 0"
}));


