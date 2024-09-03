import { NavLink } from "react-router-dom"
export default function TopNav() {

  return (
    <nav className='bg-brand-orange-300 h-14 flex'>
      <NavLink to="/">
        <img className='h-full' src='/logo.jpeg' />
      </NavLink>
      <div className='flex flex-row justify-evenly items-center w-5/6 text-center px-8 h-full'>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/create">Create Task</NavLink>
        <NavLink to="/user">User Account</NavLink>
      </div>
    </nav>
  )
}