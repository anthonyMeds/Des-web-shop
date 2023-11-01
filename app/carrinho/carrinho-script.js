
if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else{
    ready()
}


function ready() {


    // função de remover item do carrinho
    const botaoRemoverProduto = document.getElementsByClassName("botao-remover")
    console.log(botaoRemoverProduto)

    for( var i = 0; i < botaoRemoverProduto.length; i++) {
        botaoRemoverProduto[i].addEventListener("click", removerProdutos)
    }

    // dinamizar valorTotalDo carrinho com input quantidades
    const quantidadeInputs = document.getElementsByClassName("quantidade-input")
    for( var i = 0; i < quantidadeInputs.length; i++) {
        quantidadeInputs[i].addEventListener("change", atualizaTotal)
    }

    //adicionar produtos no carrinho
    const botaoAdicionarProdutoNoCarrinho = document.getElementsByClassName("button-hover-background")
    for( var i = 0; i < botaoAdicionarProdutoNoCarrinho.length; i++) {
        botaoAdicionarProdutoNoCarrinho[i].addEventListener("click", adicionarProdutoNoCarrinho)
    }

}

//função que adiciona produtos no carrinho
function adicionarProdutoNoCarrinho (event) {
    const botaoAdicionarAoCarrinho = event.target;
    const informacaoDosProdutos = botaoAdicionarAoCarrinho.parentElement.parentElement.parentElement
    const imagemProduto = informacaoDosProdutos.getElementsByClassName("img-cartao")[0].src
    const nomeProduto = informacaoDosProdutos.getElementsByClassName("card-text")[0].innerText
    const precoProduto = informacaoDosProdutos.getElementsByClassName("preco")[0].innerText

    const titulosProdutos = document.querySelectorAll(".titulo-produto");

    let produtoJaNoCarrinho = false;

    // Checar se produto já está no carrinho
    for (let i = 0; i < titulosProdutos.length; i++) {
        if (titulosProdutos[i].innerText == nomeProduto) {
            // Aumentar a quantidade
            titulosProdutos[i].parentElement.parentElement.querySelector(".quantidade-input").value++;
            produtoJaNoCarrinho = true;
            atualizaTotal()
            ready();
             break;
        }
    }

    if (!produtoJaNoCarrinho) {
        // escrever no html esses dados obtidos
        let novoProdutoNoCarrinho = document.createElement("tr")
        novoProdutoNoCarrinho.classList.add("produto-carrinho")

        novoProdutoNoCarrinho.innerHTML = 
        `<td class="identificacao-produto">
            <img src="${imagemProduto}" alt=${nomeProduto} class="imagem-produto">
            <strong class="titulo-produto">${nomeProduto}</strong>
        </td>
        <td>
            <span class="preco-produto">${precoProduto}</span>
        </td>
        <td>
            <input type="number" value="1" min="0" class="quantidade-input">
            <button type="button" class="botao-remover">Remover</button>
        </td> 
    `

        const tbody = document.querySelector(".tabela-carrinho tbody")
        tbody.append(novoProdutoNoCarrinho)

        //atualizar valor total após adição do carrinho
        atualizaTotal()
        ready();
    }
}


// função remover produto
function removerProdutos(event) {
    event.target.parentElement.parentElement.remove()
            atualizaTotal()
}



// atualizar preço total do carrinho ao remover produto

function atualizaTotal() {

    let valorTotal = 0
    const produtosNoCarrinho = document.getElementsByClassName("produto-carrinho")


    for( var i = 0; i < produtosNoCarrinho.length; i++) {
        const preco = produtosNoCarrinho[i].getElementsByClassName("preco-produto")[0].innerText.replace("R$", "").replace(",", ".")

        const quantidade = produtosNoCarrinho[i].getElementsByClassName("quantidade-input")[0].value

        valorTotal += preco * quantidade
        
    }
    valorTotal = valorTotal.toFixed(2).replace(".", ",")

    document.querySelector(".total-container span").innerText = "R$ " + valorTotal
    ready();
}




