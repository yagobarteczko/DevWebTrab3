package com.example.demo.control;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Produto;
import com.example.demo.repository.ProdutoRepository;

@CrossOrigin(origins = "*", maxAge = 3600)

@RestController
@RequestMapping("/api")
public class ProdutoController {
    
    @Autowired
    ProdutoRepository funcRep;
  
    // POST /api/produtos -> criar produto
    @PostMapping("/produtos")
    public ResponseEntity<Produto> createProduto(@RequestBody Produto produto) {
      try {
        Produto _produto = funcRep.save(new Produto(produto.getNome(), produto.getPreco()));
        return new ResponseEntity<>(_produto, HttpStatus.CREATED);
      } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    // GET /api/produtos -> listar todos os produtos
    @GetMapping("/produtos")
    public ResponseEntity<List<Produto>> getAllProdutos(@RequestParam(required = false) String nome) {
      try {
        List<Produto> lf = new ArrayList<Produto>();
        if(nome==null)
          funcRep.findAll().forEach(lf::add);
        else
        funcRep.findByNomeContaining(nome).forEach(lf::add);
  
        if (lf.isEmpty()) 
          return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        
  
        return new ResponseEntity<>(lf, HttpStatus.OK);
  
      } catch (Exception e) {
        
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    // DEL /api/produtos/:id -> remover produto dado um id
    @DeleteMapping("/produtos/{id}")
    public ResponseEntity<HttpStatus> deleteProduto(@PathVariable("id") long id) {
      try {
        funcRep.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
      } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    // DEL /api/produtos -> remover todos os produtos
    @DeleteMapping("/produtos")
    public ResponseEntity<HttpStatus> deleteAllProduto() {
      try {
        funcRep.deleteAll();
        return new ResponseEntity<>(HttpStatus.OK);
      } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}
