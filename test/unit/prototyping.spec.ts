import { readAndConvertTestData, readAndConvertTrainingDataNiu, readAndConvertTrainingDataYang, readAndConvertTrainingDataZou, runTestDataThroughNeuralNetwork, trainModel } from '../../src/prototyping'

describe('prototyping', () => {
    it('can recognize character with bold stroke training set and skeleton test data', async () => {
        const zou = await readAndConvertTrainingDataZou();
        const yang = await readAndConvertTrainingDataYang();
        const niu = await readAndConvertTrainingDataNiu();
        const testData = await readAndConvertTestData();

        const net = await trainModel(zou, yang, niu);
        await runTestDataThroughNeuralNetwork(net, [testData[1]]);
    }, 3000000);
});