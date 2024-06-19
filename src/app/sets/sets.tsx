'use client'
import React from 'react'

interface SetProps {
  sets: React.JSX.Element[]
}

const Set: React.FC<SetProps> = ({ sets }): React.JSX.Element => {
  return (
    <>
      {sets.map((set, index) => {
        return (
          <div key={index}>
            {set}
          </div>
        )
      })}
    </>
  )
}

export default Set
