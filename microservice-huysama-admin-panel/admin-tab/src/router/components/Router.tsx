import type { RouteObject } from "react-router-dom";
import type { DefaultComponent } from "@loadable/component";
import { useEffect } from "react";
import { handleRoutes } from "../utils/helper";
import { useLocation, useRoutes } from "react-router-dom";
import Login from '@/pages/login';
import Forget from '@/pages/forget';
import NotFound from '@/pages/404';
import nprogress from 'nprogress';
import Guards from './Guards';

type PageFiles = Record<string, () => Promise<DefaultComponent<unknown>>>;
const pages = import.meta.glob('../../pages/**/*.tsx') as PageFiles;
const layouts = handleRoutes(pages);
console.log(layouts)
const newRoutes: RouteObject[] = [
  {
    path: "login",
    element: <Login />
  },
  {
    path: "forget",
    element: <Forget />
  },
  {
    path: "",
    element: <Guards />,
    children: layouts
  },
  {
    path: "*",
    element: <NotFound />,
  }
];

function App() {
  const location = useLocation();

  // Thanh tiến trình phía trên
  useEffect(() => {
    nprogress.start();
  }, []);

  useEffect(() => {
    nprogress.done();

    return () => {
      nprogress.start();
    };
  }, [location]);

  return (
    <>
      { useRoutes(newRoutes) }
    </>
  );
}

export default App;
