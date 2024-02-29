import React from "react";
import "./panel.css"; // Certifique-se de ajustar o caminho do arquivo conforme necessário

const ListaProdutos = () => {
  const handleListarProdutos = () => {
    console.log("Produtos listados!");
  };

  return (
    <div>
        {/* <Link to="/produtos">  para adicionar a rota*/}
      <button className="listar-produtos-btn" onClick={handleListarProdutos}>
        Listar Produtos
      </button>
      {/* </Link> */}
    </div>
  );
};

export default ListaProdutos;
