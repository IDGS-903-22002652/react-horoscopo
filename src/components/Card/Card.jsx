import React from "react";
import "./Card.css";
import aries from "../../assets/signos/aries.png";
import tauro from "../../assets/signos/taurus.png";
import geminis from "../../assets/signos/gemini.png";
import cancer from "../../assets/signos/cancer.png";
import leo from "../../assets/signos/leo.png";
import virgo from "../../assets/signos/virgo.png";
import libra from "../../assets/signos/libra.png";
import escorpio from "../../assets/signos/scorpio.png";
import sagitario from "../../assets/signos/sagittarius.png";
import capricornio from "../../assets/signos/capricorn.png";
import acuario from "../../assets/signos/aquarius.png";
import piscis from "../../assets/signos/pisces.png";

const imagenes = {
  Aries: aries,
  Tauro: tauro,
  Géminis: geminis,
  Cáncer: cancer,
  Leo: leo,
  Virgo: virgo,
  Libra: libra,
  Escorpio: escorpio,
  Sagitario: sagitario,
  Capricornio: capricornio,
  Acuario: acuario,
  Piscis: piscis,
};

const Card = ({ nombre, signo, proyeccion }) => {
  if (!nombre || !signo) return null;

  return (
    <div className="card">
      <h2>¡Resultado!</h2>
      <p>
        Hola, <span className="bold">{nombre}</span>.
      </p>
      <p>
        Tu signo zodiacal es: <span className="bold">{signo}</span>
      </p>
      <p className="proyeccion-text">
        Tu proyección de la semana es:{" "}
        <span className="bold">{proyeccion}</span>
      </p>
      {imagenes[signo] && (
        <img src={imagenes[signo]} alt={signo} className="signo-img" />
      )}
    </div>
  );
};

export default Card;
