import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import css from './Layout.module.css';
const Layout = () => {
  return (
    <div>
      <header className={css.header}>
        <nav>
          <NavLink
            style={({ isActive }) => {
              return {
                color: isActive ? 'coral' : 'black',
              };
            }}
            to="/"
          >
            Home
          </NavLink>
        </nav>
        <nav>
          <NavLink
            style={({ isActive }) => {
              return {
                color: isActive ? 'coral' : 'black',
              };
            }}
            to="/movies"
          >
            Movies
          </NavLink>
        </nav>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
export default Layout;
