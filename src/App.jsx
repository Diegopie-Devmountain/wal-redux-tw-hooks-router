
import TopNav from './layouts/TopNav.jsx';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <TopNav />
      <Outlet />
    </>
  )
}

export default App
