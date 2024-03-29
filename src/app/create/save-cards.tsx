/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use server'

const saveCards = async (title: string, cards: Map<string, string>) => {
  // console.log(cards)
  cards.forEach((value, key) => {
    console.log(title)
    console.log(key)
    console.log(value)
  })
}

export default saveCards
