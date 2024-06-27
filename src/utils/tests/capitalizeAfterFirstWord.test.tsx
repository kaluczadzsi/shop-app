import { capitalizeAfterFirstWord } from '../capitalizeAfterFirstWord'

describe('capitalizeAfterFirstWord test', () => {
  test('capitalizes the first letter of each word after the first', () => {
    const input = 'this is a sentence'
    const expectedOutput = 'thisIsASentence'

    expect(capitalizeAfterFirstWord(input)).toBe(expectedOutput)
  })
})
