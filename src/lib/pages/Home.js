import React, { useEffect } from 'react'
import Hero from '../containers/Hero'
import HorizontalScroll from '../containers/HorizontalScroll'

export default function Home() {

    useEffect(()=>{
        document.title = "Buyit - Online Shopping"
    },[])

    return (
        <>
            <Hero />
            <HorizontalScroll />
        </>
    )
}
