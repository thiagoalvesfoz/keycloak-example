import React from "react";
import { useHistory } from "react-router-dom";
import "./footer.css";
import { FaInstagramSquare, FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  const history = useHistory();

  const handleDashboard = () =>
    history.push({
      pathname: "/dashboard",
    });

  return (
    <footer className="footer-container">
      <div className="footer-items">
        <div className="item">
          <p className="item-title">INSTITUCIONAL</p>
          <ul className="item-links">
            <li className="link" onClick={handleDashboard}>
              Painel Administrativo
            </li>
            <li className="link">Quem Somos</li>
            <li className="link">Estrutura</li>
            <li className="link">Trabalhe Conosco</li>
            <li className="link">Contato</li>
          </ul>
        </div>
        <div className="item">
          <p className="item-title">SERVIÇOS</p>
          <ul className="item-links">
            <li className="link">consulta social</li>
            <li className="link">consulta popular</li>
            <li className="link">especialidades</li>
            <li className="link">convênios</li>
          </ul>
        </div>
        <div className="item">
          <p className="item-title">PACIENTE</p>
          <ul className="item-links">
            <li className="link">área do paciente</li>
            <li className="link">agendamentos</li>
            <li className="link">questionario de saúde</li>
            <li className="link"></li>
          </ul>
        </div>
        <div className="item">
          <p className="item-title">SOCIAL</p>
          <ul className="item-links">
            <li className="social-link">
              <FaInstagramSquare size="1.5rem" />
              <span>instagram</span>
            </li>
            <li className="social-link">
              <FaFacebookSquare size="1.5rem" />
              <span>facebook</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-rights">
        <p>
          © 2019 - Centro Integrado de Saúde <span className="title">Uniamérica</span> - Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
