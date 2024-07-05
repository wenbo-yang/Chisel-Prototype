import { NeuralNetwork } from "brain.js";
import { INeuralNetworkData, INeuralNetworkDatum } from "brain.js/dist/neural-network";
import Jimp from "jimp";

async function readTrainingData(): Promise<Jimp[]> {
    throw new Error('Not Implemented');
}

async function readAndConvertTrainingData(): Promise<number[][]> {
    throw new Error('Not Implemented');
}

async function readTestData(): Promise<Jimp[]> {
    throw new Error('Not Implemented');
}

async function readAndConvertTestData(): Promise<number[][]> {
    throw new Error('Not Implmented');
}


async function trainModel(data: number[][]): Promise<NeuralNetwork<INeuralNetworkData, any>> {
    const net = new NeuralNetwork();
    const trainingData: Array<INeuralNetworkDatum<INeuralNetworkData, INeuralNetworkData>> = [];

    for (let i = 0; i < data.length; i++) {

            let output: any = {};
            output['走'] = 1;
            let input: INeuralNetworkData = data[i];
            trainingData.push({ input, output });
    }

    await net.trainAsync(trainingData);
    return net;
}

async function runTestDataThroughNeuralNetwork(net: NeuralNetwork<INeuralNetworkData, any>, testData: number[][]): Promise<any> {
    throw new Error("Function not implemented.");
}


const data = await readAndConvertTrainingData();
const net = await trainModel(data)
const testData = await readAndConvertTestData();
const result = await runTestDataThroughNeuralNetwork(net, testData);

console.log(result);



