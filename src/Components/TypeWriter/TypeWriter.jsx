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

            <h1 className='text-3xl text-white font-semibold max-[500px]:text-xl'>I'll be uploading blog on
                <span className='text-4xl text-violet-400 ml-5 max-[500px]:text-xl '>{text} <Cursor /></span>
            </h1>

        </>
    )
}

export default TypeWriter