export const guessType = (pesos:any, pontos:any) =>{
    //ponderacao
    let sum = pontos.x * pesos.x + pontos.y * pesos.y;
    return sum > 0 ? 1: -1;
}
export const generateRandomWeights = () => {
    return {
        x: Math.random() * 2 -1,
        y: Math.random() * 2 -1
    }
}

export const train = (weights:any, point:any, expectedType:number) => {
    let guess = guessType(weights, point);

    let error = expectedType - guess;

    return {
        x: weights.x + error * point.x,
        y: weights.y + error * point.y,
    }
}