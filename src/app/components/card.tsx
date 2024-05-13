/* eslint-disable @typescript-eslint/no-misused-promises */
import { FiTrash } from 'react-icons/fi'
import React, { useEffect, useState } from 'react'
// import Quill from 'quill'

import hljs from 'highlight.js'
import './styles.css'
import 'quill/dist/quill.snow.css'
import 'highlight.js/styles/github-dark.css'

// const Quill = dynamic(() => import('quill'), { ssr: false })

interface CardProps {
  id: string
  removeCard: (id: string) => void
}

const formats = [
  'background',
  'bold',
  'color',
  'font',
  'code',
  'italic',
  'link',
  'size',
  'strike',
  'script',
  'underline',
  'blockquote',
  'header',
  'indent',
  'list',
  'align',
  'direction',
  'code-block',
  'formula'
]

// create delete icon...
const Card: React.FC<CardProps> = ({ id, removeCard }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState('')
  useEffect(() => {
    const loadQuill = async (): Promise<void> => {
      const Quill = (await import('quill')).default
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
        theme: 'snow',
        formats
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
        theme: 'snow',
        formats
      })
    }
    void loadQuill()
  }, [])

  return (
    <div className='m-3 p-5 shadow-sm rounded-xl mb-5 border border-gray-300'>
      <div className='flex flex-col lg:flex-row gap-6 mb-6 lg:mb-24'>
        <div className= 'basis-1/2'>
          <div className='text-xl mb-1'>Term</div>
          <div id={`question-${id}`}>
          </div>
        </div>
        <div className= 'basis-1/2'>
          <div className='text-xl mb-1'>Definition</div>
          <div id={`answer-${id}`}>
          </div>
        </div>
      </div>
      <FiTrash size={30} className='cursor-pointer' onClick={() => { removeCard(id) }}/>
    </div>
  )
}

export default Card