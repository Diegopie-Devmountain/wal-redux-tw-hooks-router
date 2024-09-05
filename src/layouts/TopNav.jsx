import { NavLink } from "react-router-dom"

export default function TopNav() {

  return (
    <nav className="h-14 flex bg-brand-orange-300">
    
    <NavLink to='/'>
      <img className="h-full" src="/logo.jpeg"/>
    </NavLink>
    <div className="flex flex-row w-5/6 justify-evenly items-center px-8 bg">
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/create'>Create Task</NavLink>
      <NavLink to='/user'>User Account</NavLink>
    </div>
   
    </nav>
  )
}