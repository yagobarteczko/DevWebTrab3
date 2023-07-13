import React, { Component } from "react";
import ProdutoDataService from "../services/produtoDataService";

import { useParams } from 'react-router-dom';

// Para obter parâmetros passados via Router v6
// Ex.: (em) this.props.match.params.id
export function withRouter(Children){
    return(props)=>{

       const match  = {params: useParams()};
       return <Children {...props}  match = {match}/>
   }
 }

class Produto extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangePreco = this.onChangePreco.bind(this);
    this.getProduto = this.getProduto.bind(this);
    this.updatePublicado = this.updatePublicado.bind(this);
    this.updateProduto = this.updateProduto.bind(this);
    this.deleteProduto = this.deleteProduto.bind(this);

    this.state = {
      produtoAtual: {
        id: null,
        nome: "",
        preco: "",
        publicado: false
      },
      mensagem: ""
    };
  }
  
  componentDidMount() {

    this.getProduto(this.props.match.params.id);
  }

  onChangeNome(e) {
    const nome = e.target.value;

    this.setState(function(prevState) {
      return {
        produtoAtual: {
          ...prevState.produtoAtual,
          nome: nome
        }
      };
    });
  }

  onChangePreco(e) {
    const preco = e.target.value;
    
    this.setState(prevState => ({
      produtoAtual: {
        ...prevState.produtoAtual,
        preco: preco
      }
    }));
  }

  getProduto(id) {
    ProdutoDataService.get(id)
      .then(response => {
        this.setState({
          produtoAtual: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        
        console.log("Erro: "+e);
      });
  }

  updatePublicado(status) {
    var data = {
      id: this.state.produtoAtual.id,
      nome: this.state.produtoAtual.nome,
      preco: this.state.produtoAtual.preco,
      publicado: status
    };

    ProdutoDataService.update(this.state.produtoAtual.id, data)
      .then(response => {
        this.setState(prevState => ({
          produtoAtual: {
            ...prevState.produtoAtual,
            publicado: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateProduto() {
    ProdutoDataService.update(
      this.state.produtoAtual.id,
      this.state.produtoAtual
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          mensagem: "Produto atualizado com sucesso!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteProduto() {    
    ProdutoDataService.delete(this.state.produtoAtual.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/list')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { produtoAtual } = this.state;

    return (
      <div>
        {produtoAtual ? (
          <div className="edit-form">
            <h4>Produto</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nome"><strong>Título</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={produtoAtual.nome}
                  onChange={this.onChangeNome}
                />
              </div>
              <div className="form-group">
                <label htmlFor="preco"><strong>Preço</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="preco"
                  value={produtoAtual.preco}
                  onChange={this.onChangePreco}
                />
              </div>

              {/* <div className="form-group">
                <br />
                <label>
                  <strong>Status:</strong>
                </label>
                    <b>
                    {produtoAtual.publicado ? " publicado" : " não publicado"}
                    </b>
              </div> */}
            </form>
            

            {/* {produtoAtual.publicado ? (
              <button
                className="m-2 btn btn-sm btn-primary mr-2"
                onClick={() => this.updatePublicado(false)}
              >
                Alterar status
              </button>
            ) : (
              <button
                className="m-2 btn btn-sm btn-primary mr-2"
                onClick={() => this.updatePublicado(true)}
              >
                Alterar status
              </button>
            )} */}

            <button
              className="m-2 btn btn-sm btn-danger mr-2"
              onClick={this.deleteProduto}
            >
              Excluir
            </button>

            <button
              type="submit"
              className="m-2 btn btn-sm btn-success"
              onClick={this.updateProduto}
            >
              Atualizar
            </button>
            <p>{this.state.mensagem}</p>
          </div>
        ) : (
          <div>
            <br />
            <p><i>Para detalhes, selecionar um produto.</i></p>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(Produto);