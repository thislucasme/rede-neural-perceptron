import {
  HStack, useToast, VStack, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { Button, Input, Text } from '@mantine/core';
import React, { useState } from 'react';
import './App.css';
import { Chart } from './components/Chart';
import { generateRandomWeights, guessType, train } from './neuron';
import { generatePoint, generatePoints, getType } from './util/dataGenerator';


function App() {
  const toast = useToast()
  const [points, setPoints] = useState(generatePoints(100));
  const [weigts, setWeigths] = useState(generateRandomWeights)
  const [iteracoes, setIteracoes] = useState(100);

  const [valorX, setValorX] = useState('');
  const [valorY, setValorY] = useState('');

  const [previsao, setPrevisao] = useState<number>(0)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const charPointClassifier = (point: {}[]) => {


    //return getType(point)
    // const obj = {
    //   x: 2782.033860012798,
    //   y: -2810.410407802219

    // }
    return guessType(weigts, point)
    //
  }

  const predizer = () => {


    //return getType(point)
    // const pesos = {
    //   x: 2782.033860012798,
    //   y: -2810.410407802219

    // }

    const ponto = {
      x: valorX,
      y: valorY

    }
    setPoints([...points, { x: Number.parseFloat(valorX), y: Number.parseFloat(valorY) }])
    const gess = guessType(weigts, ponto);
    console.log(gess)
    setPrevisao(gess)
    //
  }

  const traingInteraction = iteracoes;
  const onTrainClick = () => {
    let newWeights = weigts;
    for (let i = 0; i < traingInteraction; i++) {
      let newPont = generatePoint();
      newWeights = train(newWeights, newPont, getType(newPont));
      console.log(newWeights)

    }
    toast({
      title: 'Rede neural treinada',
      description: "Rede neural treinada com sucesso.",
      status: 'success',
      duration: 2000,
      isClosable: true,
    })

    setWeigths(newWeights)
  }

  return (
    <>
      <VStack w="100%" mr={10}>
        <HStack w="full" h={"600px"} mr={"20px"}>

          <Chart points={points} pointClassifier={charPointClassifier} />

          <VStack w="400px">
            <Text style={{ fontSize: "20px" }}>Peso: x {weigts.x}</Text>
            <Text style={{ fontSize: "20px" }}>Peso: x {weigts.y}</Text>
            <Input value={iteracoes} style={{ width: "100%" }} size='md' name={(iteracoes).toString()} onChange={(e: any) => setIteracoes(e.target.value)} type={"number"} placeholder={"Iterações"} />
            <Button style={{ width: "100%" }} size='md' color={"green"} className='train' onClick={onTrainClick}>Treinar</Button>
            <Input style={{ width: "100%" }} size='md' name={valorX} onChange={(e: any) => setValorX(e.target.value)} type={"number"} placeholder={"x"} />
            <Input style={{ width: "100%" }} size='md' name={valorY} onChange={(e: any) => setValorY(e.target.value)} type={"number"} placeholder={"y"} />
            <Button onClick={() => {
              predizer();
              onOpen();
            }} color={"yellow"} variant='outline' style={{ width: "100%" }} size='md'>Adivinhar</Button>

            <VStack w={"full"}>
              <Text style={{ fontSize: "20px" }}>Previsão de cor do ponto: x {valorY} e y {valorY}</Text>
              {previsao < 0 ? <VStack borderRadius={"100%"} w={"10px"} h={"10px"} bg={"blue"}></VStack> : <VStack borderRadius={"100%"} w={"10px"} h={"10px"} bg={"red"}></VStack>}
            </VStack>
          </VStack>
        </HStack>

      </VStack >

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Previsão</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Text style={{ fontSize: "20px" }}>Previsão de cor do ponto: x {valorX} e y {valorY}:</Text>
              {previsao < 0 ?
                <VStack borderRadius={"100%"} w={"10px"} h={"10px"} bg={"blue"}></VStack>
                :
                <VStack borderRadius={"100%"} w={"10px"} h={"10px"} bg={"red"}></VStack>}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>
              Ok
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  );
}

export default App;
