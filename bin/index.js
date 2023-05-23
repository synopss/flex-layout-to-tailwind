#! /usr/bin/env node

const fn = require("../src/functions");
fn.processFiles(".", fn.convertFile);
