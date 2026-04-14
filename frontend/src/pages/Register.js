import { useState } from "react";
import API from "../services/api";

function Register({ setVista }) {

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contraseña: ""
  });

  const [error, setError] = useState("");

  const registrar = async () => {
    try {
      setError("");

      if (!form.nombre || !form.correo || !form.contraseña) {
        setError("Todos los campos son obligatorios");
        return;
      }

      await API.post("/usuarios/registro", {
        nombre: form.nombre,
        correo: form.correo,
        contraseña: form.contraseña   // 🔥 CORREGIDO
      });

      alert("Usuario registrado correctamente");
      setVista("login");

    } catch (err) {
      console.log(err.response?.data);

      setError(
        err.response?.data?.detail?.[0]?.msg ||
        err.response?.data?.detail ||
        "Error al registrar"
      );
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h2>Registro</h2>

        {error && <p className="error">{error}</p>}

        <div className="form-group">

          <input
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) =>
              setForm({ ...form, nombre: e.target.value })
            }
          />

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

          <button onClick={registrar}>
            Registrarse
          </button>

          <span
            className="link"
            onClick={() => setVista("login")}
          >
            Ya tengo cuenta
          </span>

        </div>

      </div>
    </div>
  );
}

export default Register;