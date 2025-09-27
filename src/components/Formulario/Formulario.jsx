import React, { useState } from "react";
import "./Formulario.css";
import Card from "../Card/Card";

const proyeccionesSemanales = {
  Aries:
    "Semana de energía y comienzos. Es un buen momento para iniciar proyectos. Mantén la calma ante los desafíos.",
  Tauro:
    "Enfócate en la estabilidad financiera y el bienestar personal. Podrías recibir noticias agradables sobre dinero.",
  Géminis:
    "Comunicación clave esta semana. Expresa tus ideas claramente. Podrías tener un encuentro social muy estimulante.",
  Cáncer:
    "Prioriza tu hogar y familia. Es un buen momento para el autocuidado y para resolver asuntos domésticos pendientes.",
  Leo: "Tu creatividad estará en su punto máximo. Brilla en tu trabajo y en tus actividades sociales. Evita ser demasiado orgulloso.",
  Virgo:
    "Semana para organizar y planificar. Presta atención a los detalles en tu trabajo. Cuida tu alimentación y bienestar físico.",
  Libra:
    "Busca el equilibrio en tus relaciones. Un socio o amigo podría ofrecerte una perspectiva valiosa. Momento de decisiones justas.",
  Escorpio:
    "Transformación y profundidad marcan esta semana. Explora tus emociones. Podrías descubrir información importante.",
  Sagitario:
    "Aventura y aprendizaje están en el horizonte. Planifica un viaje o estudia algo nuevo. Mantén el optimismo.",
  Capricornio:
    "Enfócate en tus metas profesionales. El esfuerzo constante te dará resultados. No te olvides de tomar un descanso.",
  Acuario:
    "Las conexiones sociales y las ideas innovadoras son importantes. Un amigo te dará un consejo útil. Abre tu mente a lo inesperado.",
  Piscis:
    "Escucha tu intuición y conecta con tu lado artístico. Es un buen momento para la meditación o el descanso. Evita los excesos.",
};

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
    // Obtener la proyección semanal
    const proyeccion =
      proyeccionesSemanales[signo] || "No hay proyección disponible.";

    setResultado({ nombre: nombre.trim(), signo, proyeccion }); // <- Se agrega 'proyeccion'
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
      {/* Se pasa la prop 'proyeccion' al componente Card */}
      {resultado && (
        <Card
          nombre={resultado.nombre}
          signo={resultado.signo}
          proyeccion={resultado.proyeccion}
        />
      )}
    </div>
  );
};

export default Formulario;
