import { useState } from "react";
import API from "../services/api";

function Login({ setUsuario, setVista }) {

  const [form, setForm] = useState({
    correo: "",
    password: ""
  });

  const [error, setError] = useState("");

  const login = async () => {
    try {
      setError("");

      if (!form.correo || !form.password) {
        setError("Completa todos los campos");
        return;
      }

      const res = await API.post("/login", form);

      // Guardar sesión
      localStorage.setItem("usuario", JSON.stringify(res.data));
      setUsuario(res.data);

    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="container">

      <div className="card">

        <h2>Iniciar Sesión</h2>

        {/* 🔴 ERROR */}
        {error && <p className="error">{error}</p>}

        {/* 🧾 FORM */}
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
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

        </div>

        {/* 🎯 ACCIONES */}
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