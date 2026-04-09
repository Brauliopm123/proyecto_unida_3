import { useEffect, useState } from "react";
import API from "../services/api";

function Titulos({ usuario }) {

  const [titulos, setTitulos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);

  const [editando, setEditando] = useState(null);

  const [form, setForm] = useState({
    titulo: "",
    tipo: "anime",
    genero: "",
    estado: "en_emision",
    total_episodios: 0,
    sinopsis: ""
  });

  //  FILTROS
  const [busqueda, setBusqueda] = useState("");
  const [filtrogenero, setFiltrogenero] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");

  const headers = {
    "usuario-id": usuario.id
  };

  //  Cargar datos
  const cargar = async () => {
    const res = await API.get("/titulos/");
    setTitulos(res.data);
    setFiltrados(res.data);
  };

  useEffect(() => {
    cargar();
  }, []);

  //  Aplicar filtros automáticamente
  useEffect(() => {
    let data = titulos;

    if (busqueda) {
      data = data.filter(t =>
        t.titulo.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    if (filtrogenero) {
      data = data.filter(t =>
        t.genero.toLowerCase().includes(filtrogenero.toLowerCase())
      );
    }

    if (filtroEstado) {
      data = data.filter(t => t.estado === filtroEstado);
    }

    setFiltrados(data);
  }, [busqueda, filtrogenero, filtroEstado, titulos]);

  //  Guardar
  const guardar = async () => {
    if (editando) {
      await API.put(`/titulos/${editando}`, form, { headers });
    } else {
      await API.post("/titulos/", form, { headers });
    }

    setForm({
      titulo: "",
      tipo: "anime",
      genero: "",
      estado: "en_emision",
      total_episodios: 0,
      sinopsis: ""
    });

    setEditando(null);
    cargar();
  };

  //  Editar
  const editar = (t) => {
    setEditando(t.id);
    setForm(t);
  };

  //  Eliminar
  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar título?")) return;

    await API.delete(`/titulos/${id}`, { headers });
    cargar();
  };

  return (
    <div>

      {/*  FILTROS */}
      <h4>Buscar y filtrar</h4>

      <input
        placeholder="Buscar por nombre"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <select
        value={filtrogenero}
        onChange={(e) => setFiltrogenero(e.target.value)}
      >
        <option value="">Todos los géneros</option>
        <option value="accion">Acción</option>
        <option value="romance">Romance</option>
        <option value="comedia">Comedia</option>
        <option value="shonen">shonen</option>
      </select>

      <select
        value={filtroEstado}
        onChange={(e) => setFiltroEstado(e.target.value)}
      >
        <option value="">Todos los estados</option>
        <option value="en_emision">En emisión</option>
        <option value="finalizado">Finalizado</option>
        <option value="pendiente">Pendiente</option>
      </select>

      {/*  FORM ADMIN */}
      {usuario.rol === "admin" && (
        <>
          <h4>{editando ? "Editar título" : "Crear título"}</h4>

          <input placeholder="Título"
            value={form.titulo}
            onChange={(e) => setForm({...form, titulo: e.target.value})}
          />

          <select
            value={form.tipo}
            onChange={(e) => setForm({ ...form, tipo: e.target.value })}
          >
            <option value="anime">Anime</option>
            <option value="manga">Manga</option>
          </select>

          <input placeholder="Género"
            value={form.genero}
            onChange={(e) => setForm({...form, genero: e.target.value})}
          />

          <select
            value={form.estado}
            onChange={(e) => setForm({ ...form, estado: e.target.value })}
          >
            <option value="en_emision">En emisión</option>
            <option value="finalizado">Finalizado</option>
            <option value="pendiente">Pendiente</option>
          </select>

          <input placeholder="Total episodios"
            value={form.total_episodios}
            onChange={(e) => setForm({...form, total_episodios: e.target.value})}
          />

          <input placeholder="Sinopsis"
            value={form.sinopsis}
            onChange={(e) => setForm({...form, sinopsis: e.target.value})}
          />

          <button onClick={guardar}>
            {editando ? "Actualizar" : "Crear"}
          </button>
        </>
      )}

      {/*  LISTA */}
      <h4>Lista de títulos</h4>

      {filtrados.map(t => (
        <div key={t.id} className="card">

          <div>
            <b>{t.titulo}</b> ({t.tipo}) <br />
            {t.genero} <br />
            Estado: {t.estado}
          </div>

          {usuario.rol === "admin" && (
            <div>
              <button onClick={() => editar(t)}>Editar</button>
              <button className="delete" onClick={() => eliminar(t.id)}>Eliminar</button>
            </div>
          )}

        </div>
      ))}

    </div>
  );
}

export default Titulos;