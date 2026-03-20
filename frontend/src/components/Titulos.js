import { useEffect, useState } from "react";
import API from "../services/api";

function Titulos(){

  const [titulos, setTitulos] = useState([]);

  useEffect(() => {
    API.get("/titulos")
      .then(res => setTitulos(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>

      <h2 style={{paddingLeft:"20px"}}>Catálogo</h2>

      <div className="grid">

        {titulos.map(t => (
          <div className="card" key={t.id}>

            <h3>{t.titulo}</h3>

            <p><b>Género:</b> {t.genero}</p>
            <p><b>Estado:</b> {t.estado}</p>
            <p><b>Episodios:</b> {t.total_episodios}</p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Titulos;