import React, { useEffect, useState } from 'react'
import PageHeading from '../components/PageHeading'
import axios from 'axios'
import { FaSpinner } from 'react-icons/fa'

const NotFound = () => {
    const [randomQuote, setRandomQuote] = useState([])

    useEffect(() => {
        fetchRandomQuote()
    }, [])

    const fetchRandomQuote = async () => {
        try {
            const apiKey = "fMu6j30p9gO9Q/TqMKi+Tg==xvlHM4MrSCE6QRhl"
            const category = ""
            
            const response = await axios.get(`https://api.api-ninjas.com/v1/quotes`, {
                headers: {
                    'X-Api-Key': apiKey,
                }
            })

            setRandomQuote(response.data)
        } catch (error) {
            console.error('Failed to fetch random quote', error)
        }
    }

    return (
        <div id='NotFound'>
            <PageHeading 
                heading="404 - Page not found"
                subHeading={`The page you are looking for does not exist`}
                suffix=""
            />

            <section className='grid grid-cols-2 gap-10 mb-10'>
                <span id="randomQoute" className='flex flex-col gap-2'>
                    <hr className='mb-5'/>
                    
                    {randomQuote.length === 0 ? (
                        <FaSpinner className="animate-spin text-gray-500 mx-auto" size={20} />
                    ) : (
                        <>
                            <blockquote className='italic'>
                                "{randomQuote[0]?.quote}"
                            </blockquote>

                            <h2 className='font-bold'>{randomQuote[0]?.author}</h2>
                            <h5 className='text-slate-400'>{randomQuote[0]?.category}</h5>
                        </>
                    )}
                </span>
            </section>
        </div>
    )
}

export default NotFound