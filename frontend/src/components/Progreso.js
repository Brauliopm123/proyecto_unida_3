import { useState } from "react";
import API from "../services/api";

function Progreso() {

  const [data, setData] = useState({
    usuario_id: "",
    titulo_id: "",
    episodio_actual: "",
    estado_personal: ""
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const registrarProgreso = () => {
    API.post("/progreso", data)
      .then(res => {
        alert("Progreso registrado");
      })
      .catch(err => console.log(err));
  };

  return (
    <div>

      <h2>Registrar Progreso</h2>

      <input
        name="usuario_id"
        placeholder="ID Usuario"
        onChange={handleChange}
      />

      <input
        name="titulo_id"
        placeholder="ID Título"
        onChange={handleChange}
      />

      <input
        name="episodio_actual"
        placeholder="Episodio actual"
        onChange={handleChange}
      />

      <input
        name="estado_personal"
        placeholder="Estado"
        onChange={handleChange}
      />

      <button onClick={registrarProgreso}>
        Guardar
      </button>

    </div>
  );
}

export default Progreso;