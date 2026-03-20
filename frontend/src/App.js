import "./App.css";
import Titulos from "./components/Titulos";
import Usuarios from "./components/Usuarios";
import Progreso from "./components/Progreso";

function App(){

  return (
    <div>

      <div className="navbar">
        Anime Tracker 🎌
      </div>

      <Usuarios />

      <Titulos />

      <Progreso />

    </div>
  );
}

export default App;