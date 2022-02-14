// Fonction permettant de générer un tableau contenant tous les nombres de 0 à n (exclus)
const range = (n: number) => Array.from({length: n}, (x, i) => i);

export default range;
