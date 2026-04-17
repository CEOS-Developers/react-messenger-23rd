import { RouterProvider } from 'react-router-dom'
import { MembersProvider } from '@/context/MembersContext'
import { router } from '@/routes/router'

function App() {
  return (
    <MembersProvider>
      <RouterProvider router={router} />
    </MembersProvider>
  )
}

export default App
