import React from 'react'

function VideoTitle({title,overview}) {
  return (
    <div className='pt-[12%] px-4 md:px-12 absolute text-white bg-linear-to-r from-black w-full aspect-video'>
      <h1 className='text-2xl md:text-4xl font-bold'>{title}</h1>
      <p className='hidden md:inline-block py-6 text-lg w-1/3'>{overview}</p>
      <div className='flex gap-2 mt-2 md:mt-0'>
        <button className='bg-white text-black px-2 py-1 md:px-8 md:py-2 rounded-sm text-sm md:text-lg hover:scale-110 transition-transform duration-200 ease-in-out'>▶︎Play</button>
        <button className='px-3 md:px-6 py-1 md:py-2 bg-gray-800 rounded-sm text-sm md:text-lg  hover:scale-110 transition-transform duration-200 ease-in-out'>ⓘMore info</button>
      </div>
    </div>
  )
}

export default VideoTitle