import currentUserReducer from '@/features/currentUser/currentUserSlice'
import productReducer from '@/features/product/productSlice'
import searchReducer from '@/features/search/searchSlice'
import userReducer from '@/features/user/userSlice'
import themeReducer from '@/features/theme/themeSlice'
import cartReducer from '@/features/cart/cartSlice'
import errorReducer from '@/features/error/errorSlice'
import ratingReducer from '@/features/rating/ratingSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    product: productReducer,
    search: searchReducer,
    user: userReducer,
    currentUser: currentUserReducer,
    theme: themeReducer,
    cart: cartReducer,
    error: errorReducer,
    rating: ratingReducer
  }
})
