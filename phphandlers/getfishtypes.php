<?php
$servername = "localhost";
$username = "id20422256_ocarin";
$password = "ShittyFart!5";
$dbname = "id20422256_users";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT usersFishtype FROM users";
$result = $conn->query($sql);
$fishtypes = array();

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    array_push($fishtypes, $row["usersFishtype"]);
  }
} else {
  echo "0 results";
}

$conn->close();
echo json_encode($fishtypes);



?>
