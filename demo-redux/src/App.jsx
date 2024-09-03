import { Outlet } from 'react-router-dom';
import './App.css';
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
