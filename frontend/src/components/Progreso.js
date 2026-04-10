import { useEffect, useState, useCallback } from "react";
import API from "../services/api";

function Progreso({ usuario }) {

  const [progreso, setProgreso] = useState([]);
  const [titulos, setTitulos] = useState([]);
  const [editando, setEditando] = useState(null);

  const [form, setForm] = useState({
    titulo_id: "",
    episodio_actual: 1,
    estado_personal: "viendo"
  });

  const headers = {
    "usuario-id": usuario.id
  };

  // useCallback para evitar warning
  const cargar = useCallback(async () => {
    try {
      const resProgreso = await API.get(`/progreso/usuario/${usuario.id}`);
      setProgreso(resProgreso.data);

      const resTitulos = await API.get("/titulos");
      setTitulos(resTitulos.data);

    } catch (error) {
      console.log(error);
    }
  }, [usuario.id]);

  // Ejecutar carga inicial
  useEffect(() => {
    cargar();
  }, [cargar]); // ya no hay warning

  // Guardar (crear o editar)
  const guardar = async () => {
    try {

      const data = {
        usuario_id: usuario.id,
        titulo_id: Number(form.titulo_id),
        episodio_actual: Number(form.episodio_actual),
        estado_personal: form.estado_personal
      };

      if (editando) {
        await API.put(`/progreso/${editando}`, data, { headers });
        alert("Progreso actualizado");
      } else {
        await API.post("/progreso", data, { headers });
        alert("Progreso guardado");
      }

      setForm({
        titulo_id: "",
        episodio_actual: 1,
        estado_personal: "viendo"
      });

      setEditando(null);

      cargar(); // refresca automáticamente

    } catch (error) {
      console.log(error.response?.data);
    }
  };

  // Editar
  const editar = (p) => {
    setEditando(p.id);
    setForm({
      titulo_id: p.titulo_id,
      episodio_actual: p.episodio_actual,
      estado_personal: p.estado_personal
    });
  };

  // Eliminar
  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar progreso?")) return;

    try {
      await API.delete(`/progreso/${id}`, { headers });

      alert("Progreso eliminado");

      cargar(); // refresca correctamente

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <h4>{editando ? "Editar progreso" : "Registrar progreso"}</h4>

      {/* SELECT TITULOS */}
      <select
        value={form.titulo_id}
        onChange={(e) =>
          setForm({ ...form, titulo_id: e.target.value })
        }
      >
        <option value="">Selecciona un título</option>
        {titulos.map(t => (
          <option key={t.id} value={t.id}>
            {t.titulo}
          </option>
        ))}
      </select>

      {/* EPISODIO */}
      <input
        placeholder="Episodio actual"
        value={form.episodio_actual}
        onChange={(e) =>
          setForm({ ...form, episodio_actual: e.target.value })
        }
      />

      {/* ESTADO */}
      <select
        value={form.estado_personal}
        onChange={(e) =>
          setForm({ ...form, estado_personal: e.target.value })
        }
      >
        <option value="viendo">Viendo</option>
        <option value="completado">Completado</option>
        <option value="pausa">En pausa</option>
        <option value="abandonado">Abandonado</option>
      </select>

      <button onClick={guardar}>
        {editando ? "Actualizar" : "Guardar"}
      </button>

      <h4>Mi progreso</h4>

      {progreso.map(p => (
        <div key={p.id} className="card">

          <div>
            <b>{p.titulo}</b> <br />
            Episodio: {p.episodio_actual} <br />
            Estado: {p.estado_personal}
          </div>

          <div>
            <button onClick={() => editar(p)}>Editar</button>
            <button className="delete" onClick={() => eliminar(p.id)}>
              Eliminar
            </button>
          </div>

        </div>
      ))}

    </div>
  );
}

export default Progreso;