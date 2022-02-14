import OperationType from "../../types/operation-types";
import range from "../../utils/range";
import Button from "../styled/button";
import ButtonGrid from "../styled/button-grid";
import useCalculatorState from "./calculator-hook";
import { Container, Screen } from './styles';

// La liste de toutes les propriétés à appliquer aux boutons d'opérations
const operationButtonsProps = [
  { type: OperationType.Add, caption: '+' },
  { type: OperationType.Substract, caption: '-' },
  { type: OperationType.Multiply, caption: 'x' },
  { type: OperationType.Divide, caption: '÷' },
]

// Composant représentant une calculatrice
const Calculator = () => {
  const { states, actions } = useCalculatorState();

  // Rendu du composant
  return (
    <Container>

      {/* Écran de la calculatrice */}
      <Screen>
        {states.isDisplayingMemory ?
          states.previousNumber :
          states.currentNumber.length === 0 ? '0' : states.currentNumber
        }
      </Screen>

      {/* Boutons de la calculatrice */}
      <ButtonGrid>

        {
          // Génère les boutons représentant les chiffres
          range(10).map(
            number => (
              <Button
                key={number}
                onClick={() => actions.appendDigit(number)}
                tabIndex={0}
                buttonColor="#007bff"
                row={number === 0 ? 5 : 4 - Math.trunc((number - 1) / 3)}
                column={number === 0 ? 2 : (number - 1) % 3 + 1}
              >
                {number}
              </Button>
            )
          )
        }

        {/* Bouton "remettre à zéro" */}
        <Button
          onClick={() => actions.clearScreen()}
          buttonColor="#dc3545"
          row={1}
          column={2}
        >
          Clear
        </Button>

        {/* Bouton "revenir en arrière" */}
        <Button
          onClick={() => actions.removeLastDigit()}
          buttonColor="#dc3545"
          row={1}
          column={3}
        >
          ←
        </Button>

        {
          // Génère les boutons d'opération
          operationButtonsProps.map(
            (buttonProps, index) => (
              <Button 
                row={index + 1} 
                column={4} 
                buttonColor="#ffc107" 
                onClick={() => actions.selectOperation(buttonProps.type)}
              >
                {buttonProps.caption}
              </Button>
            )
          )
        }

        {/* Bouton "égal" */}
        <Button 
          row={5} 
          column={4} 
          buttonColor="#28a745" 
          onClick={() => actions.selectOperation(null)}
        >
          =
        </Button>

      </ButtonGrid>
      
    </Container>
  )
}

export default Calculator;
