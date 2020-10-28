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

module.exports.SuperExpressive = (elements = []) => {
  let currentSe = SE();
  for (const element of elements) {
    assertIsSuperExpressiveElement(element);
    currentSe = element(currentSe);
  }
  assertIsSuperExpressiveObject(currentSe);
  return currentSe;
};

module.exports.startOfInput = dispatchToGetter('startOfInput');
module.exports.endOfInput = dispatchToGetter('endOfInput');
module.exports.allowMultipleMatches = dispatchToGetter('allowMultipleMatches');
module.exports.lineByLine = dispatchToGetter('lineByLine');
module.exports.caseInsensitive = dispatchToGetter('caseInsensitive');
module.exports.sticky = dispatchToGetter('sticky');
module.exports.unicode = dispatchToGetter('unicode');
module.exports.singleLine = dispatchToGetter('singleLine');
module.exports.anyChar = dispatchToGetter('anyChar');
module.exports.whitespaceChar = dispatchToGetter('whitespaceChar');
module.exports.nonWhitespaceChar = dispatchToGetter('nonWhitespaceChar');
module.exports.digit = dispatchToGetter('digit');
module.exports.nonDigit = dispatchToGetter('nonDigit');
module.exports.word = dispatchToGetter('word');
module.exports.nonWord = dispatchToGetter('nonWord');
module.exports.wordBoundary = dispatchToGetter('wordBoundary');
module.exports.nonWordBoundary = dispatchToGetter('nonWordBoundary');
module.exports.newline = dispatchToGetter('newline');
module.exports.carriageReturn = dispatchToGetter('carriageReturn');
module.exports.tab = dispatchToGetter('tab');
module.exports.nullByte = dispatchToGetter('nullByte');

module.exports.string = dispatchToMethod('string');
module.exports.char = dispatchToMethod('char');
module.exports.range = dispatchToMethod('range');
module.exports.anyOfChars = dispatchToMethod('anyOfChars');
module.exports.anythingButChars = dispatchToMethod('anythingButChars');
module.exports.anythingButString = dispatchToMethod('anythingButString');
module.exports.anythingButRange = dispatchToMethod('anythingButRange');
module.exports.namedBackreference = dispatchToMethod('namedBackreference');
module.exports.backreference = dispatchToMethod('backreference');

module.exports.optional = dispatchToGetterQuantifier('optional');
module.exports.zeroOrMore = dispatchToGetterQuantifier('zeroOrMore');
module.exports.zeroOrMoreLazy = dispatchToGetterQuantifier('zeroOrMoreLazy');
module.exports.oneOrMore = dispatchToGetterQuantifier('oneOrMore');
module.exports.oneOrMoreLazy = dispatchToGetterQuantifier('oneOrMoreLazy');

module.exports.capture = dispatchToGroupingGetter('capture');
module.exports.anyOf = dispatchToGroupingGetter('anyOf');
module.exports.group = dispatchToGroupingGetter('group');
module.exports.assertAhead = dispatchToGroupingGetter('assertAhead');
module.exports.assertNotAhead = dispatchToGroupingGetter('assertNotAhead');
module.exports.assertBehind = dispatchToGroupingGetter('assertBehind');
module.exports.assertNotBehind = dispatchToGroupingGetter('assertNotBehind');

module.exports.exactly = dispatchToMethodQuantifier('exactly');
module.exports.atLeast = dispatchToMethodQuantifier('atLeast');
module.exports.between = dispatchToMethodQuantifier2('between');
module.exports.betweenLazy = dispatchToMethodQuantifier2('betweenLazy');

module.exports.namedCapture = (index, elements) => elementFn(se => {
  assertIsSuperExpressiveObject(se);

  let currentSe = se.namedCapture(index);
  for (const element of elements) {
    assertIsSuperExpressiveElement(element);
    currentSe = element(currentSe);
  }
  assertIsSuperExpressiveObject(currentSe);
  return currentSe.end();
});

module.exports.subexpression = (expr, opts) => elementFn(se => {
  assertIsSuperExpressiveObject(se);
  assertIsSuperExpressiveObject(expr);
  return se.subexpression(expr, opts);
});

module.exports.toRegexString = se => {
  assertIsSuperExpressiveObject(se);
  return se.toRegexString();
};

module.exports.toRegex = se => {
  assertIsSuperExpressiveObject(se);
  return se.toRegex();
};
