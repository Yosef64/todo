import React from 'react'

export default function List({handlecheck,todos}) {

  return (
    <>
      {todos.map(
        to=><li>{to}</li>
      
        )
        }
    </>
  )
}
