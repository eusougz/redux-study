import {compose, pipe} from 'lodash/fp';

let input = '  javascript  ';

const trim = str => str.trim();
const wrap = type => str => `<${type}>${str}</${type}>`;
const toLowerCase = str => str.toLowerCase();

const transform = pipe(trim, toLowerCase, wrap('div'));

transform(input);
