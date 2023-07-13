package com.example.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;



    @Entity
@Table(name = "produto")
public class Produto {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @Column
  private String nome;

  @Column
  private String preco;

  public Produto() {

  }

  public Produto(String nome, String preco) {
    this.nome = nome;
    this.preco = preco;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getNome(){
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public String getPreco() {
    return preco;
  }

  public void setPreco(String preco) {
    this.preco = preco;
  }

  @Override
  public String toString() {
    return "Produto [id = " + id + ", nome = " + nome + ", preço = " + preco + "]";
  }
}
    

