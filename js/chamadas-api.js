import { criaCard } from "./card.js";
import { divCarregando, divFiltro, divResultados, totalItensBuscados } from "./elementos-html.js";

async function buscarNaApi(categoria) {
  divFiltro.style.display = 'none';
  divCarregando.style.display = 'block';
  divResultados.innerHTML = '';

  try {
    const response = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/category/${categoria}`);
    const dados = await response.json();

    console.log(dados);

    dados.data.forEach(element => {
      const card = criaCard(element);
      divResultados.appendChild(card);
    });
    
    // for (let index = 0; index < dados.data.length; index++) {
    //   const card = criaCard(dados.data[index]);
    //   divResultados.appendChild(card);
    // }

    totalItensBuscados.textContent = dados.data.length;

    divCarregando.style.display = 'none';
    divFiltro.style.display = 'block';
  } catch(erro) {
    console.log('Ocorreu um erro ao buscar os dados na API: ', erro)
  }
}

export {
  buscarNaApi
}