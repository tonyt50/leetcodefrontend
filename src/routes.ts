export const home = "/";
export const hookstest = "/hookstest";
export const connect4 = "/connect4";
export const leetcode = "/leetcode";

export const leetcodeSubRoutes = {
  longestSubstring: "/longestsubstring",
  rotateImage: "/rotateImage",
  scratch: "/scratch"
};

export const leetcodeRoutes = (Object.keys(leetcodeSubRoutes) as Array<keyof typeof leetcodeSubRoutes>).reduce<
  { [T in keyof typeof leetcodeSubRoutes]: string }
>(
  (accum, key) => {
    accum[key] = leetcode + leetcodeSubRoutes[key];
    return accum;
  },
  { longestSubstring: "", rotateImage: "", scratch: "" }
);
