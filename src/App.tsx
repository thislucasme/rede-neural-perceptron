import React, { useState } from 'react';
import './App.css';
import { Chart } from './components/Chart';
import { generatePoints, getType, generatePoint} from './util/dataGenerator';
import { guessType, generateRandomWeights, train } from './neuron';

function App() {

  const [points, setPoints] = useState(generatePoints(100));
  const [weigts, setWeigths] = useState(generateRandomWeights)

  const charPointClassifier = (point:{}[]) => {
    //return getType(point)
    return guessType(weigts, point)
  }

  const traingInteraction = 10000;
  const onTrainClick = ()=> {
    let newWeights = weigts;
    for(let i =0; i < traingInteraction; i++){
      let newPont = generatePoint();
      newWeights = train(newWeights, newPont, getType(newPont));
    }
    setWeigths(newWeights)
  }

  return (
    <div style={{width: '95%', height: '500px'}} className="App">
    <Chart points={points} pointClassifier={charPointClassifier}/>

    <p>
      Weights: x {weigts.x}, y {weigts.y}
    </p>
    <p>
      <button className='train' onClick={onTrainClick}>Train</button>
    </p>
    </div>
  );
}

export default App;
