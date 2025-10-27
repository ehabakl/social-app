import React from 'react'
import { RingLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <RingLoader color='#163ee3' />
    </div>
  )
}
