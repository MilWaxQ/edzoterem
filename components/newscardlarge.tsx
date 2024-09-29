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
    <div className="w-full h-[90vh] flex lg:flex-row flex-col-reverse items-center justify-start">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="text-[50px] uppercase tracking-widest font-light text-center">{title}</p>
        <p className="p-8 font-light tracking-wider text-neutral-300 text-center">{body}</p>
      </div>
      <div className="w-full h-full relative">
        <Image className='p-2' src={image} alt="" fill style={{objectFit: "cover", objectPosition: "right"}}></Image>
        <div className="w-full h-full relative top-0 left-0 bg-neutral-900/50 lg:bg-gradient-to-l from-neutral-900 from-[1%] via-5% via-neutral-900/50 to-neutral-900 backdrop-blur-sm"></div>
      </div>
    </div> : 
    <div className="w-full h-[90vh] flex lg:flex-row flex-col items-center justify-start">
      <div className="w-full h-full relative">
        <Image className='p-2' src={image} alt="" fill style={{objectFit: "cover", objectPosition: "left"}}></Image>
        <div className="block w-full h-full relative top-0 left-0 bg-neutral-900/75 lg:bg-transparent lg:bg-gradient-to-r from-neutral-900 from-[0%] via-5% via-neutral-900/50 to-neutral-900 backdrop-blur-sm"></div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="text-[50px] uppercase tracking-widest font-light text-center">{title}</p>
        <p className="p-8 font-light tracking-wider text-neutral-300 text-center">{body}</p>
      </div>
    </div>
  )
}

export default NewsCardLarge