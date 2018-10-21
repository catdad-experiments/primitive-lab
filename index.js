/* jshint node: true, esversion: 6 */

const { promisify } = require('util');
const fs = require('fs');

const primitive = require('primitive');

const svg = require('./svg.js');

const root = 'D:\\Workspace\\Photography\\primitive';
const steps = 3;

const input = root + '\\wire-dove.jpg';
const output = root + `\\api-dove-${steps}.svg`;

primitive({
  input,
  numSteps: steps
}).then((output) => {
  return svg(output);
}).then((svg) => {
  return promisify(fs.writeFile)(output, svg);
}).then(() => {
  console.log('done?');
}).catch(err => {
  console.error(err);
  process.exitCode = 1;
});
