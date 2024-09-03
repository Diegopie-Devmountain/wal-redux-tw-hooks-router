# Redux

## Table of Contents

- [Redux](#redux)
  - [Table of Contents](#table-of-contents)
  - [Show Off Demo Code](#show-off-demo-code)
  - [Install Tailwind](#install-tailwind)
    - [Create a default font for site](#create-a-default-font-for-site)
  - [Setup Router](#setup-router)
  

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
import User from "./pages/User";
import App from "./App";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: 'all',
          element: <AllTasks />
        },
        {
          path: 'user',
          element: <User />
        },
        {
          path: 'create',
          element: <CreateTask />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />
}
```
