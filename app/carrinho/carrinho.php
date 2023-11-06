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
                    echo "Erro ao registrar o pedido: " . $conn->error;
                    break;
                }
            }

            if ($conn->error) {
                echo "Erro ao registrar o pedido: " . $conn->error;
            } else {
                echo "Pedido(s) registrado(s) com sucesso!";
            }
        } else {
            echo "Dados inválidos enviados pelo formulário.";
        }
    } else {
        echo "Dados ausentes no formulário.";
    }
}


$conn->close();
?>
