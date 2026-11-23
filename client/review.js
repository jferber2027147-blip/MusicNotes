const message = document.getElementById("message");

const user = sessionStorage.getItem("username");
if (!user) {
  window.location.href = "/";
}

const params = new URLSearchParams(window.location.search);
const reviewId = params.get("id");

async function loadReview() {
  try {
    const response = await fetch(
      "/get-review?id=" + encodeURIComponent(reviewId) + "&username=" + encodeURIComponent(user)
    );
    const data = await response.json();
    console.log("get-review answered:", data);

    if (!data.review) {
      message.textContent = data.msg || "Review not found.";
      return;
    }

    document.getElementById("itemType").value = data.review.itemType;
    document.getElementById("title").value = data.review.title;
    document.getElementById("artist").value = data.review.artist;
    document.getElementById("rating").value = data.review.rating;
    document.getElementById("body").value = data.review.body;
  } catch (error) {
    message.textContent = "Could not load the review.";
  }
}

if (reviewId) {
  document.getElementById("formTitle").textContent = "Edit Your Review";
  document.getElementById("submitBtn").textContent = "Save Changes";
  loadReview();
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
  
  let url = "/create-review";
  let method = "POST";
  if (reviewId) {
    url = "/update-review";
    method = "PUT";
    review.reviewId = reviewId;
  }

  try {
    const response = await fetch(url, {
      method: method,
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