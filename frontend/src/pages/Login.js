import { useState } from "react";
import API from "../services/api";


function Login({ setUsuario, setVista }) {

  const [form, setForm] = useState({
    correo: "",
    contraseña: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const login = async () => {
    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("usuario", JSON.stringify(res.data));
      setUsuario(res.data);

    } catch (error) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="login">

      <h2>Login</h2>

      <input
        name="correo"
        value={form.correo}
        onChange={handleChange}
        placeholder="Correo"
      />

      <input
        name="contraseña"
        type="password"
        value={form.contraseña}
        onChange={handleChange}
        placeholder="Contraseña"
      />

      <button onClick={login}>
        Iniciar sesión
      </button>

      <button onClick={() => setVista("register")} style={{cursor: "pointer"}}>
        Crear cuenta
      </button>

    </div>
  );
}

export default Login;