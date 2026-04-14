import { useState } from "react";
import API from "../services/api";

function Login({ setUsuario, setVista }) {

  const [form, setForm] = useState({
    correo: "",
    contraseña: ""
  });

  const [error, setError] = useState("");

  const login = async () => {
    try {
      setError("");

      if (!form.correo || !form.contraseña) {
        setError("Completa todos los campos");
        return;
      }

      const res = await API.post("/auth/login", {
        correo: form.correo,
        contraseña: form.contraseña   // 🔥 CORREGIDO
      });

      localStorage.setItem("usuario", JSON.stringify(res.data));
      setUsuario(res.data);

    } catch (err) {
      console.log(err.response?.data);

      setError(
        err.response?.data?.detail ||
        "Credenciales incorrectas"
      );
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h2>Iniciar Sesión</h2>

        {error && <p className="error">{error}</p>}

        <div className="form-group">

          <input
            placeholder="Correo"
            value={form.correo}
            onChange={(e) =>
              setForm({ ...form, correo: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={form.contraseña}
            onChange={(e) =>
              setForm({ ...form, contraseña: e.target.value })
            }
          />

        </div>

        <div className="form-actions">

          <button onClick={login}>
            Entrar
          </button>

          <span
            className="link"
            onClick={() => setVista("register")}
          >
            Crear cuenta
          </span>

        </div>

      </div>
    </div>
  );
}

export default Login;