import { useState } from "react";
import API from "../services/api";

function Usuarios(){

  const [data, setData] = useState({
    nombre:"",
    correo:"",
    contraseña:""
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const registrar = () => {
    API.post("/usuarios", data)
      .then(() => alert("Usuario registrado"))
      .catch(err => console.log(err));
  };

  return (
    <div className="form">

      <h2>Registro de Usuario</h2>

      <input name="nombre" placeholder="Nombre" onChange={handleChange}/>
      <input name="correo" placeholder="Correo" onChange={handleChange}/>
      <input name="contraseña" placeholder="Contraseña" onChange={handleChange}/>

      <button onClick={registrar}>Registrar</button>

    </div>
  );
}

export default Usuarios;