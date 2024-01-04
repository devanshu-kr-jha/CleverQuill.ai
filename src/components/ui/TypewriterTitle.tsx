"use client"
import React from 'react' //tsrfc
import Typewriter from 'typewriter-effect'

type Props = {}

export default function TypewriterTitle({}: Props) {
  return (
    <div className="">
      <Typewriter
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
        .typeString("🚀 Supercharged Productivity.")
            .pauseFor(1000)
            .deleteAll()
            .typeString("🤖 AI-Powered Insights.")
            .start();
      }}
      />
    </div>
    
  )
}