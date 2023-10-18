import React from 'react'
import DefaultHeader from '../components/DefaultHeader'

export default function NotFound() {
    return (
        
        <>
        <DefaultHeader/>
        <div
            style={{
                padding: "4rem 0",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height:'50%',
                width: '100%',
                fontWeight:'700',
                fontSize:"large"
            }}
        >404 - Page Not Found</div>
        </>
    )
}
