// import { useState, useEffect } from 'react'
// import { db } from '../data/db'
// import type { CartItem } from '../types'

// export const useCart = () => {

//     const initialCart = (): CartItem[] => {
//         const localStorageCart = localStorage.getItem('cart')
//         return localStorageCart ? JSON.parse(localStorageCart) : []
//     }

//     const [data] = useState(db)
//     const [cart, setCart] = useState(initialCart)

//     useEffect(() => {
//         localStorage.setItem('cart', JSON.stringify(cart))
//     }, [cart])

//     return {
//         data,
//         cart,
//     }
// }