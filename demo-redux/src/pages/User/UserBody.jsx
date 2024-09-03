import { useSelector, useDispatch } from 'react-redux';
import UserInfo from './UserInfo'
import { useEffect } from 'react';
import { getUserThunk } from "./userReducer";
import PacmanLoader from "react-spinners/ClipLoader";

export default function UserBody({ name, role, level }) {

  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserThunk);
  }, [])

  return (
    <section className='w-4/5 m-auto mt-8 md:w-1/2 bg-brand-purple-100 py-4 px-8 rounded-md text-white'>
      <h2 className='text-center font-bold'>Edit Account Details</h2>
      {
        !loading ?
          <UserInfo name={name} role={role} level={level} />
          :
          <div className='h-[164px] flex justify-center items-center'>
            <PacmanLoader
              color="#d3a257"
              loading
            />
          </div>
      }
    </section>
  );
}