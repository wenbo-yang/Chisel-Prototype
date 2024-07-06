import * as child from 'child_process';
import { readAndConvertTestData, readAndConvertTrainingDataNiu, readAndConvertTrainingDataYang, readAndConvertTrainingDataZou } from './prototyping';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const zou = await readAndConvertTrainingDataZou();
const yang = await readAndConvertTrainingDataYang();
const niu = await readAndConvertTrainingDataNiu();
const testData = await readAndConvertTestData();

console.log(testData);


