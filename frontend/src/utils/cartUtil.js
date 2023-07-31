export const fmtDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = (state) => {
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

  return state
}