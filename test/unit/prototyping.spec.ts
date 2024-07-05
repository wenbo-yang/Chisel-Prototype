import { NeuralNetwork, likely } from 'brain.js';
import { readAndConvertTestData, readAndConvertTrainingData, runTestDataThroughNeuralNetwork, trainModel } from '../../src/prototyping'

describe('prototyping', () => {
    it('can recognize character with bold stroke training set and skeleton test data', async () => {
        const trainingData = await readAndConvertTrainingData();
        const testData = await readAndConvertTestData();

        const net = await trainModel(trainingData);
        await runTestDataThroughNeuralNetwork(net, testData);
    });
});