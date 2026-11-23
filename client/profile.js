const user = sessionStorage.getItem("username");
if (!user) {
  window.location.href = "/";
}

document.getElementById("profileName").textContent = user;

const list = document.getElementById("reviewList");

async function loadReviews() {
  try {
    const response = await fetch("/user-reviews?username=" + encodeURIComponent(user));
    const data = await response.json();

    if (!data.reviews || data.reviews.length === 0) {
      list.textContent = "No reviews yet. Write your first one!";
      return;
    }

    data.reviews.forEach(function (r) {
      const card = document.createElement("div");
      card.className = "review-card";

      const heading = document.createElement("h4");
      heading.textContent = r.title + " by " + r.artist + " (" + r.itemType + ")";

      const stars = document.createElement("p");
      stars.className = "stars";
      stars.textContent = "Rating: " + r.rating + " / 5";

      const text = document.createElement("p");
      text.textContent = r.body;

      const date = document.createElement("p");
      date.className = "date";
      date.textContent = new Date(r.createdAt).toLocaleDateString();

      const editLink = document.createElement("a");
      
      editLink.href = "/review?id=" + r.reviewId;
      editLink.textContent = "Edit";
      editLink.className = "edit-link";
      

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", async function () {
        if (!confirm("Delete this review? This can't be undone.")) {
            return;
      }
        try {
        const response = await fetch("/delete-review", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ reviewId: r.reviewId, username: user })
        });
        const result = await response.json();
        
        if (result.success) {
            card.remove();
            if (list.children.length === 0) {
                list.textContent = "No reviews yet. Write your first one!";
            }
            } else {
                alert(result.msg);
            }
        } catch (error) {
            alert("Could not reach the server.");
        }
    });

    card.append(heading, stars, text, date, editLink, deleteBtn);

      list.appendChild(card);
    });
  } catch (error) {
    list.textContent = "Could not load reviews.";
  }
}

loadReviews();