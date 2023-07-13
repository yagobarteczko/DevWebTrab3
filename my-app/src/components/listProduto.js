import React, { Component } from "react";
import ProdutoDataService from "../services/produtoDataService";
import { Link } from "react-router-dom";


export default class ListProduto extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchNome = this.onChangeSearchNome.bind(this);
    this.retrieveProdutos = this.retrieveProdutos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setProdutoSel = this.setProdutoSel.bind(this);
    this.removeAll = this.removeAll.bind(this);
    this.searchNome = this.searchNome.bind(this);

    this.state = {
      produtos: [],
      produtoSel: null,
      indice: -1,
      nome: ""
    };
  }

  componentDidMount() {
    this.retrieveProdutos();
  }

  onChangeSearchNome(e) {
    const searchNome = e.target.value;

    this.setState({
      nome: searchNome
    });
  }

  retrieveProdutos() {
    ProdutoDataService.getAll()
      .then(response => {
        this.setState({
          produtos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProdutos();
    this.setState({
      produtoSel: null,
      indice: -1
    });
  }

  setProdutoSel(produto, index) {
    this.setState({
      produtoSel: produto,
      indice: index
    });
  }

  removeAll() {
    ProdutoDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchNome() {
    this.setState({
      produtoSel: null,
      indice: -1
    });

    ProdutoDataService.findByNome(this.state.nome)
      .then(response => {
        this.setState({
          produtos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { nome, produtos, produtoSel, indice } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          {/* <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nome do produto"
              value={nome}
              onChange={this.onChangeSearchNome}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchNome}
              >
                Buscar
              </button>
            </div>
          </div> */}
        </div>
        <div className="col-md-6">
          <h4>Produtos</h4>

          <ul className="list-group">
            {produtos &&
              produtos.map((produto, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === indice ? "active" : "")
                  }
                  onClick={() => this.setProdutoSel(produto, index)}
                  key={index}
                >
                  {produto.nome}
                </li>
              ))}
          </ul>

          <center><button
            className="m-1 btn btn-sm btn-danger"
            onClick={this.removeAll}>Excluir todos
          </button></center>
        </div>
        <div className="col-md-6">
          {produtoSel ? (
            <div>
              <h4>&nbsp;</h4>
              <div>
                <label>
                  <strong>Produto:</strong>
                </label>{" "}
                {produtoSel.nome}
              </div>
              <div>
                <label>
                  <strong>Preço(R$):</strong>
                </label>{" "}
                {produtoSel.preco}
              </div>
              {/* <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {produtoSel.publicado ? "Publicado" : "Pendente"}
              </div> */}

              {/* <Link
                to={"/list/" + produtoSel.id}
                className="btn btn-sm btn-warning"
                role="button"
                >
                Editar
              </Link> */}
            </div>
          ) : (
            <div>
              <h4>&nbsp;</h4>
              
              <p><i>Para detalhes, selecionar um produto.</i></p>
            </div>
          )}
        </div>
      </div>
    );
  }
}