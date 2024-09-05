import {  useState } from "react";
import useFormState from "../../hooks/useFormState";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function UserDetails(
  {
    // name,
    // role
  }) {

  const dispatch = useDispatch()
  const { name, role, salary, error, errorMessage } = useSelector(({ name, role, salary, error, errorMessage }) => ({ name, role, salary, error, errorMessage }))

  const [isEditing, setIsEditing] = useState(false);
  const [nameData, setNameData] = useState(name);

  const roleData = useFormState(role);

  const handleSave = () => {
    console.log(nameData, roleData.value);
    dispatch({ type: "UPDATE", payload: { nameData, roleData: roleData.value } })


    setIsEditing(false)
  }

  

  return (
    <div>
      <h2 className="text-center font-bold">User Details</h2>
      {!isEditing ?
        <p><span>Name: </span>{name}</p>
        :
        <label>
          Name
          <input value={nameData} onChange={(e) => setNameData(e.target.value)} className="ml-3 text-black" type="text" />
        </label>
      }


      {!isEditing ?
        <p><span>Role: </span>{role}</p>
        :
        <div>
          <label htmlFor="role">Role</label>
          <input className="ml-3 text-black" id='role' type="text" {...roleData} />
        </div>
      }
      <p><span>Salary: </span> {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(salary)}</p>
      <div className="flex justify-center gap-x-6">

        {!isEditing &&

          <button
            className="btn-primary"
            onClick={() => setIsEditing(true)}
          >Edit</button>
        }
        {
          isEditing &&
          <button
            className="btn-primary"
            onClick={handleSave}
          >Save</button>
        }

      </div>
        { error && <p className="text-center text-rose-500 mt-6">{errorMessage}</p> }
    </div>
  );
}