import { useEffect, useState } from "react";
import API from "../services/api";

function Progreso(){

  const [form, setForm] = useState({
    usuario_id:"",
    titulo_id:"",
    episodio_actual:"",
    estado_personal:"viendo"
  });

  const [lista, setLista] = useState([]);

  // Manejar inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Registrar progreso
  const registrar = () => {
    API.post("/progreso", form)
      .then(() => {
        alert("Progreso registrado");
        obtenerProgreso(); // refresca lista
      })
      .catch(err => console.log(err));
  };

  // Obtener progreso del usuario
  const obtenerProgreso = () => {
    if(!form.usuario_id) return;

    API.get(`/progreso/usuario/${form.usuario_id}`)
      .then(res => setLista(res.data))
      .catch(err => console.log(err));
  };

  // Cargar automático cuando cambia usuario
  useEffect(() => {
    obtenerProgreso();
  }, [form.usuario_id]);

  return (
    <div className="form">

      <h2>📺 Progreso del Usuario</h2>

      {/* FORMULARIO */}
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

      <select name="estado_personal" onChange={handleChange}>
        <option value="viendo">Viendo</option>
        <option value="completado">Completado</option>
        <option value="pausa">Pausa</option>
      </select>

      <button onClick={registrar}>
        Guardar Progreso
      </button>

      <hr />

      {/* LISTA */}
      <h3>📊 Historial</h3>

      {lista.length === 0 ? (
        <p>No hay progreso registrado</p>
      ) : (
        lista.map(p => (
          <div className="card" key={p.id}>
            <p><b>Título ID:</b> {p.titulo_id}</p>
            <p><b>Episodio:</b> {p.episodio_actual}</p>
            <p><b>Estado:</b> {p.estado_personal}</p>
          </div>
        ))
      )}

    </div>
  );
}

export default Progreso;