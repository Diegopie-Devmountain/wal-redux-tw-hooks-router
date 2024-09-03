export default function UserInfo({ name, role }) {

  return (
    <div>
      <h1>User Info</h1>
      <UserDetails name={name} role={role} />
    </div>
  )
}