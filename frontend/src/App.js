import Titulos from "./components/Titulos";
import Usuarios from "./components/Usuarios";
import Progreso from "./components/Progreso";
import "./App.css";

function App() {

  return (
    <div className="container">

      <h1>Seguimientoe Anime y Manga</h1>

      <Usuarios />

      <hr />

      <Titulos />

      <hr />

      <Progreso />

    </div>
  );

}

export default App;
