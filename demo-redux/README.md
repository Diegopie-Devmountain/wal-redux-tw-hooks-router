# Redux

## Table of Contents

- [Redux](#redux)
  - [Table of Contents](#table-of-contents)
  - [Install Tailwind](#install-tailwind)
  - [Set Up User Page](#set-up-user-page)
    - [Create a default font for site](#create-a-default-font-for-site)
    - [Setup Router](#setup-router)
    - [Demo Prop Drilling](#demo-prop-drilling)
    - [Custom Hooks](#custom-hooks)
    - [Add Redux](#add-redux)
    - [Error Handling](#error-handling)
    - [Loading](#loading)
  - [Set up task pages](#set-up-task-pages)
    - [Fix Task Form](#fix-task-form)
    - [Setting global state](#setting-global-state)
    - [Create Provider](#create-provider)
    - [Render from state](#render-from-state)
    - [Render from DB](#render-from-db)
  
## Install Tailwind

Go through the docs to install the base setup

[Tailwind Docs](https://tailwindcss.com/docs/guides/vite)

## Set Up User Page

### Create a default font for site

[Google Fonts](https://fonts.google.com/)

Use Google Fonts to get roboto and import into index.css

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;
```

Then update `tailwind.config.js` to use custom fontFamily, explaining the defaultTheme

```js
theme: {
  fontFamily: {
    "poppins": ['"Poppins"', ...defaultTheme.fontFamily.sans],
  },
  extend: {},
},
```

Then update index.css to apply styles to app

```css
@layer base {
  html {
    @apply font-poppins
  }
}
```

### Setup Router

Install package
`npm i react-router-dom`

Create Route.jsx

```js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTask from "./pages/CreateTask";
import AllTasks from "./pages/AllTasks";
import User from "./pages/User/User";
import App from "./App";
import NotFound from "./pages/NotFound";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <AllTasks />
        },
        {
          path: '/user',
          element: <User />
        },
        {
          path: 'create',
          element: <CreateTask />
        },
        {
          path: '*', 
          element: <NotFound /> 
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />
}
```

### Demo Prop Drilling

With routes working, go to account page and walk through the prop drilling down to UserDetails.jsx. Write out the tailwind as you go. Create a component for the h1

```js
import { useState } from "react";

export default function UserDetails(
  { 
    name,
    role 
  }) {


  console.log({ name, role });

  return (
    <div>
      <h2 className="text-center font-bold">User Details</h2>
    </div>
  );
}
```

We can add the inputs we need to use for props. Not the difference between a nested input. Since we are not using a proper form, we don't need the name attribute

```js
 return (
    <div>
      <h2 className="text-center font-bold">User Details</h2>

      
        <p><span>Name: </span>{name}</p>
        <label>
          Name
          <input name="name" type="text" />
        </label>
    
        <p><span>Role: </span>{role}</p>
        <div className="flex">
          <label htmlFor="role">Role</label>
          <input id="role" name="role" type="text" />
        </div>
    </div>
  );
```

Now we can add state to set up form editing 

```js
 const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <h2 className="text-center font-bold">User Details</h2>

      {
        !isEditing
          ?
          <p><span>Name: </span>{name}</p>
          :
          <label>
            Name
            <input type="text" />
          </label>
      }
      {
        !isEditing
          ?
          <p><span>Role: </span>{role}</p>
          :
          <div className="flex">
            <label htmlFor="role">Role</label>
            <input id="role" type="text" />
          </div>
      }
      <div className="flex justify-center gap-x-6">
        <button className="bg-brand-orange-300 text-center text-white text-sm px-6 py-1 uppercase tracking-wider">Edit</button>
        <button>Save</button>
      </div>
    </div>
  );
```

Now we can manually change state in the code to see changes, but we have a bunch of tailwind classes for our button. Instead of copy pasta to apply to the save button, we can create a tailwind component

index.css

```css
@layer components {
  .btn-primary {
    @apply bg-brand-orange-300 text-center text-white text-sm px-6 py-1 uppercase tracking-wider
  }
}
```

Now we can update our buttons to do stuff

```js
const handleSave = () => {
  setIsEditing(false)
}

<div className="flex justify-center gap-x-6">
  { !isEditing && <button className="btn-primary" onClick={() => setIsEditing(true)}>Edit</button> }
  { isEditing && <button className="btn-primary" onClick={handleSave}>Save</button> }
</div>
```

Now we have to deal with the dreaded form handling in react

```js
const [nameData, setName] = useState('');

<label>
  Name
  <input value={nameData} onChange={(e) => setName(e.target.value)} type="text" />
</label>
```

But this sucks, so lets create a custom hook to do this for us

### Custom Hooks

```js
// useFormState.jsx
import { useState } from "react";

export default function useFormState(initialValue = "") {

  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  return {
    value, 
    onChange: handleChange
  }
}

// UserDetails.jsx
const roleData = useFormState();

const handleSave = () => {
    console.log({nameData, roleData: roleData.value});
    setIsEditing(false);
  }

<div className="flex">
  <label htmlFor="role">Role</label>
  <input id="role" type="text"  {...roleData}/>
</div>
```

So custom hooks are great, but now there is a change to the user data and we have to render there salary here. We could go through the entire thing with prop drilling or take advantage of redux

### Add Redux

`npm install @reduxjs/toolkit react-redux`

```js
// userReducer.js
import { configureStore } from '@reduxjs/toolkit'

const userState = {
  id: 1,
  name: 'redux Morgan',
  role: 'redux Intern',
  level: 'redux mid'
};


function userReducer(state = userState, action) {
  switch (action.type) {
    default: 
      return state;
  }
}

export default configureStore({
  reducer: userReducer
})
```

We create a default state, reducer function, and configure a configureStore to be exported. Then we can use that in User.jsx

```js
import { Provider } from 'react-redux';
import UserBody from "./UserBody";
import userStore from './userReducer.js'

export default function User() {

  return (
    <main className="flex justify-center flex-col">
      <h1 className="text-center text-4xl font-matemasie mt-10">Account</h1>
      <Provider store={userStore} >
        <UserBody name={user.name} role={user.role} level={user.level} />
      </Provider>
    </main>
  )
}
```

Now we can use this data anywhere we want with the useSelector hook

```js
import UserDetails from "./UserDetails"
import { useSelector } from "react-redux"

export default function UserInfo(
  { 
    name, 
    role, 
    // level 
  }
) {

  const level = useSelector(state => state.level);

  return (
    <div>
      <p><span className="font-semibold">Ghost Buster Level:</span> {level}</p>
      <UserDetails name={name} role={role} />
    </div>
  )
}
```

```js
export default function UserDetails(
  { 
    // name,
    // role 
  }) {

    const { name, role, salary } = useSelector(({ name, role, salary }) => ({ name, role, salary }));

    //https://www.freecodecamp.org/news/how-to-format-number-as-currency-in-javascript-one-line-of-code/
    <p><span className="font-semibold">Salary: </span>{ Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(salary)}</p>
```

React will yell at us about memoizing this selector, so we can do that real quick

With that done, we can update our reducer to update our state and talk to the server

```js
// create a new case in reducer
case 'UPDATE':
  const {nameData, roleData} = action.payload
  axios.post('/api/user/save', action.payload);
  return {...state, nameData, roleData};

// useDispatch
import { useSelector, useDispatch } from "react-redux";
const dispatch = useDispatch();
dispatch({type: 'UPDATE', payload: {nameData, roleData: roleData.value} });
```

But we still need to get the user data from the db, we can use a thunk for this

```js
export const getUserThunk = async (dispatch) => {
  dispatch({ type: "SET_LOADING" });
  try {
  const userData = await axios.get("/api/user/data").then((res) => res.data);
  console.log(userData);
  dispatch({ type: "SET_DATA", payload: userData.data });
  } catch (err) {
    console.error("Error getting user data: ", err);
   dispatch({
      type: "SET_ERROR",
      payload: "Error getting user data, refresh to try again",
    });
  }
};


switch (action.type) {
    case "SET_DATA":
      return {...action.payload, loading: false };
    case "UPDATE":
      const { nameData: name, roleData: role } = action.payload;
      console.log({ name, role });
      axios.post("/api/user/save", { name, role });
      return { ...state, name, role };
    case "SET_LOADING":
      return { ...state, loading: true };
    default:
      return state;
  }
```

This works, but only for the level. Let's fix the rest of our state. We were using the state of this component by setting the initial state to our redux state. This becomes an issue when we want to update the dom since redux won't know that it needs to trigger a render here until we change these parts to use redux state instead of the component state

```js
 <p><span className="font-semibold">Name: </span>{name}</p>
 <p><span className="font-semibold">Role: </span>{role}</p>
```

We can also update our reducer state to be initial state values using each key's data types

```js
const userState = {
  id: 0,
  name: "",
  role: "",
  level: "",
  salary: 0,
  loading: true,
};
```

We still have to manage our error handling

### Error Handling

```js
case "SET_ERROR":
  return { ...state, error: true, errorMessage: action.payload };

// Add to page to set styling
<p className="text-center text-rose-500 mt-6">Error getting user data, refresh to try again</p>

// Add conditional rendering
{ error && <p className="text-center text-rose-500 mt-6">{errorMessage}</p> }

// test by dispatching in useEffect
 dispatch({
      type: "SET_ERROR",
      payload: "Error getting user data, refresh to try again",
    });
```

### Loading

`npm install react-spinners`
https://www.davidhu.io/react-spinners/

```js
// UserBody.jsx
export default function UserBody({ name, role, level }) {

  const loading = useSelector((state) => state.loading);
  
  return (
    <section className='w-4/5 m-auto mt-8 md:w-1/2'>
      <h2 className='text-center font-bold'>Edit Account Details</h2>
      {
        !loading ?
          <UserInfo name={name} role={role} level={level}/>
        :
        'loading'
      }
    </section>
  );
}
```

We can see loading, but it never goes away and we never see anything in our log
Why? 

```js
// UserBody.jsx
import { useSelector, useDispatch } from 'react-redux';
import UserInfo from './UserInfo'
import { useEffect } from 'react';
import { getUserThunk } from "./userReducer";

export default function UserBody({ name, role, level }) {

  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserThunk);
  }, [])
  
  return (
    <section className='w-4/5 m-auto mt-8 md:w-1/2'>
      <h2 className='text-center font-bold'>Edit Account Details</h2>
      {
        !loading ?
          <UserInfo name={name} role={role} level={level}/>
        :
        'loading'
      }
    </section>
  );
}
```

But we don't want the width and height of the container change on load, so lets set our load state to match our loaded

We can use the computed section of dev tool to find the height of the container and arbitrary class to set that height

```js
<div className='h-[164px] flex justify-center items-center'>
  <PacmanLoader
    color="#d3a257"
    loading
  />
</div>
```

## Set up task pages

A lot of the redux code is already made, we're just going to plug them together and see how we can add complexity to what we have already done

### Fix Task Form

The task form has no way of getting info from the form. Let's use refs this time with a custom hook

```js
const title = useRef(null);
const description = useRef(null);
const dueDate = useRef(null);
console.log(title.current.value);

// hook
import { useRef } from "react";

export default function useFormData(inputs = {}) {
  const allRefs = useRef(inputs);

  return []

}

// TaskForm.jsx
const [] = useFormData({title, description, dueDate})
```

So now lets create the methods that will do the magic

```js
import { useRef } from "react";

export default function useFormData(refs = {}) {
  const allRefs = useRef(refs);

  const getData = () => {
    const response = {};
    for (let [key, value] of Object.entries(allRefs.current)) {
      response[key] = value.current.value;
    }

    return response;
  }

  const resetData = () => {
    Object.values(allRefs.current).forEach(ref => {
      ref.current.value = ''
    })
  }

  return [getData, resetData]
}

// TaskForm.jsx
const handleSubmit = (e) => {
    e.preventDefault();
    console.log(allFormData());
    resetFormData()
    // dispatch(addTask({ id: Date.now(), title, description, dueDate, completed: false }));
  };
``` 

Now we have a working for. Let's connect all our redux files

### Setting global state

First let's look at the `store`. Notice that reducer is now an object than can now accept many reducers. So would could add an entirely separate reducer to handle something like auth and still have it share the global scope

```js
import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './tasks/taskReducer'

export default configureStore({
  reducer: {
    taskState: tasksReducer
  }
})
```

Now Let's look at the reducer. We'll start with some hard coded initialState then update that to use DB data. Notice that we import our actions types from a separate file. 
They are still used in a switch case to determine what changes to state need to occur, but is now more complex because 🤷‍♂️. Let's look at that file.

`taskActions.js` also holds dispatch objects. These are now functions that accept an object to be used for the payload, and return objects that are used for a dispatch.
Again, more complex because 🤷‍♂️

The last bit of complexity is `taskSelectors.js`. Again, something that would normally just be placed in our component but these you might reuse as well.
Notice that when we access state, we must specify that we want to access the tasksState

```js
export const selectTasks = (state) => state.tasksState.tasks;

export const selectFilteredTasks = (state, filter) => {
  switch (filter)  {
    case 'completed': 
      return state.tasksState.tasks.filter(task => task.completed);
    case 'pending':
      return state.tasksState.tasks.filter(task => !task.completed);
    default:
      return state.tasksState.tasks;
  }
};
```

We also have `taskThunks.js`

Now lets plug it all in

### Create Provider

```js
// Main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router'
import { Provider } from 'react-redux';
import globalStore from './store/store.js';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={globalStore} >
      <Router />
    </Provider>
  </StrictMode>,
)
```

### Render from state

We'll set up TaskList to render the state array

```js
// TaskList.jsx
import React from 'react';
import TaskItem from './components/TaskItem';
import { useSelector } from 'react-redux';
import { selectFilteredTasks } from '../../store/tasks/taskSelectors';

export default function TaskList ({ filter })  {
  // const tasks = [];
  const tasks = useSelector((state) => selectFilteredTasks(state, filter));
```

Now we can dispatch actions on `TaskItem.jsx`

```js
import { useDispatch } from 'react-redux';
import { deleteTask, toggleComplete } from '../../../store/tasks/taskActions';

export default function TaskItem({ task }) {
  const dispatch = useDispatch();

  return (
    <li className='mt-6 bg-brand-purple-100 text-white py-4 px-8 rounded-md'>
      <div className='flex justify-between h-10'>
        <h3 className='font-matemasie text-lg'>{task.title}</h3>
        <p className='font-semibold'>Due: {task.dueDate}</p>
      </div>
      <p className='min-h-16'>{task.description}</p>
      <div className='flex justify-around'>
        <button
          className='btn-primary'
          onClick={() => dispatch(toggleComplete(task.id))}
        >
          {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        </button>
        <button
          className='btn-primary'
          onClick={() => dispatch(deleteTask(task.id))}
        >Delete</button>
      </div>
    </li>
  );
};
```

And now we just have to connect to the create page

```js
import { useRef } from 'react';
import useFormData from '../hooks/userFormRef';
import { useDispatch } from 'react-redux';
import { addTask } from '../../../store/tasks/taskActions';

export default function TaskForm() {
  const title = useRef(null);
  const description = useRef(null);
  const dueDate = useRef(null);
  console.log(title.current?.value);

  const [allFormData, resetFormData] = useFormData({title, description, dueDate})

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(allFormData());
    
    const {title, description, dueDate} = allFormData();
    dispatch(addTask({ id: Date.now(), title, description, dueDate, completed: false }));
    resetFormData()
  };

  return (
    <section className='w-4/5 m-auto mt-8 md:w-1/2 bg-brand-purple-100 py-4 px-8 rounded-md text-white'>
      <h1 className='title-primary'>Create a Task</h1>
      <form 
        onSubmit={handleSubmit}
        className='flex flex-col gap-y-5 mt-6'
      >
```

### Render from DB

```js
import { useDispatch } from "react-redux";
import { getTaskThunk } from "../store/tasks/taskThunks";


export default function AllTasks() {

  const [filter, setFilter] = useState('all');
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTaskThunk)
  }, [])
  ```


// add success state when creating tasks
// add loading state when loading tasks
// add ref to track who to highlight in filter
// update your backend to persist task data