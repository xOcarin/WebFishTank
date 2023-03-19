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

$sql = "SELECT usersUid FROM users";
$result = $conn->query($sql);
$usernames = array();

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    array_push($usernames, $row["usersUid"]);
  }
} else {
  echo "0 results";
}

$conn->close();
echo json_encode($usernames);



?>
