import React, { useState } from "react";
import "./Formulario.css";
import Card from "../Card/Card";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");

  const calcularSigno = (fecha) => {
    const date = new Date(fecha);
    const dia = date.getUTCDate();
    const mes = date.getUTCMonth() + 1;

    const signos = [
      { signo: "Aries", inicio: { mes: 3, dia: 21 }, fin: { mes: 4, dia: 19 } },
      { signo: "Tauro", inicio: { mes: 4, dia: 20 }, fin: { mes: 5, dia: 20 } },
      {
        signo: "Géminis",
        inicio: { mes: 5, dia: 21 },
        fin: { mes: 6, dia: 20 },
      },
      {
        signo: "Cáncer",
        inicio: { mes: 6, dia: 21 },
        fin: { mes: 7, dia: 22 },
      },
      { signo: "Leo", inicio: { mes: 7, dia: 23 }, fin: { mes: 8, dia: 22 } },
      { signo: "Virgo", inicio: { mes: 8, dia: 23 }, fin: { mes: 9, dia: 22 } },
      {
        signo: "Libra",
        inicio: { mes: 9, dia: 23 },
        fin: { mes: 10, dia: 22 },
      },
      {
        signo: "Escorpio",
        inicio: { mes: 10, dia: 23 },
        fin: { mes: 11, dia: 21 },
      },
      {
        signo: "Sagitario",
        inicio: { mes: 11, dia: 22 },
        fin: { mes: 12, dia: 21 },
      },
      {
        signo: "Capricornio",
        inicio: { mes: 12, dia: 22 },
        fin: { mes: 1, dia: 19 },
      },
      {
        signo: "Acuario",
        inicio: { mes: 1, dia: 20 },
        fin: { mes: 2, dia: 18 },
      },
      {
        signo: "Piscis",
        inicio: { mes: 2, dia: 19 },
        fin: { mes: 3, dia: 20 },
      },
    ];

    const signoEncontrado = signos.find((s) => {
      const inicio =
        s.inicio.mes < mes || (s.inicio.mes === mes && s.inicio.dia <= dia);
      const fin = s.fin.mes > mes || (s.fin.mes === mes && s.fin.dia >= dia);
      return inicio && fin;
    });

    if (signoEncontrado) return signoEncontrado.signo;
    if ((mes === 12 && dia >= 22) || (mes === 1 && dia <= 19))
      return "Capricornio";
    if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) return "Acuario";

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!nombre.trim() || !fechaNacimiento) {
      setError("Por favor, ingresa tu nombre y fecha de nacimiento.");
      return;
    }

    const signo = calcularSigno(fechaNacimiento);
    setResultado({ nombre: nombre.trim(), signo });
  };

  return (
    <div className="form-box">
      <div className="title">
        <h1>Horóscopo Zodiacal</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Escribe tu nombre"
          required
        />

        <label>Fecha de nacimiento:</label>
        <input
          type="date"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          required
        />

        <button type="submit">Descubre tu Signo</button>
      </form>

      {error && <div className="error">{error}</div>}
      {resultado && <Card nombre={resultado.nombre} signo={resultado.signo} />}
    </div>
  );
};

export default Formulario;
