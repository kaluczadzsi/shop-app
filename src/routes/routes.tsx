/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom'
import { App } from '../App'
import { ROUTES } from '../constants/routes'
import { Error, Login, Main, Products, Profile, SignUp, Category } from '../pages'
import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'

export const ROUTER = createBrowserRouter([
  {
    path: ROUTES.root,
    element: <App />,
    children: [
      {
        path: ROUTES.root,
        element: <Main />,
        children: [
          {
            path: ROUTES.root,
            element: <Products />
          },
          {
            path: ROUTES.category,
            element: <Category />
          },
          { path: '/*', element: <Error /> }
        ]
      },
      {
        path: ROUTES.login,
        element: <PublicRoutes />,
        children: [{ path: ROUTES.login, element: <Login /> }]
      },
      {
        path: ROUTES.signup,
        element: <PublicRoutes />,
        children: [{ path: ROUTES.signup, element: <SignUp /> }]
      },
      {
        path: ROUTES.profile,
        element: <PrivateRoutes />,
        children: [{ path: ROUTES.profile, element: <Profile /> }]
      }
    ]
  }
])
