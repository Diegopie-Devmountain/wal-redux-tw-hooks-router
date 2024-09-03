import { useState } from "react";
import useFormState from "../../hooks/useFormState";

export default function UserDetails({ name, role }) {

  const [isEditing, setIsEditing] = useState(false);

  const [nameData, setName] = useState(name);

  const roleData = useFormState(role);

  const handleSave = () => {
    console.log({nameData, roleData: roleData.value});
    setIsEditing(false);
  }

  return (
    <div>
      <h2 className="text-center font-bold">User Details</h2>

      {
        !isEditing
          ?
          <p><span>Name: </span>{nameData}</p>
          :
          <label>
            Name
            <input value={nameData} onChange={(e) => setName(e.target.value)} type="text" />
          </label>
      }
      {
        !isEditing
          ?
          <p><span>Role: </span>{roleData.value}</p>
          :
          <div className="flex">
            <label htmlFor="role">Role</label>
            <input id="role" type="text"  {...roleData}/>
          </div>
      }
      <div className="flex justify-center gap-x-6">
        { !isEditing && <button className="btn-primary" onClick={() => setIsEditing(true)}>Edit</button> }
        { isEditing && <button className="btn-primary" onClick={handleSave}>Save</button> }
      </div>
    </div>
  );
}