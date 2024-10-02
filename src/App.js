// import logo from './logo.svg';
// import './App.css';
// import DropdownMenu from './dropmenu';
import Header from './header';
import DataFetchingComponent from './data'; // Adjust the path if necessary
import TicketCard from './card'; // Adjust the path if necessary

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  return (
    <div>
      <Header />
      <main>
        <DataFetchingComponent />
      </main>
    </div>
  );
}
export default App;
