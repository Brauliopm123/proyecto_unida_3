import { useEffect, useState } from "react";
import API from "../services/api";

function Usuarios({ usuario }) {

  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    rol: "usuario"
  });

  const headers = {
    "usuario-id": usuario.id
  };

  // Cargar usuarios
  const cargar = async () => {
    try {
      const res = await API.get("/usuarios/");
      setUsuarios(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  // Guardar (crear / editar)
  const guardar = async () => {
    try {
      let data = { ...form };

      // NO enviar contraseña si está vacía
      if (!data.contraseña) {
        delete data.contraseña;
      }

      if (editando) {
        await API.put(`/usuarios/${editando}`, data, { headers });
        alert("Usuario actualizado");
      } else {
        await API.post("/usuarios/", data);
        alert("Usuario creado");
      }

      // Reset form
      setForm({
        nombre: "",
        correo: "",
        contraseña: "",
        rol: "usuario"
      });

      setEditando(null);

      cargar(); // refrescar lista

    } catch (error) {
      console.log(error.response?.data);
    }
  };

  // Editar
  const editar = (u) => {
    setEditando(u.id);

    setForm({
      nombre: u.nombre,
      correo: u.correo,
      contraseña: "", // no traer contraseña
      rol: u.rol
    });
  };

  // Eliminar
  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar usuario?")) return;

    try {
      await API.delete(`/usuarios/${id}`, { headers });
      alert("Usuario eliminado");

      cargar(); // refrescar lista

    } catch (error) {
      console.log(error);
    }
  };

  // Cancelar edición
  const cancelar = () => {
    setEditando(null);
    setForm({
      nombre: "",
      correo: "",
      contraseña: "",
      rol: "usuario"
    });
  };

  return (
    <div>

      <h4>
        {editando ? `Editando usuario ID: ${editando}` : "Crear usuario"}
      </h4>

      {/* FORMULARIO */}
      <input
        placeholder="Nombre"
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
      />

      <input
        placeholder="Correo"
        value={form.correo}
        onChange={(e) => setForm({ ...form, correo: e.target.value })}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={form.contraseña}
        onChange={(e) => setForm({ ...form, contraseña: e.target.value })}
      />

      <select
        value={form.rol}
        onChange={(e) => setForm({ ...form, rol: e.target.value })}
      >
        <option value="usuario">Usuario</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={guardar}>
        {editando ? "Actualizar" : "Crear"}
      </button>

      {editando && (
        <button onClick={cancelar}>
          Cancelar
        </button>
      )}

      {/* LISTA */}
      <h4>Lista de usuarios</h4>

      {usuarios.map(u => (
        <div key={u.id} className="card">

          <div>
            <b>{u.nombre}</b> <br />
            {u.correo} <br />
            Rol: {u.rol}
          </div>

          <div>
            <button onClick={() => editar(u)}>Editar</button>
            <button
              className="delete"
              onClick={() => eliminar(u.id)}
            >
              Eliminar
            </button>
          </div>

        </div>
      ))}

    </div>
  );
}

export default Usuarios;