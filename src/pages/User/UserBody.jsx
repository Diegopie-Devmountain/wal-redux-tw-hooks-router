import UserInfo from './UserInfo'

export default function UserBody({ name, role, level }) {

  return (
    <section className='w-4/5 m-auto mt-8 md:w-1/2 bg-brand-purple-100 py-4 px-8 rounded-md text-white'>
      <h2 className='text-center font-bold'>Edit Account Details</h2>
      <UserInfo name={name} role={role} level={level} />
    </section>
  );
}