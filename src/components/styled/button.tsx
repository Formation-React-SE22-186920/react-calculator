import styled from "styled-components";

// Interface définissant la structure des propriétés attendues (props) par le composant Button
interface ButtonProps {
  buttonColor: string
  row: number;
  column: number;
}

// Composant représentant le style d'un bouton
const Button = styled.button<ButtonProps>`
  position: relative;
  background-color: ${(props) => props.buttonColor};
  color: white;
  border: none;
  border-radius: .25em;
  padding: .5em 1em;
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.column};

  &:after {
    position: absolute;
    background-color: white;
    content: '';
    opacity: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: opacity .3s ease;
  }

  &:hover:after {
    opacity: .3;
  }

  &:focus {
    outline: 2px solid ${(props) => props.buttonColor};
  }
`

export default Button;
