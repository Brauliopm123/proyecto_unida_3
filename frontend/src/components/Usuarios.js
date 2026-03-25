import { useEffect, useState } from "react";
import API from "../services/api";

function Usuarios(){

  const [usuarios, setUsuarios] = useState([]);

  const [form, setForm] = useState({
    id: "",
    nombre: "",
    correo: "",
    contraseña: ""
  });

  const [editando, setEditando] = useState(false);

  // Obtener usuarios
  const obtenerUsuarios = () => {
    API.get("/usuarios")
      .then(res => setUsuarios(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // Manejar inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Crear usuario
  const crearUsuario = () => {
    API.post("/usuarios", form)
      .then(() => {
        alert("Usuario creado");
        obtenerUsuarios();
        limpiarForm();
      })
      .catch(err => console.log(err));
  };

  // Preparar edición
  const seleccionarUsuario = (u) => {
    setForm(u);
    setEditando(true);
  };

  // Actualizar usuario
  const actualizarUsuario = () => {
    API.put(`/usuarios/${form.id}`, form)
      .then(() => {
        alert("Usuario actualizado");
        obtenerUsuarios();
        limpiarForm();
      })
      .catch(err => console.log(err));
  };

  // Eliminar usuario
  const eliminarUsuario = (id) => {
    if(!window.confirm("¿Eliminar usuario?")) return;

    API.delete(`/usuarios/${id}`)
      .then(() => {
        alert("Usuario eliminado");
        obtenerUsuarios();
      })
      .catch(err => console.log(err));
  };

  // Limpiar formulario
  const limpiarForm = () => {
    setForm({
      id: "",
      nombre: "",
      correo: "",
      contraseña: ""
    });
    setEditando(false);
  };

  return (
    <div>

      {/* FORMULARIO */}
      <div className="form">

        <h2>Usuarios</h2>

        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <input
          name="correo"
          placeholder="Correo"
          value={form.correo}
          onChange={handleChange}
        />

        <input
          name="contraseña"
          placeholder="Contraseña"
          value={form.contraseña}
          onChange={handleChange}
        />

        {editando ? (
          <>
            <button onClick={actualizarUsuario}>
              Actualizar
            </button>

            <button onClick={limpiarForm}>
              Cancelar
            </button>
          </>
        ) : (
          <button onClick={crearUsuario}>
            Registrar
          </button>
        )}

      </div>

      {/* LISTA */}
      <h3 style={{paddingLeft:"20px"}}>Lista de usuarios</h3>

      <div className="grid">

        {usuarios.map(u => (
          <div className="card" key={u.id}>

            <h3>{u.nombre}</h3>
            <p>{u.correo}</p>

            <button onClick={() => seleccionarUsuario(u)}>
              Editar
            </button>

            <button onClick={() => eliminarUsuario(u.id)}>
              Eliminar
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Usuarios;