"use client";

import NavBar from "@/components/navbar";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import NewsCard from "@/components/newscard";
import NewsCardLarge from "@/components/newscardlarge";

export default function Home() {

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
      }} className="bg-neutral-900 min-h-screen text-white flex flex-col items-start justify-start p-8 pt-24 gap-16">
      {/*<NewsCard title="Megnyílt az edzőterem!" image="/images/gym.jpg" body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a massa velit. Vestibulum velit magna, volutpat et diam vel, finibus pretium nisi. Donec aliquet dolor sem, ut condimentum nibh efficitur a. Aliquam erat volutpat. Quisque imperdiet eleifend hendrerit. Donec at rhoncus purus. Donec auctor varius sagittis. Curabitur a augue sit amet sapien scelerisque dignissim ut ut mauris. Donec lacinia dolor a cursus egestas. Nulla pellentesque nisi id velit mattis, non vulputate risus molestie." />*/}
      <NewsCardLarge title="Információk a teremről" image="/images/gym.jpg" body="A Warrior GYM&copy; 2022-ben épült meg Budapesten. Az 1500 négyzetméteren elhelyezkedő épület kettő emelettel rendelkezik. A földszinten találhatóak a szabadsúlyok, illetve kézi súlyzók, szintén a fölszinten találhatóak az öltözők is. Az emeleten kardió részleg, hasazó részleg, nyújtó részleg, illetve CrossFit részleg található. Termünkben Life Fitness&copy; edzőgépek vannak, nagyon jó minőségű felszereltséggel rendelkezik termünk." />
      <NewsCardLarge invert title="Megnyílt az edzőterem" image="/images/gym.jpg" body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a massa velit. Vestibulum velit magna, volutpat et diam vel, finibus pretium nisi. Donec aliquet dolor sem, ut condimentum nibh efficitur a. Aliquam erat volutpat. Quisque imperdiet eleifend hendrerit. Donec at rhoncus purus. Donec auctor varius sagittis. Curabitur a augue sit amet sapien scelerisque dignissim ut ut mauris. Donec lacinia dolor a cursus egestas. Nulla pellentesque nisi id velit mattis, non vulputate risus molestie." />
    </motion.div>
  );
}
