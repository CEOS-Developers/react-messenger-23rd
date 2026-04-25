import { Outlet, useLocation } from 'react-router-dom'
import NavBar from '@/components/NavBar'

function PublicLayout() {
  const location = useLocation()

  const showNav = ['/myprofile', '/chatlist', '/file', '/apps', '/setting'].includes(location.pathname)

  return (
    <div className="app">
      <main>
        <Outlet />
      </main>

      {showNav && <NavBar />}
    </div>
  )
}

export default PublicLayout
