import Container from '@/components/common/Container'
import { Home } from 'lucide-react'
import React, { useEffect } from 'react'

interface pathname {
    pathName: string
}

const LinkHeader = ({ pathName }: pathname) => {

    return (
        <div className='p-4  border-b border-gray-100 bg-white'>
            <Container>
                <div className='flex gap-3  items-center '>
                    <Home />
                    <h1>/</h1>
                    <h1 className='text-store'>{pathName.split('').map((l,index)=> index === 1 ? l.toLocaleUpperCase() : l.toLocaleLowerCase() ).slice(1,)} </h1>
                </div>

            </Container>
        </div>
    )
}

export default LinkHeader
