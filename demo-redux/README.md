# Redux

## Table of Contents

- [Redux](#redux)
  - [Table of Contents](#table-of-contents)
  - [Show Off Demo Code](#show-off-demo-code)
  - [Install Tailwind](#install-tailwind)
    - [Create a default font for site](#create-a-default-font-for-site)
  - [Setup Router](#setup-router)
  - [Demo Prop Drilling](#demo-prop-drilling)
  

## Show Off Demo Code

## Install Tailwind

Go through the docs to install the base setup

[Tailwind Docs](https://tailwindcss.com/docs/guides/vite)

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

## Setup Router

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
          path: '/all',
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

## Demo Prop Drilling

With routes working, go to account page and walk through the prop drilling down to UserDetails.jsx

```js
import { useState } from "react";

export default function UserDetails({ name, role }) {

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