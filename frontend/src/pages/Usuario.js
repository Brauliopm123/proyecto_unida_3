import Titulos from "../components/Titulos";
import Progreso from "../components/Progreso";

function Usuario({ usuario }) {
  return (
    <div>
      <h2>Panel Usuario</h2>
      <p>Bienvenido {usuario.nombre}</p>

      <hr />

      <h3>Catálogo</h3>
      <Titulos usuario={usuario} />

      <hr />

      <h3>Mi Progreso</h3>
      <Progreso usuario={usuario} />

    </div>
  );
}

export default Usuario;