import { Provider } from 'react-redux';
import UserBody from "./UserBody";
import userStore from './userReducer.js'

export default function User() {

  const user = {
    id: 1,
    name: 'Morgan',
    role: 'Intern',
    level: 'mid'
  };

  return (
    <main className="flex justify-center flex-col">
      <h1 className="text-center text-4xl font-matemasie mt-10">Account</h1>
      <Provider store={userStore} >
        <UserBody name={user.name} role={user.role} level={user.level} />
      </Provider>
    </main>
  )
}