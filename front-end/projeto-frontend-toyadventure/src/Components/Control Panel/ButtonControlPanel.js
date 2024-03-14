import React from "react";
import "./ButtonControlPanel.css";
import { Link } from "react-router-dom";

const ListaProdutos = ({ titulo, router }) => {
    /*  const handleListarProdutos = () => {
         console.log("Produtos listados!");
     }; */

    return (
        < Link to={router} >
            <div className="listar-produtos-btn">
                {titulo}
            </div >
        </Link >
    );
};

export default ListaProdutos;