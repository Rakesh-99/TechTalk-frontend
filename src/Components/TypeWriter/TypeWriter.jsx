import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter'

const TypeWriter = () => {

    const [text] = useTypewriter({
        words: ['Core Java', 'JavaScript', 'React', 'Node', 'Express', 'MongoDB'],
        loop: {},
        typeSpeed: 120
    });



    return (
        <>
            <div className="">
                <h1 className='text-white text-2xl'>Welcome to <span className='text-violet-400 font-bold'>TECH TALK </span></h1>
            </div>

            <h1 className='text-3xl text-white font-semibold'>I'll be uploading blog on
                <span className='text-4xl text-violet-400 ml-5 '>{text} <Cursor /></span>
            </h1>

        </>
    )
}

export default TypeWriter