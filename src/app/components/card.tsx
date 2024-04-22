import { FiTrash } from 'react-icons/fi'
import React, { useEffect, useState } from 'react'
import Quill from 'quill'

import hljs from 'highlight.js'
import './styles.css'
import 'quill/dist/quill.snow.css'
import 'highlight.js/styles/github-dark.css'

// const Quill = dynamic(() => import('quill'), { ssr: false })

interface CardProps {
  id: string
  removeCard: (id: string) => void
}

// create delete icon...
const Card: React.FC<CardProps> = ({ id, removeCard }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState('')
  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const quillQuestion = new Quill(`#question-${id}`, {
        modules: {
          syntax: { hljs },
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', { list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block']
          ]
        },
        placeholder: 'Compose an epic...',
        theme: 'snow'
      })

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const quillAnswer = new Quill(`#answer-${id}`, {
        modules: {
          syntax: { hljs },
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', { list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block']
          ]
        },
        placeholder: 'Compose an epic...',
        theme: 'snow'
      })
    }, 250)
  })

  return (
    <div className='m-3 p-5 shadow-lg rounded-xl mb-5'>
      <div className='flex justify-items-stretch justify-stretch gap-6 mb-16'>
        <div className= 'flex-auto'>
          <div id={`question-${id}`}>
          </div>
        </div>
        <div className= 'flex-auto'>
          <div id={`answer-${id}`}>
          </div>
        </div>
      </div>
      <FiTrash size={30} className='cursor-pointer' onClick={() => { removeCard(id) }}/>
    </div>
  )
}

export default Card
