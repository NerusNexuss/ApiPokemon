document.addEventListener("DOMContentLoaded", function () {
  const resultadoPokemon = document.getElementsByClassName("row");
});
class api {
  constructor(url) {
    this.url = url;
  }
  async retornaPokemon(especifico, idPokemon) {
    const api = await fetch(this.url)
    const response = await api.json();
    console.log(response.sprites)
    let Elementos = "";
    if (especifico !== undefined) {
 
      document.querySelector(`#${idPokemon}`).innerHTML = `<div>${especifico}<img src="${response.sprites.front_default}"</div>`;

      return response;
    } else {
      Elementos = response.results.map((elemento) => {
        return `${elemento.name}`;
      })

      let pokemonDiv = document.createElement("div");
     

      let contador = 0;
      let rowElement = document.createElement("div");
      rowElement.className = "row";

      for (let x = 0; x < Elementos.length; x = x + 1) {
        
        let spanElement = document.createElement("span");
        spanElement.className = "col";
        spanElement.style.padding = "25px";
   
        spanElement.innerHTML = `<button class="btn btn-danger" value=${Elementos[x]} id = "pokemon${x}">${Elementos[x]}</button>`;

     
        rowElement.appendChild(spanElement);
        contador++;

    
        if (contador === 5) {
          pokemonDiv.appendChild(rowElement);
          rowElement = document.createElement("div");
          rowElement.className = "row";
          contador = 0;
        }
      }

     
      if (contador > 0) {
        pokemonDiv.appendChild(rowElement);
      }

      resultadoPokemon.appendChild(pokemonDiv);

      return response;
    }

  }
  async escolherExibicao(especifico, id) {
    if (especifico) {
      return await this.retornaPokemon(especifico, id);

    }
    const resultado = await this.retornaPokemon()
    function selecionarPokemon(nomePokemon, idPokemon) {
      const retornoNOme = new api(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`)
      retornoNOme.escolherExibicao(nomePokemon, idPokemon)
    }

    for (let x = 0; x < 60; x = x + 1) {
      let elemento = document.querySelector(`#pokemon${x}`)
      elemento.addEventListener("click", (event) => {
        let nomePokemon = event.target.value;
        let idPokemon = event.target.id
        selecionarPokemon(nomePokemon, idPokemon);
      })
    }
  }
}

const retornoNOme = new api('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=60')
retornoNOme.escolherExibicao()
