// part of the code extracted from. https://github.com/epeli/underscore.string/blob/master/cleanDiacritics.js
const from = 'ąàáäâãåæăćčĉęèéëêĝĥìíïîĵłľńňòóöőôõðøśșşšŝťțţŭùúüűûñÿýçżźž'
const to = 'aaaaaaaaaccceeeeeghiiiijllnnoooooooossssstttuuuuuunyyczzz'.split('')

function replaceCharIfNeeded (char: string): string {
  const index = from.indexOf(char)
  return index === -1 ? char : to[index]
}

export function slugify (str: string, allowQueryParams: boolean, removeDots: boolean): string {
  const validCharsRegEx = allowQueryParams
    ? /[^a-z0-9\\. \- ? =]/g // only letters numbers, dashes, dots, equals and question marks
    : /[^a-z0-9\\. -]/g // only letters numbers, dashes and dots
  let tempStr = str
    .toLowerCase()
    .replace(/.{1}/g, replaceCharIfNeeded)
    .replace(validCharsRegEx, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes
  if (removeDots) tempStr = tempStr.replaceAll('.', '')
  return tempStr
}

const weigths = {
  ll: 8,
  ch: 5,
  rr: 8,
  a: 1,
  b: 3,
  c: 3,
  d: 2,
  e: 1,
  f: 4,
  g: 2,
  h: 4,
  i: 1,
  j: 8,
  l: 1,
  m: 3,
  n: 1,
  ñ: 8,
  o: 1,
  p: 3,
  q: 5,
  r: 1,
  s: 1,
  t: 1,
  u: 1,
  v: 4,
  x: 8,
  y: 4,
  z: 10
} as const

type Tokens = keyof typeof weigths
type Reducer = (word: string) => (acc: number, token: Tokens) => number

export const reducer: Reducer = word => (acc, token) => {
  const occurencies = [...word.matchAll(token as unknown as RegExp)].length
  acc += occurencies * weigths[token]
  word.replaceAll(token, '')
  return acc
}

// @ts-expect-error
export const weigth = (word: string): unknown => Object.keys(weigths).reduce(reducer(slugify(word)), 0)
