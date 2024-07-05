import { convertBitmapDataToZeroOneMat } from '../Chisel-Global-Common-Libraries/src/lib/binaryMatUtils';
import { NeuralNetwork } from 'brain.js';
import { INeuralNetworkData, INeuralNetworkDatum } from 'brain.js/dist/neural-network';
import Jimp from 'jimp';

export async function readTrainingData(): Promise<Jimp[]> {
    const trainingDataImages = [];
    for (let i = 0; i < 18; i++) {
        const url = `./trainingData/character_zou/zou_charactrer_prepared_${i.toString()}_test.png`;
        trainingDataImages.push(await Jimp.read(url));
    }

    return trainingDataImages;
}

export async function readAndConvertTrainingData(): Promise<number[][]> {
    const trainingDataImages = await readTrainingData();
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

export async function readTestData(): Promise<Jimp[]> {
    const urls = [
        './testData/running_man_image_4_preprocessed_mirror_skeletonized_test.png',
        './testData/running_man_image_4_preprocessed_mirror.png',
        './testData/running_man_image_5_preprocessed_mirror_skeletonized_test.png',
        './testData/running_man_image_5_preprocessed_mirror.png',
    ];

    const testDataImages = [];
    for (let i = 0; i < urls.length; i++) {
        testDataImages.push(await Jimp.read(urls[i]));
    }

    return testDataImages;
}

export async function readAndConvertTestData(): Promise<number[][]> {
    const testDataImages = await readTestData();
    const testData: number[][] = [];

    for (let i = 0; i < testDataImages.length; i++) {
        testData.push([]);
        const bmpBuffer = await testDataImages[i].getBufferAsync(Jimp.MIME_BMP)
        const mat = await convertBitmapDataToZeroOneMat(bmpBuffer, 250);

        const flattenedData = mat.flat(1);
        testData.push(flattenedData);
    }

    return testData;
}

export async function trainModel(data: number[][]): Promise<NeuralNetwork<INeuralNetworkData, any>> {
    const net = new NeuralNetwork();
    const trainingData: Array<INeuralNetworkDatum<INeuralNetworkData, INeuralNetworkData>> = [];

    for (let i = 0; i < data.length; i++) {
            let output: any = {};
            output['zou'] = 1;
            let input: INeuralNetworkData = data[i];
            trainingData.push({ input, output });
    }

    await net.trainAsync(trainingData);
    return net;
}

export async function runTestDataThroughNeuralNetwork(net: NeuralNetwork<INeuralNetworkData, any>, testData: number[][]): Promise<void> {
    for (let i = 0; i < testData.length; i++) {
        const result = net.run(testData[i]);
        console.log(result)
    }
}


