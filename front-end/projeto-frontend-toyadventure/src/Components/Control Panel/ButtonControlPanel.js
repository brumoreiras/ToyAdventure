import React from "react";
import "./ButtonControlPanel.css";
import { Link } from "react-router-dom";

const ListaProdutos = ({ titulo }) => {
    /*  const handleListarProdutos = () => {
         console.log("Produtos listados!");
     }; */

    return (
        <div className="listar-produtos-btn">
            < Link to="/lista-de-produtos" >
                {titulo}
            </Link >
        </div >
    );
};

export default ListaProdutos;