
if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else{
    ready()
}


let valorTotal = "0,00"

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
        quantidadeInputs[i].addEventListener("change", checarSeAquantidadeENula)
    }

    //adicionar produtos no carrinho
    const botaoAdicionarProdutoNoCarrinho = document.getElementsByClassName("button-hover-background")
    for( var i = 0; i < botaoAdicionarProdutoNoCarrinho.length; i++) {
        botaoAdicionarProdutoNoCarrinho[i].addEventListener("click", adicionarProdutoNoCarrinho)
    }

    //funcionalidade ao finalizar compra mostrar mensagem
    const botaoCompra = document.getElementsByClassName("botao-compra")[0]
    botaoCompra.addEventListener("click", mensagemCompra)
}


//função de mensagem ao clicar no finalizar compra
function mensagemCompra() {
    if(valorTotal == "0,00"){
        alert("Seu carrinho está vazio.")
    } else {
        alert(
            `
                Obrigado pela sua compra!
                Valor do pedido : R$${valorTotal}
                Volte sempre :)
            `
        )
    }

    //zerar carrinho ao finalizar
    const tbody = document.querySelector(".tabela-carrinho tbody");
    tbody.innerHTML = "";
    atualizaTotal()
}



//funcao que checa se a quantidade de itens é 0 e remove o produto
function checarSeAquantidadeENula(event) {

    if(event.target.value == "0") {
        removerProdutos(event)
    }

    atualizaTotal()
}


function adicionarProdutoNoCarrinho(event) {
    const botaoAdicionarAoCarrinho = event.target;
    const informacaoDosProdutos = botaoAdicionarAoCarrinho.parentElement.parentElement.parentElement;
    const imagemProduto = informacaoDosProdutos.getElementsByClassName("img-cartao")[0].src;
    const nomeProduto = informacaoDosProdutos.getElementsByClassName("card-text")[0].innerText;
    const precoProduto = informacaoDosProdutos.getElementsByClassName("preco")[0].innerText;

    const titulosProdutos = document.querySelectorAll(".titulo-produto");

    let produtoJaNoCarrinho = false;

    // Checar se produto já está no carrinho
    for (let i = 0; i < titulosProdutos.length; i++) {
        if (titulosProdutos[i].innerText == nomeProduto) {
            // Aumentar a quantidade
            titulosProdutos[i].parentElement.parentElement.querySelector(".quantidade-input").value++;
            produtoJaNoCarrinho = true;
            atualizaTotal();
            ready();
            break;
        }
    }

    if (!produtoJaNoCarrinho) {
        // escrever no html esses dados obtidos
        let novoProdutoNoCarrinho = document.createElement("tr");
        novoProdutoNoCarrinho.classList.add("produto-carrinho");

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
        `;

        const tbody = document.querySelector(".tabela-carrinho tbody");
        tbody.append(novoProdutoNoCarrinho);

        const produtos = document.querySelectorAll(".titulo-produto");
        const precos = document.querySelectorAll(".preco-produto");
        const quantidades = document.querySelectorAll(".quantidade-input");

        atualizaInputsHidden(produtos, precos, quantidades);
        //atualizar valor total após adição do carrinho
        atualizaTotal();
        ready();
    }
}


function atualizaInputsHidden() {
    const inputProduto = document.getElementById("produto");
    const inputPreco = document.getElementById("preco");
    const inputQuantidade = document.getElementById("quantidade");

    let produtosArray = [];
    let precosArray = [];
    let quantidadesArray = [];

    const titulosProdutos = document.querySelectorAll(".titulo-produto");
    const precos = document.querySelectorAll(".preco-produto");
    const quantidades = document.querySelectorAll(".quantidade-input");

    for (let i = 0; i < titulosProdutos.length; i++) {
        produtosArray.push(titulosProdutos[i].innerText);
        precosArray.push(precos[i].innerText);
        quantidadesArray.push(quantidades[i].value);
    }

    inputProduto.value = JSON.stringify(produtosArray);
    inputPreco.value = JSON.stringify(precosArray);
    inputQuantidade.value = JSON.stringify(quantidadesArray);
}


// função remover produto
function removerProdutos(event) {
    event.target.parentElement.parentElement.remove()
            atualizaTotal()
}



// atualizar preço total do carrinho ao remover produto

function atualizaTotal() {
    valorTotal = 0
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




