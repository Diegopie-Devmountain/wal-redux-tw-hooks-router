import UserBody from "./UserBody.jsx";

export default function User() {

  const user = {
    id: 1,
    name: 'Morgan',
    role: 'Intern',
    level: 'mid'
  };

  return (
    <main className="flex justify-center flex-col">
      <h1 className="title-primary">Account</h1>
        <UserBody name={user.name} role={user.role} level={user.level} />
    </main>
  )
}