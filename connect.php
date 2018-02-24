<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>connect</title>
</head>
<body>

<?php
$servername = "localhost";
$username = "root";
$password = "KJ2130298AI7";

try {
    $pdo = new PDO("mysql:host=$servername;dbname=webaccount", $username, $password);
    echo "连接好了";

    $sql = "DELETE FROM account_info WHERE id=3";
    $pdo -> exec($sql);

}
catch(PDOException $e)
{
    echo $e->getMessage();
}

?>

</body>
</html>
