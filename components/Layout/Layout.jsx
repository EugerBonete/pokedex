import React from "react";

const Layout = ({ children }) => {
  return (
    <div className='container'>
      <nav className='nav'>
        <h1>Pokedex</h1>
      </nav>
      {children}

      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .nav {
          height: 10vh;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default Layout;
