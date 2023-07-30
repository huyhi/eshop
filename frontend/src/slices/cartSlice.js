import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('cart') ?
  JSON.parse(localStorage.getItem('cart')) :
  {cartItems: []}

const fmtDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload

      const existItem = state.cartItems.find((x) => x._id === item._id)

      if (existItem) {
        state.cartItems = state.cartItems.map((x) => {
          return x._id === existItem._id ? item : x
        })
      } else {
        state.cartItems = [...state.cartItems, item]
      }
      // calculate items price
      state.itemsPrice = fmtDecimal(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

      state.shippingPrice = fmtDecimal(state.itemsPrice > 100 ? 0 : 10)

      state.itemsPrice = fmtDecimal(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

      state.totalPrice = (
        Number(state.itemsPrice) + 
        Number(state.shippingPrice) + 
        Number(state.taxPrice)
      ).toFixed(2)

      localStorage.setItem('cart', JSON.stringify(state))
    }
  }
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer