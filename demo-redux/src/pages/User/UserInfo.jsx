import UserDetails from "./UserDetails"

export default function UserInfo({ name, role, level }) {

  return (
    <div>
      <p><span className="font-semibold">Ghost Buster Level:</span> {level}</p>
      <UserDetails name={name} role={role} />
    </div>
  )
}