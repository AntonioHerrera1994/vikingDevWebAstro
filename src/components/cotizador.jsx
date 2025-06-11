import React, { useState, useEffect } from "react";
import './cotizacion.css';


export default function Cotizacion() {
  const [nombre, setNombre] = useState("");
  const [tipoSitio, setTipoSitio] = useState("no necesito sitio web");
  const [servicioAdicional, setServicioAdicional] = useState("ninguno");
  const [respuestaComplemento, setRespuestaComplemento] = useState("no");
  const [total, setTotal] = useState(0);

  const preciosTipoSitio = {
    "no necesito sitio web": 0,
    "sitio one page": 4000,
    "sitio web completo": 5500,
    "e-commerce": 7500,
  };

  const preciosServiciosAdicionales = {
    "ninguno": 0,
    "Campañas publictarias en Google Ads / Facebook Ads": 2000,
    "Manejo Completo de Redes Sociales": 2000,
  };

  const getComplemento = (opcion) => {
    if (opcion === "Campañas publictarias en Google Ads / Facebook Ads") {
      return "Manejo Completo de Redes Sociales";
    }
    if (opcion === "Manejo Completo de Redes Sociales") {
      return "Campañas publictarias en Google Ads / Facebook Ads";
    }
    return null;
  };

  useEffect(() => {
    let totalCalculado = preciosTipoSitio[tipoSitio];

    if (servicioAdicional !== "ninguno") {
      totalCalculado += preciosServiciosAdicionales[servicioAdicional];

      if (respuestaComplemento === "si") {
        const complemento = getComplemento(servicioAdicional);
        totalCalculado += preciosServiciosAdicionales[complemento];
      }
    }

    setTotal(totalCalculado);
  }, [tipoSitio, servicioAdicional, respuestaComplemento]);

  const enviarWhatsApp = () => {
    const numero = "526632477816"; // Tu número real
    const servicios = [];

    if (servicioAdicional !== "ninguno") {
      servicios.push(servicioAdicional);

      if (respuestaComplemento === "si") {
        const complemento = getComplemento(servicioAdicional);
        servicios.push(complemento);
      }
    }

    const mensaje = `Hola, mi nombre es ${nombre}.
Estoy interesado en una cotización con las siguientes opciones:

🖥 Tipo de sitio: ${tipoSitio} ($${preciosTipoSitio[tipoSitio]})
🛠 Servicios adicionales:
${servicios.map((s) => `- ${s} ($${preciosServiciosAdicionales[s]})`).join("\n")}
💰 Total estimado: $${total}

¿Podrías darme más información?`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  const mostrarComplemento =
    servicioAdicional !== "ninguno" && getComplemento(servicioAdicional);

  return (
    <div className="cotizacion-container">
      <h2 className="cotizacion-title ">Cotizador</h2>

      <label className="cotizacion-label">Tu nombre:</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="cotizacion-input"
      />

      <label className="cotizacion-label">Tipo de sitio web:</label>
      <select
        value={tipoSitio}
        onChange={(e) => setTipoSitio(e.target.value)}
        className="cotizacion-select"
      >
        {Object.keys(preciosTipoSitio).map((key) => (
          <option key={key} value={key}>
            {preciosTipoSitio[key] > 0 ? `${key} ($${preciosTipoSitio[key]})` : key}
          </option>
        ))}
      </select>

      <label className="cotizacion-complemento">Servicio adicional:</label>
      <select
        value={servicioAdicional}
        onChange={(e) => {
          setServicioAdicional(e.target.value);
          setRespuestaComplemento("no"); // Reinicia si cambia
        }}
        className="cotizacion-select"
      >
        {Object.keys(preciosServiciosAdicionales).map((key) => (
          <option key={key} value={key}>
            {preciosServiciosAdicionales[key] > 0 ? `${key} ($${preciosServiciosAdicionales[key]})` : key}
          </option>
        ))}
      </select>

      {mostrarComplemento && (
        <div>
          <p>
            ¿También deseas{" "}
            {getComplemento(servicioAdicional)}?
          </p>
          <select
            value={respuestaComplemento}
            onChange={(e) => setRespuestaComplemento(e.target.value)}
            className="cotizacion-select"
          >
            <option value="no">No, gracias</option>
            <option value="si">Sí, agregar</option>
          </select>
        </div>
      )}

      <p className="cotizacion-total">Total estimado: ${total}</p>

      <button onClick={enviarWhatsApp} disabled={!nombre} className="cotizacion-boton">
        Enviar por WhatsApp
      </button>
    </div>
  );
}
