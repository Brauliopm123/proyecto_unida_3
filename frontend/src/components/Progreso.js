import { useState } from "react";
import API from "../services/api";

function Progreso(){

  const [data, setData] = useState({
    usuario_id:"",
    titulo_id:"",
    episodio_actual:"",
    estado_personal:"viendo"
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const guardar = () => {
    API.post("/progreso", data)
      .then(() => alert("Progreso guardado"))
      .catch(err => console.log(err));
  };

  return (
    <div className="form">

      <h2>Actualizar Progreso</h2>

      <input name="usuario_id" placeholder="ID Usuario" onChange={handleChange}/>
      <input name="titulo_id" placeholder="ID Título" onChange={handleChange}/>
      <input name="episodio_actual" placeholder="Episodio actual" onChange={handleChange}/>

      <button onClick={guardar}>Guardar</button>

    </div>
  );
}

export default Progreso;