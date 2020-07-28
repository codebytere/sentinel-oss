'use strict';

const fs = require('fs');

const result = [];
const braceMatcher = /^[^_]*{/gm;

// Sentinel will only display statistics.
const clean = (dirty) => {
  const trimmed = dirty.toString().trim();
  const start = trimmed.indexOf('{') + 1;
  const end = trimmed.indexOf('}') + 1;
  const cleaned = `{ ${trimmed.substring(start, end)} }`;
  return JSON.parse(cleaned);
};

// Parse unit tests.
if (fs.existsSync('unit.json')) {
  const unitTests = fs.readFileSync('unit.json', 'utf8');
  if (braceMatcher.test(unitTests)) {
    const cleaned = clean(unitTests);
    result.push(cleaned);
    console.warn('Unit test report successfully cleaned');
  } else {
    console.warn('Unit test report improperly generated');
  }
} else {
  console.warn('Unit test report missing');
}

// Parse integration tests.
if (fs.existsSync('integration.json')) {
  const integrationTests = fs.readFileSync('integration.json');
  if (braceMatcher.test(integrationTests)) {
    const cleaned = clean(integrationTests);
    result.push(cleaned);
    console.warn('Integration test report successfully cleaned');
  } else {
    console.warn('Integration test report improperly generated');
  }
} else {
  console.warn('Integration test report missing');
}

// Write final cleaned reports to file.
fs.writeFileSync('report.json', JSON.stringify(result));
