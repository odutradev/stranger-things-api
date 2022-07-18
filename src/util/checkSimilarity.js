/**
 * @name didYouMean
 * @author 5antos#4876
 * @param {string} str Input string
 * @param {string[]} array Array of strings corresponding to potential matches
 * @param {number} [threshold=60] This function will only consider strings with similarity values of <threshold>% or more. Defaults to 60% (recommended)
 * @returns {string|null} String most similar to the input string. Returns null if no string is found according to the threshold value
 */

/**
 * This method uses the Jaro similarity algorithm to measure the similarity between two strings (words or phrases).
 * Adapted from https://www.geeksforgeeks.org/jaro-and-jaro-winkler-similarity/
 * @name checkSimilarity
 * @author 5antos#4876
 * @param {string} str1 First string
 * @param {string} str2 Second string
 * @returns {number} Number between 0 and 1, where 1 means the strings are equal and 0 means no similarity between the strings
 */

export const checkSimilarity = (str1, str2) =>  {
    if (str1 === str2) return 1.0
  
    const len1 = str1.length
    const len2 = str2.length
  
    const maxDist = ~~(Math.max(len1, len2)/2)-1
    let matches = 0
  
    const hash1 = []
    const hash2 = []
  
    for(var i=0; i<len1; i++)
      for(var j=Math.max(0, i-maxDist); j<Math.min(len2, i+maxDist+1); j++)
        if (str1.charAt(i) === str2.charAt(j) && !hash2[j]) {
          hash1[i]=1
          hash2[j]=1
          matches++
          break
        }
  
    if (!matches) return 0.0
  
    let t = 0
    let point = 0
  
    for(var k=0; k<len1; k++)
      if (hash1[k]) {
        while(!hash2[point])
          point++
  
        if (str1.charAt(k) !== str2.charAt(point++))
          t++
      }
  
    t/=2
  
    return ( (matches/len1) + (matches/len2) + ((matches-t)/matches) )/3.0
  }

export const  didYouMean = (str, array, threshold=60)  => {

    return array
      .map(e => { return {e, v: checkSimilarity(str, e)} }) // checkSimilarity function can be found in this repository
      .filter(({v}) => v >= threshold/100)
      .reduce((_, curr, i, arr) => arr[i].v > curr ? arr[i].v : curr.e, null)
  }