const message = document.getElementById("message");

// Only logged-in users can post
const user = sessionStorage.getItem("username");
if (!user) {
  window.location.href = "/";
}

document.getElementById("submitBtn").addEventListener("click", async function () {
  const review = {
    username: user,
    itemType: document.getElementById("itemType").value,
    title: document.getElementById("title").value.trim(),
    artist: document.getElementById("artist").value.trim(),
    rating: document.getElementById("rating").value,
    body: document.getElementById("body").value.trim()
  };

  if (!review.title || !review.artist || !review.body) {
    message.textContent = "Please fill in the title, artist, and your review.";
    return;
  }

  try {
    const response = await fetch("/create-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review)
    });
    const data = await response.json();
    message.textContent = data.msg;

    if (data.success) {
      window.location.href = "/profile";
    }
  } catch (error) {
    message.textContent = "Could not reach the server.";
  }
});