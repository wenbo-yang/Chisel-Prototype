import { NeuralNetwork } from "brain.js";
import { INeuralNetworkData, INeuralNetworkDatum } from "brain.js/dist/neural-network";
import { convertBitmapDataToZeroOneMat } from './Chisel-Global-Common-Libraries/src/lib/binaryMatUtils';
import Jimp from "jimp";

async function readTrainingData(): Promise<Jimp[]> {
    const trainingDataImages = [];
    for (let i = 0; i < 18; i++) {
        const url = `./trainingData/character_zou/zou_charactrer_prepared_${i.toString()}_test.png`;
        trainingDataImages.push(await Jimp.read(url));
    }

    return trainingDataImages;
}

async function readAndConvertTrainingData(trainingDataImages: Jimp[]): Promise<number[][]> {
    const trainingDataNumber: number[][] = [];

    for (let i = 0; i < trainingDataImages.length; i++) {
        trainingDataNumber.push([]);
        const bmpBuffer = await trainingDataImages[i].getBufferAsync(Jimp.MIME_BMP)
        const mat = await convertBitmapDataToZeroOneMat(bmpBuffer, 250);

        const flattenedData = mat.flat(1);
        trainingDataNumber.push(flattenedData);
    }

    return trainingDataNumber;
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


const trainingImages = await readTrainingData();
const trainingData = await readAndConvertTrainingData(trainingImages);
const net = await trainModel(trainingData);
const testData = await readAndConvertTestData();
const result = await runTestDataThroughNeuralNetwork(net, testData);

console.log(result);

