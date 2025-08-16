import React from 'react'


interface Price {
    price: string
}
const PriceFormatter = ({ price }: Price) => {
    const priceNumber = Number(price)
    const formattedPrice = priceNumber.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
 
    return (
        <div className='text-store font-light'>{formattedPrice}</div>
    )
}

export default PriceFormatter