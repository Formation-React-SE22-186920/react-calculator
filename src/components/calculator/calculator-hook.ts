import { useState } from "react";
import OperationType from "../../types/operation-types";

// Hook personnalisé contenant toute la logique du composant Calculator
const useCalculatorState = () => {
  // État représentant l'affichage actuel à l'écran de la calculatrice
  const [currentNumber, setCurrentNumber] = useState('');
  // État représentant le précédent nombre entré
  const [previousNumber, setPreviousNumber] = useState('');
  // État réprésentant l'opération actuellement sélectionnée
  const [currentOperation, setCurrentOperation] = useState<OperationType | null>(null);
  // État permettant de savoir s'il faut afficher la valeur en mémoire au lieu du nombre actuel
  const [isDisplayingMemory, setIsDisplayingMemory] = useState(false);

  // Fonction permettant d'ajouter un chiffre à l'écran
  const appendDigit = (digit: number) => {
    // Ajoute un chiffre à l'écran uniquement s'il y en actuellement moins de 10
    if (currentNumber.length < 10) {
      setCurrentNumber(currentNumber + String(digit));
    }
    // Affiche le nombre actuel au lieu de la mémoire
    setIsDisplayingMemory(false);
  }

  // Fonction permettant de retirer le dernier chiffre entré
  const removeLastDigit = () => setCurrentNumber(currentNumber.slice(0, -1));
  
  // Fonction permettant de remettre la saisie à zéro
  const clearScreen = () => {
    setCurrentNumber('');
    setPreviousNumber('');
    setIsDisplayingMemory(false);
    setCurrentOperation(null);
  }

  // Fonction permettant d'appliquer l'opération actuelle et de défnir un nouveau type d'opération
  const selectOperation = (type: OperationType | null) => {
    // Applique l'opération actuelle au nombre en mémoire
    let result;
    const number1 = Number(currentNumber);
    const number2 = Number(previousNumber);
    switch (currentOperation) {
      case null:
        result = number1;
        break;
      case OperationType.Add:
        result = number2 + number1;
        break;
      case OperationType.Substract:
        result = number2 - number1;
        break;
      case OperationType.Multiply:
        result = number2 * number1;
        break;
      case OperationType.Divide:
        result = number2 / number1;
        break;
      default:
        throw new Error('Unknown operation type.');
    }
    setPreviousNumber(String(result));
    // Affiche la mémoire au lieu du nombre actuel
    setIsDisplayingMemory(true);
    // Change le type d'opération actuel
    setCurrentOperation(type);
    // Remet l'affichage actuel à zéro
    setCurrentNumber('');
  }

  // Renvoie toutes les valeurs des états, ainsi que toutes les fonctions qui permettent de les manipuler
  return {
    states: {
      currentNumber,
      previousNumber,
      currentOperation,
      isDisplayingMemory,
    },
    actions: {
      appendDigit,
      removeLastDigit,
      clearScreen,
      selectOperation,
    }
  }
}

export default useCalculatorState;
