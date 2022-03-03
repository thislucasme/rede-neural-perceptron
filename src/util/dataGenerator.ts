export const generatePoints = (quantidade:number) => {
    let points = [];
    for(let i = 0; i < quantidade; i++){
        points.push(generatePoint())
    }
    return points;
}
export const generatePoint = () => {
    return {
        x : Math.random() * 100,
        y: Math.random() * 100,
    }
}
export const getType = ({x, y}:any) => {
    return (x > y) ? 1 : -1;
}

