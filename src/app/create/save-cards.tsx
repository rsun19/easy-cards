/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use server'

const saveCards = async (card: any) => {
  const { id, question, answer } = card
  console.log(id, question, answer)
}

export default saveCards
