
import { Outlet } from 'react-router-dom';
import TopNav from './layouts/TopNav.jsx';

function App() {

  return (
    <>
      <TopNav />
      <Outlet />
      </>
  )
}

export default App
