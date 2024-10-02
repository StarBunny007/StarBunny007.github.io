import React from 'react';
import DropdownMenu from './dropmenu';
function Header() {
    return (
        <>
            <header className="header">
                <DropdownMenu />

            </header>
            <style jsx>{`
        .header {
          background-color: light grey;
          padding: 10px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header h1 {
          margin: 0;
          font-size: 24px;
        }
          
      `}</style>
        </>
    );
}

export default Header;
