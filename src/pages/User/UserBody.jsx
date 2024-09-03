import UserInfo from './UserInfo'

export default function UserBody({ name, role, level }) {

  return (
    <section>
      <h2>Edit Account Details</h2>
      <UserInfo name={name} role={role} level={level} />
    </section>
  );
}