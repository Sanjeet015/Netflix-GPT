import React from 'react'

function VideoTitle({title,overview}) {
  return (
    <div className='pt-[12%] px-12 absolute text-white bg-linear-to-r from-black w-screen aspect-video'>
      <h1 className='text-4xl font-bold'>{title}</h1>
      <p className='py-6 text-lg w-1/3'>{overview}</p>
      <div className='flex gap-2'>
        <button className='bg-white text-black px-8 py-2 rounded-sm text-lg hover:bg-opacity-50'>▶︎Play</button>
        <button className='px-6 py-2 bg-black/20 rounded-sm text-lg'>ⓘMore info</button>
      </div>
    </div>
  )
}

export default VideoTitle