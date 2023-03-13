<?php

session_start();


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

// Get user data from form submission
$email = $_POST['email'];
$username = $_POST['username'];
$password = $_POST['password'];

// Hash the password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Check if the email or username is already in use
$sql = "SELECT * FROM users WHERE usersEmail='$email' OR usersUid='$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // Email or username already in use
  echo 'That email or username is already in use.';
} else {
  // Insert the new user into the database
  $sql = "INSERT INTO users (usersEmail, usersUid, usersPwd) VALUES ('$email', '$username', '$hashed_password')";

  if ($conn->query($sql) === TRUE) {
    // Start a new session for the new user
    session_regenerate_id();
    $_SESSION['loggedin'] = TRUE;
    $_SESSION['username'] = $username;
    $_SESSION['userid'] = $conn->insert_id;
    //echo 'Welcome ' . $_SESSION['username'] . '!';
    header("Location: index.html");
  } else {
    echo 'Error: ' . $sql . '<br>' . $conn->error;
  }
}

$conn->close();
?>
