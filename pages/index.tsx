import type { NextPage } from 'next'
import React from 'react'
import App from './_app'


const Home: NextPage = () => {

  let key='something'
  const handleResize = ()=>{
      console.log('resize fired')
      key='something else'
  }

  console.log('App start')
  window.addEventListener('resize', handleResize)

  return (
    
  

        <App key = {key}/>


  )
}

export default Home
