import { readAndConvertTestData, readAndConvertTrainingDataNiu, readAndConvertTrainingDataYang, readAndConvertTrainingDataZou } from '../../src/prototyping'

describe('prototyping', () => {
    it('can recognize character with bold stroke training set and skeleton test data', async () => {
        const zou = await readAndConvertTrainingDataZou();
        const yang = await readAndConvertTrainingDataYang();
        const niu = await readAndConvertTrainingDataNiu();
        const testData = await readAndConvertTestData();
    }, 3000000);
});