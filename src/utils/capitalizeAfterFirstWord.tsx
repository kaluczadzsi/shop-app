export const capitalizeAfterFirstWord = (str: string) => {
  let words = str.split(' ')

  words = words.map((word, index) => {
    if (index === 0) {
      return word
    }
    return word.charAt(0).toUpperCase() + word.slice(1)
  })

  return words.join('')
}
