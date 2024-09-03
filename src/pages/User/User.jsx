import UserBody from "./UserBody.jsx";

export default function User() {

  const user = {
    id: 1,
    name: 'Morgan',
    role: 'Intern',
    level: 'mid'
  };

  return (
    <main>
      <h1>Account</h1>
        <UserBody name={user.name} role={user.role} level={user.level} />
    </main>
  )
}