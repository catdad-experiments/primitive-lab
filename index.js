#!/usr/bin/env node
/* jshint node: true, esversion: 6 */

// TODO log issues:
// * add clipPath
// * use viewBox, remove width and height

const { promisify } = require('util');
const path = require('path');
const fs = require('fs');

const primitive = require('primitive');
const { steps, input } = require('minimist')(process.argv.slice(2));

const svg = require('./svg.js');

const root = path.resolve('.');

const inpath = path.resolve(root, input);
const { name, ext, dir } = path.parse(inpath);
const outpath = path.resolve(dir, `${name}-${steps}.svg`);

console.log(inpath, '-->', outpath);

primitive({
  input: inpath,
  numSteps: Number(steps)
}).then((output) => {
  console.log('final score:', `${(output.score * 100).toFixed(3)}%`);
  return output.toSVG();
}).then((svg) => {
  return promisify(fs.writeFile)(outpath, svg);
}).then(() => {
  console.log('done?');
}).catch(err => {
  console.error(err);
  process.exitCode = 1;
});
