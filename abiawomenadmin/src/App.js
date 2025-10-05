// src/App.js
import './App.css';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <div className="flex min-h-screen">
      {/* Your Navbar is actually a sidebar! */}
      <Navbar />
      
      {/* Main content area */}
      <div className="ml-64 flex-1 p-6">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Learn React w/ Habeebah and Rubaina
          </h1>
        </header>
        
        {/* Your page content goes here */}
        <main>
          <p className="text-gray-600">
            Welcome to the Abia Women Assembly Admin Dashboard!
          </p>
        </main>
      </div>
    </div>
  );
}

export default App;