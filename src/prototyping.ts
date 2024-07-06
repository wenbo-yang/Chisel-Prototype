import { convertBitmapDataToZeroOneMat } from '../Chisel-Global-Common-Libraries/src/lib/binaryMatUtils';
import Jimp from 'jimp';

export async function readTrainingData(character: string): Promise<Jimp[]> {
    const trainingDataImages = [];
    for (let i = 0; i < 18; i++) {
        const url = `./src/trainingData/character_${character}/${character}_charactrer_prepared_${i.toString()}_test.png`;
        trainingDataImages.push(await Jimp.read(url));
    }

    return trainingDataImages;
}

export async function readAndConvertTrainingDataZou(): Promise<number[][]> {
    const trainingDataImages = await readTrainingData('zou');
    const trainingDataNumber: number[][] = [];

    for (let i = 0; i < trainingDataImages.length; i++) {
        const bmpBuffer = await trainingDataImages[i].getBufferAsync(Jimp.MIME_BMP)
        const mat = await convertBitmapDataToZeroOneMat(bmpBuffer, 250);

        const flattenedData = mat.flat(1);
        trainingDataNumber.push(flattenedData);
    }

    return trainingDataNumber;
}

export async function readAndConvertTrainingDataYang(): Promise<number[][]> {
    const trainingDataImages = await readTrainingData('yang');
    const trainingDataNumber: number[][] = [];

    for (let i = 0; i < trainingDataImages.length; i++) {
        const bmpBuffer = await trainingDataImages[i].getBufferAsync(Jimp.MIME_BMP)
        const mat = await convertBitmapDataToZeroOneMat(bmpBuffer, 250);

        const flattenedData = mat.flat(1);
        trainingDataNumber.push(flattenedData);
    }

    return trainingDataNumber;
}

export async function readAndConvertTrainingDataNiu(): Promise<number[][]> {
    const trainingDataImages = await readTrainingData('niu');
    const trainingDataNumber: number[][] = [];

    for (let i = 0; i < trainingDataImages.length; i++) {
        const bmpBuffer = await trainingDataImages[i].getBufferAsync(Jimp.MIME_BMP)
        const mat = await convertBitmapDataToZeroOneMat(bmpBuffer, 250);

        const flattenedData = mat.flat(1);
        trainingDataNumber.push(flattenedData);
    }

    return trainingDataNumber;
}

export async function readTestData(): Promise<Jimp[]> {
    const urls = [
        './src/testData/running_man_image_4_preprocessed_mirror_skeletonized_test.png',
        './src/testData/running_man_image_4_preprocessed_mirror.png',
        './src/testData/running_man_image_5_preprocessed_mirror_skeletonized_test.png',
        './src/testData/running_man_image_5_preprocessed_mirror.png',
    ];

    const testDataImages = [];
    for (let i = 0; i < urls.length; i++) {
        testDataImages.push((await Jimp.read(urls[i])).resize(50,50));
    }

    return testDataImages;
}

export async function readAndConvertTestData(): Promise<number[][]> {
    const testDataImages = await readTestData();
    const testData: number[][] = [];

    for (let i = 0; i < testDataImages.length; i++) {
        const bmpBuffer = await testDataImages[i].getBufferAsync(Jimp.MIME_BMP)
        const mat = await convertBitmapDataToZeroOneMat(bmpBuffer, 250);

        const flattenedData = mat.flat(1);
        testData.push(flattenedData);
    }

    return testData;
}

// export async function trainModel(zou: number[][], yang: number[][], niu: number[][]): Promise<NeuralNetwork<INeuralNetworkData, any>> {
//     const net = new NeuralNetwork();
//     const trainingData: Array<INeuralNetworkDatum<INeuralNetworkData, INeuralNetworkData>> = [];

//     for (let i = 0; i < zou.length; i++) {
//             let output: any = {};
//             output['zou'] = 1;
//             let input: INeuralNetworkData = zou[i];
//             trainingData.push({ input, output });
//     }

//     for (let i = 0; i < yang.length; i++) {
//         let output: any = {};
//         output['yang'] = 1;
//         let input: INeuralNetworkData = yang[i];
//         trainingData.push({ input, output });
//     }

//     for (let i = 0; i < niu.length; i++) {
//         let output: any = {};
//         output['niu'] = 1;
//         let input: INeuralNetworkData = niu[i];
//         trainingData.push({ input, output });
//     }

//     await net.trainAsync(trainingData);
//     return net;
// }

// export async function runTestDataThroughNeuralNetwork(net: NeuralNetwork<INeuralNetworkData, any>, testData: number[][]): Promise<void> {
//     for (let i = 0; i < testData.length; i++) {
//         const result = net.run(testData[i]);
//         console.log(result)
//     }
// }


