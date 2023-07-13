import React, { Component } from "react";
import ProdutoDataService from "../services/produtoDataService";

export default class AddProduto extends Component {

    constructor(props) {
        super(props);

        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangePreco = this.onChangePreco.bind(this);
        this.saveProduto = this.saveProduto.bind(this);
        this.newProduto = this.newProduto.bind(this);    
    
        this.state = {
            id: null,
            nome: "",
            preco: "", 
            publicado: false,      
            enviado: false
          };
    }

    onChangeNome(e) {
        this.setState({
          nome: e.target.value
        });
      }

      onChangePreco(e) {
        this.setState({
          preco: e.target.value
        });
      }

      saveProduto() {
        var data = {
          nome: this.state.nome,
          preco: this.state.preco
        };
    
        ProdutoDataService.create(data)
          .then(response => {
            this.setState({
              id: response.data.id,
              nome: response.data.nome,
              preco: response.data.preco,
              publicado: response.data.publicado,
    
              enviado: true
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

    newProduto() {
        this.setState({
          id: null,
          nome: "",
          preco: "",
          publicado: false,
    
          enviado: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                { this.state.enviado ? (
                              <div>
                              <h4>O produto foi adicionado ao catálogo!</h4>
                              <button className="btn btn-success" onClick={this.newProduto}>
                                Adicionar outro produto
                              </button>
                            </div>
                  
                ) : (
                    <div>
                    <div className="form-group">
                      <label htmlFor="nome"><strong>Nome do produto</strong></label>
                      <input
                        type="text"
                        className="form-control"
                        id="nome"
                        required
                        value={this.state.nome}
                        onChange={this.onChangeNome}
                        name="nome"
                      />
                    </div>
        
                    <div className="form-group">
                      <label htmlFor="preco"><strong>Preço(R$)</strong></label>
                      <input
                        type="text"
                        className="form-control"
                        id="preco"
                        required
                        value={this.state.preco}
                        onChange={this.onChangePreco}
                        name="preco"
                      />
                    </div>
                   <p></p>
                    <center><button onClick={this.saveProduto} className="btn btn-success">
                      Adicionar
                    </button></center>
                  </div>
                )}
            </div>
        )
    } 
}