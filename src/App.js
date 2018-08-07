import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
//IMportando o Jquery instalando via npm e assiociando $ como apelido
import $ from'jquery';
//Importando a minha classe InputCustomizado
import InputCustomizado from './componentes/inputCustomizado';

//Subir no git como OROGIN

class App extends Component {

  constructor () {
    //Chamando o super do meu construtor
    super();

    //Estado que vou guardar meu JSON + Dados do meu form
    this.state = {lista : [], nome:'',email:'',senha:''};
    //Meu form usa o meu this do meu React
    this.enviaForm = this.enviaForm.bind(this);
    //Meus inputs set's usam o meu this do meu React
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }
    
    //Define que será carregado antes do meu render
    componentWillMount(){
      $.ajax({
        //URL do meu arquivo - CDC.jar ou http://cdc-react.herokuapp.com/api/autores (Mais demorado)
        url:"http://cdc-react.herokuapp.com/api/autores",
        //Tipo dos dados
        dataType: 'json',
        //Função que retorna se tiver sucesso
        success:function(resposta){
          //Atualizando o estado do JSON automaticamente
          this.setState({lista:resposta});
        }.bind(this) //Indicando para a aplicação que o this que eu quero é do React e não do Jquery
      });
    }

    //Função de envio dos dados + (Evento do React)
    enviaForm(evento){
      //Define que esse evendo não seja mais propagado (Não atualiza a página)
      evento.preventDefault();
      
      $.ajax({
        url:'http://cdc-react.herokuapp.com/api/autores',
        contentType:'application/json',
        dataType: 'json',
        type:'post',
        //Dados que eu vou enviar / Stringify = transforma json em texto
        data: JSON.stringify({nome:this.state.nome,email:this.state.email,senha:this.state.senha}),
        //Enviou com sucesso
        success: function(resposta){
          console.log("sucesso");
          //Alterando o estado para recarregar minha lista sem recarrega a página
          this.setState({lista:resposta});
        }.bind(this),
        //Caso de erro
        error: function(resposta){
          console.log("erro");
        }
      });
    }

    //Pega o valor do meu input nome
    setNome(evento){
      this.setState({nome:evento.target.value});
    }

    //Pega o valor do meu input email
    setEmail(evento){
      this.setState({email:evento.target.value});
    }

    //Pega o valor do meu input senha
    setSenha(evento){
      this.setState({senha:evento.target.value});
    }

  //Função responsável por executar meu HTML
  render() {
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

              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                
                <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>

                <InputCustomizado id="email" type="text" name="email" value={this.state.email} onChange={this.setEmail} label="Email"/>
                
                <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha"/>

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
