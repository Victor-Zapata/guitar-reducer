import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

export type CartActions =
    { type: 'add-to-cart', payload: { item: Guitar } } |
    { type: 'remove-from-cart', payload: { id: Guitar['id'] } } |
    { type: 'decrease-quantity', payload: { id: Guitar['id'] } } |
    { type: 'increase-quantity', payload: { id: Guitar['id'] } } |
    { type: 'clear-cart' }

export type CartState = {
    data: Guitar[],
    cart: CartItem[]
}

const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const initialState: CartState = {
    data: db,
    cart: initialCart()
}

export const cartReducer = (state: CartState = initialState, action: CartActions) => {
    switch (action.type) {
        case 'add-to-cart':
            const itemExists = state.cart.find
                (guitar => guitar.id === action.payload.item.id)
            let updatedCart: CartItem[] = []
            if (itemExists) { // existe en el carrito
                updatedCart = state.cart.map((item) => {
                    if (item.id === action.payload.item.id) {
                        if (item.quantity < 5) {
                            return { ...item, quantity: item.quantity + 1 }
                        } else { return item }
                    } else {
                        return item
                    }
                })
            } else {
                const newItem: CartItem = { ...action.payload.item, quantity: 1 }
                updatedCart = [...state.cart, newItem]
            } return {
                ...state,
                cart: updatedCart
            }

        case 'remove-from-cart':
            const updatedCartFilter = state.cart.filter(item => item.id !== action.payload.id)

            return {
                ...state,
                cart: updatedCartFilter
            }

        case 'decrease-quantity':
            const updatedCartDecrese = state.cart.map(item => {
                if (item.id === action.payload.id && item.quantity > 1) {
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    }
                } else {
                    return item
                }
            })
            return {
                ...state,
                cart: updatedCartDecrese
            }

        case 'increase-quantity':
            const updatedCartIncrese = state.cart.map(item => {
                if (item.id === action.payload.id && item.quantity < 5) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                } else {
                    return item
                }
            })
            return {
                ...state,
                cart: updatedCartIncrese
            }

        case 'clear-cart':
            return {
                ...state,
                cart: []
            }

        default:
            return state
    }
}