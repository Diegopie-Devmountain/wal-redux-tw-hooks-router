import { useState } from "react";
import useFormState from "../../hooks/useFormState";
import { useSelector, useDispatch } from "react-redux";
import useMoneyFormatter from "../../features/TaskList/hooks/useMoneyFormatter";

export default function UserDetails(
  {
    // name,
    // role 
  }) {

  const { name, role, salary, error, errorMessage } = useSelector(({ name, role, salary,  error, errorMessage }) => ({ name, role, salary, error, errorMessage }));
  
  const [isEditing, setIsEditing] = useState(false);

  const [nameData, setName] = useState(name);

  const roleData = useFormState(role);
  const dispatch = useDispatch();


  const handleSave = () => {
    console.log({ nameData, roleData: roleData.value });
    dispatch({ type: 'UPDATE', payload: { nameData, roleData: roleData.value } });
    setIsEditing(false);
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
            <input className="ml-3 text-black" value={nameData} onChange={(e) => setName(e.target.value)} type="text" />
          </label>
      }
      {
        !isEditing
          ?
          <p><span className="font-semibold">Role: </span>{role}</p>
          :
          <div className="flex">
            <label htmlFor="role">Role</label>
            <input className="ml-3 text-black" id="role" type="text"  {...roleData} />
          </div>
      }
      {/* <p><span className="font-semibold">Salary: </span>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(salary)}</p> */}
      <p><span className="font-semibold">Salary: </span>{useMoneyFormatter(salary)}</p>
      <div className="flex justify-center gap-x-6 mt-4">
        {!isEditing && <button className="btn-primary" onClick={() => setIsEditing(true)}>Edit</button>}
        {isEditing && <button className="btn-primary" onClick={handleSave}>Save</button>}
      </div>
      { error && <p className="text-center text-rose-500 mt-6">{errorMessage}</p> }
    </div>
  );
}