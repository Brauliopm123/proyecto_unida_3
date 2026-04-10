import "./App.css";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Usuario from "./pages/Usuario";
import Register from "./pages/Register";

function App() {

  const [usuario, setUsuario] = useState(null);
  const [vista, setVista] = useState("login");

  // Cargar sesión guardada
  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (data) {
      setUsuario(JSON.parse(data));
    }
  }, []);

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    setVista("login");
  };

  // SI NO ESTÁ LOGUEADO
  if (!usuario) {
    return vista === "login" ? (
      <Login setUsuario={setUsuario} setVista={setVista} />
    ) : (
      <Register setVista={setVista} />
    );
  }

  return (
    <div className="container">

    <button className="logout" onClick={logout}>
      Cerrar sesión
    </button>

    {usuario.rol === "admin" ? (
      <Admin usuario={usuario} />
    ) : (
      <Usuario usuario={usuario} />
    )}

    </div>
  );
}

export default App;