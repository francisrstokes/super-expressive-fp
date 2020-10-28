const SE = require('super-expressive');
const SuperExpressiveConstructor = SE().constructor;

const seSymbol = Symbol('superExpressive');

const elementFn = fn => {
  fn[seSymbol] = true;
  return fn;
}

const assertIsSuperExpressiveObject = se => {
  if (!(se instanceof SuperExpressiveConstructor)) {
    throw new TypeError('se must be a SuperExpressive instance');
  }
};

const assertIsSuperExpressiveElement = element => {
  if (!element[seSymbol]) {
    throw new TypeError('element must be a valid SuperExpressiveFP element');
  }
};

const dispatchToGetter = getter => elementFn(se => {
  assertIsSuperExpressiveObject(se);
  return se[getter];
});

const dispatchToMethod = method => (...args) => elementFn(se => {
  assertIsSuperExpressiveObject(se);
  return se[method](...args);
});

const dispatchToGetterQuantifier = getter => element => elementFn(se => {
  assertIsSuperExpressiveObject(se);
  assertIsSuperExpressiveElement(element);

  return element(se[getter]);
});

const dispatchToMethodQuantifier = method => (arg, element) => elementFn(se => {
  assertIsSuperExpressiveObject(se);
  assertIsSuperExpressiveElement(element);

  return element(se[method](arg));
});

const dispatchToMethodQuantifier2 = method => (arg1, arg2, element) => elementFn(se => {
  assertIsSuperExpressiveObject(se);
  assertIsSuperExpressiveElement(element);

  return element(se[method](arg1, arg2));
});

const dispatchToGroupingGetter = getter => elements => elementFn(se => {
  assertIsSuperExpressiveObject(se);

  let currentSe = se[getter];
  for (const element of elements) {
    assertIsSuperExpressiveElement(element);
    currentSe = element(currentSe);
  }
  assertIsSuperExpressiveObject(currentSe);
  return currentSe.end();
});

const SuperExpressive = (elements = []) => {
  let currentSe = SE();
  for (const element of elements) {
    assertIsSuperExpressiveElement(element);
    currentSe = element(currentSe);
  }
  assertIsSuperExpressiveObject(currentSe);
  return currentSe;
};

const startOfInput = dispatchToGetter('startOfInput');
const endOfInput = dispatchToGetter('endOfInput');
const allowMultipleMatches = dispatchToGetter('allowMultipleMatches');
const lineByLine = dispatchToGetter('lineByLine');
const caseInsensitive = dispatchToGetter('caseInsensitive');
const sticky = dispatchToGetter('sticky');
const unicode = dispatchToGetter('unicode');
const singleLine = dispatchToGetter('singleLine');
const anyChar = dispatchToGetter('anyChar');
const whitespaceChar = dispatchToGetter('whitespaceChar');
const nonWhitespaceChar = dispatchToGetter('nonWhitespaceChar');
const digit = dispatchToGetter('digit');
const nonDigit = dispatchToGetter('nonDigit');
const word = dispatchToGetter('word');
const nonWord = dispatchToGetter('nonWord');
const wordBoundary = dispatchToGetter('wordBoundary');
const nonWordBoundary = dispatchToGetter('nonWordBoundary');
const newline = dispatchToGetter('newline');
const carriageReturn = dispatchToGetter('carriageReturn');
const tab = dispatchToGetter('tab');
const nullByte = dispatchToGetter('nullByte');

const string = dispatchToMethod('string');
const char = dispatchToMethod('char');
const range = dispatchToMethod('range');
const anyOfChars = dispatchToMethod('anyOfChars');
const anythingButChars = dispatchToMethod('anythingButChars');
const anythingButString = dispatchToMethod('anythingButString');
const anythingButRange = dispatchToMethod('anythingButRange');
const namedBackreference = dispatchToMethod('namedBackreference');
const backreference = dispatchToMethod('backreference');

const optional = dispatchToGetterQuantifier('optional');
const zeroOrMore = dispatchToGetterQuantifier('zeroOrMore');
const zeroOrMoreLazy = dispatchToGetterQuantifier('zeroOrMoreLazy');
const oneOrMore = dispatchToGetterQuantifier('oneOrMore');
const oneOrMoreLazy = dispatchToGetterQuantifier('oneOrMoreLazy');

const capture = dispatchToGroupingGetter('capture');
const anyOf = dispatchToGroupingGetter('anyOf');
const group = dispatchToGroupingGetter('group');
const assertAhead = dispatchToGroupingGetter('assertAhead');
const assertNotAhead = dispatchToGroupingGetter('assertNotAhead');
const assertBehind = dispatchToGroupingGetter('assertBehind');
const assertNotBehind = dispatchToGroupingGetter('assertNotBehind');

const exactly = dispatchToMethodQuantifier('exactly');
const atLeast = dispatchToMethodQuantifier('atLeast');
const between = dispatchToMethodQuantifier2('between');
const betweenLazy = dispatchToMethodQuantifier2('betweenLazy');

const namedCapture = (index, elements) => elementFn(se => {
  assertIsSuperExpressiveObject(se);

  let currentSe = se.namedCapture(index);
  for (const element of elements) {
    assertIsSuperExpressiveElement(element);
    currentSe = element(currentSe);
  }
  assertIsSuperExpressiveObject(currentSe);
  return currentSe.end();
});

const subexpression = (expr, opts) => elementFn(se => {
  assertIsSuperExpressiveObject(se);
  assertIsSuperExpressiveObject(expr);
  return se.subexpression(expr, opts);
});

const toRegexString = se => {
  assertIsSuperExpressiveObject(se);
  return se.toRegexString();
}
const toRegex = se => {
  assertIsSuperExpressiveObject(se);
  return se.toRegex();
}

module.exports = {
  SuperExpressive,
  startOfInput,
  endOfInput,
  allowMultipleMatches,
  lineByLine,
  caseInsensitive,
  sticky,
  unicode,
  singleLine,
  anyChar,
  whitespaceChar,
  nonWhitespaceChar,
  digit,
  nonDigit,
  word,
  nonWord,
  wordBoundary,
  nonWordBoundary,
  newline,
  carriageReturn,
  tab,
  nullByte,
  string,
  char,
  range,
  anyOfChars,
  anythingButChars,
  anythingButString,
  anythingButRange,
  optional,
  zeroOrMore,
  zeroOrMoreLazy,
  oneOrMore,
  oneOrMoreLazy,
  capture,
  anyOf,
  group,
  assertAhead,
  assertNotAhead,
  assertBehind,
  assertNotBehind,
  backreference,
  namedBackreference,
  namedCapture,
  exactly,
  atLeast,
  between,
  betweenLazy,
  subexpression,
  toRegexString,
  toRegex,
};
