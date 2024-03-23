import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth"
import Login from "./pages/Login";
import Home from "./pages/Home";
function App() {
    const [user, setUser] = useState(null)

    onAuthStateChanged(auth, (user) => {
        setUser(user)
    })

    return (
        <div className="App">
            { user ?
                <Home />
                :
                <Login />
            }
        </div>
    );
}

export default App;
