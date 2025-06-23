// Load Comments using async/await
async function loadComments() {
  try {
    const response = await fetch("./data.json"); // ❗ You forgot 'await' here.

    if (!response.ok) {
      throw new Error("JSON file not loaded");
    }

    let data = await response.json();

    displayComments(data.comments); // ❗ Pass data correctly

  } catch (error) {
    console.error("Error loading comments:", error);
  }
}

// Display Comments
function displayComments(comments) {
  let html = "";

  comments.forEach(comment => { // ❗ Correct spelling: forEach
    html += `
      <div class="comment-box">
        <div class="user-info">
          <img src="${comment.user.image.png}" alt="${comment.user.username}">
          <span>${comment.user.username}</span>
          <span>${comment.createdAt}</span>
        </div>
        <p>${comment.content}</p>
        <div class="score-box">
          <button>+</button>
          <span>${comment.score}</span>
          <button>-</button>
        </div>
        <button class="reply-btn">Reply</button>
        <div class="replies">
          ${displayReplies(comment.replies)}
        </div>
      </div>
    `;
  });

  document.getElementById('comment-container').innerHTML = html; // ❗ You forgot to select the container
}

// Display Replies
function displayReplies(replies) {
  let repliesHTML = "";

  replies.forEach(reply => { // ❗ Correct spelling: forEach
    repliesHTML += `
      <div class="reply-box">
        <div class="user-info">
          <img src="${reply.user.image.png}" alt="${reply.user.username}">
          <span>${reply.user.username}</span>
          <span>${reply.createdAt}</span>
        </div>
        <p><span class="replying-to">@${reply.replyingTo}</span> ${reply.content}</p>
        <div class="score-box">
          <button>+</button>
          <span>${reply.score}</span>
          <button>-</button>
        </div>
        <button class="reply-btn">Reply</button>
      </div>
    `;
  });

  return repliesHTML;
}

// Start loading comments
loadComments();
