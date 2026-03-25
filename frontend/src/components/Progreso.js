import { useEffect, useState } from "react";
import API from "../services/api";

function Progreso(){

  const [lista, setLista] = useState([]);

  const [form, setForm] = useState({
    id: "",
    usuario_id: "",
    titulo_id: "",
    episodio_actual: "",
    estado_personal: "viendo"
  });

  const [editando, setEditando] = useState(false);

  // Manejar inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Obtener progreso por usuario
  const obtenerProgreso = () => {
    if(!form.usuario_id) return;

    API.get(`/progreso/usuario/${form.usuario_id}`)
      .then(res => setLista(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    obtenerProgreso();
  }, [form.usuario_id]);

  // Crear progreso
  const crearProgreso = () => {
    API.post("/progreso", form)
      .then(() => {
        alert("Progreso registrado");
        obtenerProgreso();
        limpiarForm();
      })
      .catch(err => console.log(err));
  };

  // Seleccionar para editar
  const seleccionarProgreso = (p) => {
    setForm(p);
    setEditando(true);
  };

  // Actualizar progreso
  const actualizarProgreso = () => {
    API.put(`/progreso/${form.id}`, form)
      .then(() => {
        alert("Progreso actualizado");
        obtenerProgreso();
        limpiarForm();
      })
      .catch(err => console.log(err));
  };

  // Eliminar progreso
  const eliminarProgreso = (id) => {
    if(!window.confirm("¿Eliminar progreso?")) return;

    API.delete(`/progreso/${id}`)
      .then(() => {
        alert("Progreso eliminado");
        obtenerProgreso();
      })
      .catch(err => console.log(err));
  };

  // Limpiar formulario
  const limpiarForm = () => {
    setForm({
      id: "",
      usuario_id: "",
      titulo_id: "",
      episodio_actual: "",
      estado_personal: "viendo"
    });
    setEditando(false);
  };

  return (
    <div>

      {/* FORMULARIO */}
      <div className="form">

        <h2>Progreso</h2>

        <input
          name="usuario_id"
          placeholder="ID Usuario"
          value={form.usuario_id}
          onChange={handleChange}
        />

        <input
          name="titulo_id"
          placeholder="ID Título"
          value={form.titulo_id}
          onChange={handleChange}
        />

        <input
          name="episodio_actual"
          placeholder="Episodio actual"
          value={form.episodio_actual}
          onChange={handleChange}
        />

        <select
          name="estado_personal"
          value={form.estado_personal}
          onChange={handleChange}
        >
          <option value="viendo">Viendo</option>
          <option value="completado">Completado</option>
          <option value="pausa">Pausa</option>
          <option value="abandonado">Abandonado</option>
        </select>

        {editando ? (
          <>
            <button onClick={actualizarProgreso}>
              Actualizar
            </button>

            <button onClick={limpiarForm}>
              Cancelar
            </button>
          </>
        ) : (
          <button onClick={crearProgreso}>
            Guardar Progreso
          </button>
        )}

      </div>

      {/* LISTA */}
      <h3 style={{paddingLeft:"20px"}}>Historial</h3>

      <div className="grid">

        {lista.length === 0 ? (
          <p>No hay progreso registrado</p>
        ) : (
          lista.map(p => (
            <div className="card" key={p.id}>

              <p><b>Usuario:</b> {p.usuario_id}</p>
              <p><b>Título:</b> {p.titulo_id}</p>
              <p><b>Episodio:</b> {p.episodio_actual}</p>
              <p><b>Estado:</b> {p.estado_personal}</p>

              <button onClick={() => seleccionarProgreso(p)}>
                Editar
              </button>

              <button onClick={() => eliminarProgreso(p.id)}>
                Eliminar
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Progreso;