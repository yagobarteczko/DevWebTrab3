import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { Routes, BrowserRouter, Route, Link } from "react-router-dom";

import ListProduto from "./components/listProduto";
import AddProduto from "./components/addProduto";
import Produto from "./components/produto";


class App extends Component {
  render() {
      return (
              <div>
                <BrowserRouter>
                  <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                    <div className="container">
                      <Link to={"/list"} className="navbar-brand">
                        <b><i>Mercado</i></b>
                      </Link>
                      <div className="navbar-nav mr-auto">
                        <li className="nav_item">
                          <Link to={"/list"} className="nav-link">
                            Listar
                          </Link>
                        </li>
                        <li className="nav_item">
                          <Link to={"/add"} className="nav-link">
                            Adicionar
                          </Link>
                        </li>
                      </div>
                    </div>
                  </nav>
                  <div className="container mt-3">
                    <Routes>
                      <Route element={<ListProduto />} path="/" />
                      <Route element={<ListProduto />} path="/list" />
                      <Route element={<AddProduto />} path="/add" />
                      <Route element={<Produto />} path="/list/:id" />
                    </Routes>
                  </div>
                </BrowserRouter>
              </div>
             );
  }
}
export default App;
