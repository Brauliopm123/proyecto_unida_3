import { useState } from "react";
import API from "../services/api";

function Register({ setVista }) {

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contraseña: ""
  });

  const registrar = async () => {
    try {
      await API.post("/usuarios/registro", form);
      alert("Usuario creado correctamente");
      setVista("login");
    } catch (error) {
      alert(error.response?.data?.detail);
    }
  };

  return (
    <div className="card">

      <h2>Registro</h2>

      <input placeholder="Nombre"
        onChange={(e) => setForm({...form, nombre: e.target.value})} />

      <input placeholder="Correo"
        onChange={(e) => setForm({...form, correo: e.target.value})} />
       
      <input type="contraseña" placeholder="Contraseña"
        onChange={(e) => setForm({...form, contraseña: e.target.value})} />

      <button onClick={registrar}>Registrarse</button>

      <p onClick={() => setVista("login")} style={{cursor: "pointer"}}>
        Ya tengo cuenta
      </p>

    </div>
  );
}

export default Register;