import { useState } from "react";
import UserDetailsButtons from "./UserDetailsButtons";

export default function UserDetails(
  {
    name,
    role
  }) {

  const [isEditing, setIsEditing] = useState(false);

  const salary = 52000;


  const handleSave = () => {

  }

  return (
    <div className="mt-4">
      <h2 className="text-center font-bold">User Details</h2>

      {
        !isEditing
          ?
          <p><span className="font-semibold">Name: </span>{name}</p>
          :
          <label>
            Name
            <input className="ml-3 text-black" type="text" />
          </label>
      }
      {
        !isEditing
          ?
          <p><span className="font-semibold">Role: </span>{role}</p>
          :
          <div className="flex">
            <label htmlFor="role">Role</label>
            <input className="ml-3 text-black" id="role" type="text"  />
          </div>
      }
      <p><span className="font-semibold">Salary: </span>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(salary)}</p>
      <UserDetailsButtons isEditing={isEditing} setIsEditing={setIsEditing} handleSave={handleSave} />
    </div>
  );
}