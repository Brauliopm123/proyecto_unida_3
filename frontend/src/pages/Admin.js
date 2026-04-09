import Titulos from "../components/Titulos";
import Usuarios from "../components/Usuarios";

function Admin({ usuario }) {
  return (
    <div>
      <h2>Panel Admin</h2>
      <p>Bienvenido {usuario.nombre}</p>

      <hr />

    <div className="section"></div>
      <h3>Gestión de Títulos</h3>
      <Titulos usuario={usuario} />

      <hr />

      <h3>Gestión de Usuarios</h3>
      <Usuarios usuario={usuario} />

    </div>
  );
}

export default Admin;