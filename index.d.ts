import SE = require('super-expressive');

// Not exported by SuperExpressive typings
declare type SubexpressionOptions = {
    namespace?: string;
    ignoreFlags?: boolean;
    ignoreStartAndEnd?: boolean;
}

type SuperExpressiveElement = (seInstance: SE) => SE;

declare function SuperExpressive(elements: SuperExpressiveElement[]): SE;

declare const startOfInput: SuperExpressiveElement;
declare const endOfInput: SuperExpressiveElement;
declare const allowMultipleMatches: SuperExpressiveElement;
declare const lineByLine: SuperExpressiveElement;
declare const caseInsensitive: SuperExpressiveElement;
declare const sticky: SuperExpressiveElement;
declare const unicode: SuperExpressiveElement;
declare const singleLine: SuperExpressiveElement;
declare const anyChar: SuperExpressiveElement;
declare const whitespaceChar: SuperExpressiveElement;
declare const nonWhitespaceChar: SuperExpressiveElement;
declare const digit: SuperExpressiveElement;
declare const nonDigit: SuperExpressiveElement;
declare const word: SuperExpressiveElement;
declare const nonWord: SuperExpressiveElement;
declare const wordBoundary: SuperExpressiveElement;
declare const nonWordBoundary: SuperExpressiveElement;
declare const newline: SuperExpressiveElement;
declare const carriageReturn: SuperExpressiveElement;
declare const tab: SuperExpressiveElement;
declare const nullByte: SuperExpressiveElement;

declare function string(s: string): SuperExpressiveElement;
declare function char(c: string): SuperExpressiveElement;
declare function range(from: string, to: string): SuperExpressiveElement;
declare function anyOfChars(chars: string): SuperExpressiveElement;
declare function anythingButChars(chars: string): SuperExpressiveElement;
declare function anythingButString(s: string): SuperExpressiveElement;
declare function anythingButRange(from: string, to: string): SuperExpressiveElement;
declare function namedBackreference(name: string): SuperExpressiveElement;
declare function backreference(name: string): SuperExpressiveElement;

declare function optional(element: SuperExpressiveElement): SuperExpressiveElement;
declare function zeroOrMore(element: SuperExpressiveElement): SuperExpressiveElement;
declare function zeroOrMoreLazy(element: SuperExpressiveElement): SuperExpressiveElement;
declare function oneOrMore(element: SuperExpressiveElement): SuperExpressiveElement;
declare function oneOrMoreLazy(element: SuperExpressiveElement): SuperExpressiveElement;

declare function capture(elements: SuperExpressiveElement[]): SuperExpressiveElement;
declare function anyOf(elements: SuperExpressiveElement[]): SuperExpressiveElement;
declare function group(elements: SuperExpressiveElement[]): SuperExpressiveElement;
declare function assertAhead(elements: SuperExpressiveElement[]): SuperExpressiveElement;
declare function assertNotAhead(elements: SuperExpressiveElement[]): SuperExpressiveElement;
declare function assertBehind(elements: SuperExpressiveElement[]): SuperExpressiveElement;
declare function assertNotBehind(elements: SuperExpressiveElement[]): SuperExpressiveElement;

declare function exactly(n: number, element: SuperExpressiveElement): SuperExpressiveElement;
declare function atLeast(n: number, element: SuperExpressiveElement): SuperExpressiveElement;
declare function between(a: number, b: number, element: SuperExpressiveElement): SuperExpressiveElement;
declare function betweenLazy(a: number, b: number, element: SuperExpressiveElement): SuperExpressiveElement;

declare function namedCapture(index: number, elements: SuperExpressiveElement[]): SuperExpressiveElement;
declare function subexpression(expr: SE, opts: SubexpressionOptions): SuperExpressiveElement;

declare function toRegexString(se: SE): string;
declare function toRegex(se: SE): RegExp;

