import { Letters } from "./types";

/**
 * find longest string without duplicats chasraacters in it
 * @param str word to
 * @returns number of longest string
 * @example
 *  getLongestSubstringLength("retested") returns 4
 */
const getLongestSubstringLength = (str: string) => {
  const chars = [...str];
  const letters: Letters = {};
  let lngsubstr: number = 0;
  let curr: number = 0;

  for (let i = 0; i < chars.length; i++) {
    if (letters.hasOwnProperty(chars[i])) {
      if (i - curr <= letters[chars[i]]) {
        if (curr > lngsubstr) {
          lngsubstr = curr;
        }
        curr = i - letters[chars[i]];
      } else {
        curr++;
      }
    } else {
      curr++;
    }
    letters[chars[i]] = i;
  }

  if (curr > lngsubstr) {
    lngsubstr = curr;
  }

  return lngsubstr;
};

export default getLongestSubstringLength;
