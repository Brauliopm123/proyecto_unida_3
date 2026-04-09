import "./App.css";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Usuario from "./pages/Usuario";

function App() {

  const [usuario, setUsuario] = useState(null);

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
  };

  // SI NO ESTÁ LOGUEADO
  if (!usuario) {
    return <Login setUsuario={setUsuario} />;
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