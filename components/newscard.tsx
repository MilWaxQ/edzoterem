import React from 'react'
import Image from 'next/image';

interface NewsCardProps {
  title: string
  body: string
  image: string
}

const NewsCard: React.FC<NewsCardProps> = ({title, body, image}) => {
  return (
    <div className="w-[600px] h-auto flex flex-row items-start justify-center mt-8 relative mx-auto -translate-x-1/4">
      <span className="relative h-full overflow-hidden rounded-l-md">
        <Image src={image} width={600} height={400} alt="" />
        <div className="w-[345px] h-[700px] bg-neutral-900 z-10 absolute -top-36 translate-x-[105%] rotate-[-30deg] border-4 border-white pt-48 pb-40 flex flex-col pr-10 items-end justify-between"></div>
        <div className='absolute h-full top-0 left-0 w-20 bg-gradient-to-r from-neutral-900 to-transparent z-10'></div>
      </span>
      <div className="w-[300px] h-full -right-40 z-10 absolute flex flex-col items-center justify-between p-2">
        <h1 className="text-2xl tracking-wide">{title}</h1>
        <p className="text-end font-light">{body}</p>
      </div>
    </div>
  )
}

export default NewsCard