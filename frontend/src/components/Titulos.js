import { useEffect, useState } from "react";
import API from "../services/api";

function Titulos() {

  const [titulos, setTitulos] = useState([]);

  useEffect(() => {
    API.get("/titulos")
      .then(res => setTitulos(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Lista de Anime/Manga</h2>

      {titulos.map(t => (
        <div key={t.id}>
          <b>{t.titulo}</b> - {t.genero}
        </div>
      ))}
    </div>
  );
}

export default Titulos;