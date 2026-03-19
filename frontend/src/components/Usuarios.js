import { useState } from "react";
import API from "../services/api";

function Usuarios() {

  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    contraseña: ""
  });

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const registrarUsuario = () => {
    API.post("/usuarios", usuario)
      .then(res => {
        alert("Usuario registrado");
      })
      .catch(err => console.log(err));
  };

  return (
    <div>

      <h2>Registro de Usuario</h2>

      <input
        name="nombre"
        placeholder="Nombre"
        onChange={handleChange}
      />

      <input
        name="correo"
        placeholder="Correo"
        onChange={handleChange}
      />

      <input
        name="contraseña"
        placeholder="Contraseña"
        onChange={handleChange}
      />

      <button onClick={registrarUsuario}>
        Registrar
      </button>

    </div>
  );
}

export default Usuarios;