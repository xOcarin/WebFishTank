<?php
session_start();
$servername = "localhost"; // replace with your database hostname
$username = "id20422256_ocarin"; // replace with your database username
$password = "ShittyFart!5"; // replace with your database password
$dbname = "id20422256_users"; // replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get user data from form submission
$username = $_POST['username'];
$password = $_POST['password'];

// Query the database for the user with the given username
$sql = "SELECT * FROM users WHERE usersUid='$username'";
$result = $conn->query($sql);

// Check if the user was found
if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    // Verify the password
    if (password_verify($password, $row['usersPwd'])) {
        // Password is correct, so start a new session
        session_regenerate_id();
        $_SESSION['loggedin'] = TRUE;
        $_SESSION['username'] = $username;
        $_SESSION['userid'] = $row['userId'];
        echo 'Welcome ' . $_SESSION['username'] . '!';
    } else {
        // Password is incorrect
        echo 'Incorrect username or password!';
    }
} else {
    // User not found
    echo 'Incorrect username or password!';
}

$conn->close();
?>
