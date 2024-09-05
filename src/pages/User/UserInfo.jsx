import UserDetails from "./UserDetails"
import { useSelector } from "react-redux"


export default function UserInfo(
  { 
    name, 
    role, 
    // level
  }
) {

  const level = useSelector((state) => { return state.level })

  return (
    <div>
      <p><span className="font-semibold" >Ghost Buster Level:</span> {level}</p>
      <UserDetails name={name} role={role} />
    </div>
  )
}