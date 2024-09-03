export default function UserBody({ name, role }) {
  return (
    <div>
      <h1>Main Content</h1>
      <UserInfo name={name} role={role} />
    </div>
  );
}