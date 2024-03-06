const express = require('express');


const rotas = express();
const { registrarUsuario, getUsuario, atualizarUsuario, listarUsuarios } = require('./src/controladores/usuariosController.js');

const { authentication, validaToken } = require('./src/middlewares/authentication.js');
const { validaCampoCadastro, validaCampoLogin, validaAlteracaoUsuario } = require('./src/middlewares/validation.js');


//rotas usuarios
rotas.post('/usuario', validaCampoCadastro, registrarUsuario); //cadastrarUsuario
rotas.post('/login', validaCampoLogin, authentication); //login do usuario

rotas.use(validaToken); //Os endpoints abaixo só podem funcionar se for valido o token. 

rotas.get('/listar-usuario', listarUsuarios)
rotas.get('/usuario', getUsuario); //detalhar usuario
rotas.put('/alterar-usuario', validaAlteracaoUsuario, atualizarUsuario); //atualizar usuario


module.exports = rotas;
