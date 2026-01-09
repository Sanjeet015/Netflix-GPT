
import Login from './Login'
import Browse from './Browse'
import Footer from './Footer'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {useDispatch} from "react-redux"

const Body = () => {

  const dispatch = useDispatch()

  const appRouter = createBrowserRouter([
    {
      path:"/",
      element:<><Login/><Footer/></>
    },
    {
      path:"/browse",
      element:<Browse/>
    },
  ])

  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body