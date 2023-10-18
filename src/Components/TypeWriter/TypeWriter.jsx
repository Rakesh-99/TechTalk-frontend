import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter'

const TypeWriter = () => {

    const [text] = useTypewriter({
        words: ['Core Java', 'JavaScript', 'React', 'Git' , 'and so on...'],
        loop: {},
        typeSpeed: 120
    });



    return (
        <>

            <h1 className=' text-white font-semibold text-lg sm:text-2xl'>I'll be uploading blog on
                <span className=' text-violet-400 ml-2 text-lg sm:text-3xl  '>{text} <Cursor /></span>
            </h1>

        </>
    )
}

export default TypeWriter