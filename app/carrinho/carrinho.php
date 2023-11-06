<?php
$host = "localhost";
$db   = "carrinho";
$user = "root";
$pass = "";

$conn = mysqli_connect($host, $user, $pass, $db) or trigger_error(mysqli_error($conn), E_USER_ERROR); 

if ($conn->connect_error) {
    die("Conexão com o banco de dados falhou: " . $conn->connect_error);
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["produto"]) && isset($_POST["preco"]) && isset($_POST["quantidade"])) {
        $produtos = json_decode($_POST["produto"]);
        $precos = json_decode($_POST["preco"]);
        $quantidades = json_decode($_POST["quantidade"]);
        

        if ($produtos !== null && $precos !== null && $quantidades !== null) {
            for ($i = 0; $i < count($produtos); $i++) {
                $produto = $produtos[$i];
                $preco = floatval(str_replace("R$", "", str_replace(",", ".", $precos[$i])));
                $quantidade = intval($quantidades[$i]);
                $total = floatval($preco * $quantidade);

                $sql = "INSERT INTO produtos (nome, preco, quantidade, total) VALUES ('$produto', '$preco', '$quantidade', '$total')";


                if ($conn->query($sql) !== TRUE) {
                    echo '<div class="error mensagem">Erro ao registrar o pedido: ' . $conn->error . '</div>';
                    echo '<a  class="mensagem" href="../index/index.html"><button class="btn">Voltar ao Início</button></a>';
                    break;
                }
            }

            if ($conn->error) {
                echo '<div class="error mensagem">Erro ao registrar o pedido: ' . $conn->error . '</div>';
            } else {
                echo '<div class="success mensagem">Pedido(s) registrado(s) com sucesso!</div>';
                echo '<a class="mensagem" href="../index/index.html"><button class="btn">Voltar ao Início</button></a>';
            }
        } else {
            echo '<div class="error mensagem">Dados inválidos enviados pelo formulário.</div>';
            echo '<a class="mensagem" href="../carrinho/carrinho.html"><button class="btn">Voltar ao Carrinho</button></a>';
        }
    } else {
        echo "Dados ausentes no formulário.";
        echo '<a class="mensagem" href="../carrinho/carrinho.html"><button class="btn">Voltar ao Carrinho</button></a>';
    }
}

$conn->close();
?>

<style>

.mensagem {
    margin-top: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 10px;
}

.error {
    color: red;
    font-weight: bold;
}

.success {
    color: green;
    font-weight: bold;
}

.error-message, .success-message {
    margin-bottom: 10px;
}

.btn {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 5px;
}

.btn:hover {
    background-color: white;
    color: black;
    border: 2px solid #007bff;
}

</style>