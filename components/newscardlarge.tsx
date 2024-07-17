import React from 'react'
import Image from "next/image";

interface NewsCardLargeProps {
  title: string
  body: string
  image: string
  invert?: boolean
}

const NewsCardLarge: React.FC<NewsCardLargeProps> = ({title, body, image, invert}) => {
  return (
    invert ? 
    <div className="w-full h-[90vh] flex flex-row items-center justify-start">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="text-[50px] uppercase tracking-widest font-light">{title}</p>
        <p className="p-8 font-light tracking-wider text-neutral-300 text-center">{body}</p>
      </div>
      <div className="w-full h-full relative">
        <Image src={image} alt="" fill></Image>
        <div className="w-full h-full relative top-0 left-0 bg-gradient-to-l from-neutral-900 from-[1%] via-5% via-neutral-900/50 to-neutral-900 backdrop-blur-sm"></div>
      </div>
    </div> : 
    <div className="w-full h-[90vh] flex flex-row items-center justify-start">
      <div className="w-full h-full relative">
        <Image src={image} alt="" fill></Image>
        <div className="w-full h-full relative top-0 left-0 bg-gradient-to-r from-neutral-900 from-[1%] via-5% via-neutral-900/50 to-neutral-900 backdrop-blur-sm"></div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="text-[50px] uppercase tracking-widest font-light">{title}</p>
        <p className="p-8 font-light tracking-wider text-neutral-300 text-center">{body}</p>
      </div>
    </div>
  )
}

export default NewsCardLarge