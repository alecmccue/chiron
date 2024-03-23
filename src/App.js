import logo from './logo.svg';
import './App.css';
import Login from "./pages/Login";
import { useState } from "react";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth"

function App() {
    const [user, setUser] = useState(null)

    onAuthStateChanged(auth, (user) => {
        setUser(user)
    })

    return (
        <div className="App">
            <Login />
        </div>
    );
}

export default App;
