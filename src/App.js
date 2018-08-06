import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
//IMportando o Jquery instalando via npm e assiociando $ como apelido
import $ from'jquery';

class App extends Component {

  constructor () {
    //Chamando o super do meu construtor
    super();

    //Estado que vou guardar meu JSON
    this.state = {lista : []};
  }
    
    //Define que será carregado antes do meu render
    componentWillMount(){
    console.log("willMount");
      $.ajax({
        //URL do meu arquivo - CDC.jar ou http://cdc-react.herokuapp.com/api/autores (Mais demorado)
        url:"http://cdc-react.herokuapp.com/api/autores",
        //Tipo dos dados
        dataType: 'json',
        //Função que retorna se tiver sucesso
        success:function(resposta){
        console.log("chegou a resposta");
          //Atualizando o estado do JSON automaticamente
          this.setState({lista:resposta});
        }.bind(this) //Indicando para a aplicação que o this que eu quero é do React e não do Jquery
      });
    }

  //Função responsável por executar meu HTML
  render() {
    console.log("render");
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">Home</a>
              </li>

              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">Autor</a>
              </li>

              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">Livro</a>
              </li>
            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadastro de Autores</h1>
          </div>
          <div className="content" id="content">
            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned">
                <div className="pure-control-group">
                  <label htmlFor="nome">Nome</label>
                  <input id="nome" type="text" name="nome" value="" />
                </div>
                <div className="pure-control-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" name="email" value="" />
                </div>
                <div className="pure-control-group">
                  <label htmlFor="senha">Senha</label>
                  <input id="senha" type="password" name="senha" />
                </div>
                <div className="pure-control-group">
                  <label></label>
                  <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                </div>
              </form>

            </div>
            <div>
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Senha</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {
                    
                    //MAP = Mapeamento listar de autores para uma lista de HTML
                    this.state.lista.map(function(autor){
                      
                      return (
                        <tr key={autor.id}>
                          <td>{autor.nome}</td>
                          <td>{autor.email}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default App;
