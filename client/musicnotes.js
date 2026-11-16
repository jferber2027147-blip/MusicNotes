const message = document.getElementById("message");

async function sendToServer(url) {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if(!username || !password) {
        message.textContent = "Please enter your email and password.";
        return;
    }

     try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password })
    });
    const data = await response.json();
    message.textContent = data.msg;
  } catch (error) {
    message.textContent = "Could not reach the server.";
  }
}

document.getElementById("loginBtn").addEventListener("click", function () {
  sendToServer("/login");
});

document.getElementById("createBtn").addEventListener("click", function () {
  sendToServer("/create-account");
});
