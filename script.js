// Load Comments using async/await
async function loadComments() {
  try {
    const response = await fetch("./data.json"); // 1) Load comments from JSON
async function loadComments() {
  try {
    const response = await fetch('./data.json');
    if (!response.ok) throw new Error('JSON file not loaded');

    const data = await response.json();
    displayComments(data.comments);
  } catch (err) {
    console.error('Error loading comments:', err);
  }
}

// 2) Render top‑level comments
function displayComments(comments) {
  let html = '';

  comments.forEach(comment => {
    html += `
      <div class="comment-box">
        <div class="user-info">
          <img src="${comment.user.image.png}" alt="${comment.user.username}" class="imgsize">
          <span class="username">${comment.user.username}</span>
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

  const container = document.getElementById('comment-container');
  container.innerHTML = html;

  /* attach click handlers **after** elements exist */
  container.querySelectorAll('.reply-btn').forEach(btn =>
    btn.addEventListener('click', handleReplyClick)
  );
}

// 3) Render replies for one comment
function displayReplies(replies) {
  let html = '';
  replies.forEach(reply => {
    html += `
      <div class="reply-box">
        <div class="user-info">
          <img src="${reply.user.image.png}" alt="${reply.user.username}" class="imgsizereply">
          <span class="username">${reply.user.username}</span>
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
  return html;
}

// 4) Show / hide the inline reply form
function handleReplyClick(e) {
  const commentBox = e.target.closest('.comment-box, .reply-box');

  /* if a form is already below this comment, remove (=toggle) */
  const maybeForm = commentBox.nextElementSibling;
  if (maybeForm && maybeForm.classList.contains('reply-form')) {
    maybeForm.remove();
    return;
  }

  const username =
    commentBox.querySelector('.username')?.textContent.trim() || 'user';

  const form = document.createElement('div');
  form.classList.add('reply-form');
  form.innerHTML = `
    <img src="./images/avatars/image-juliusomo.png" alt="You">
    <textarea placeholder="Add a reply...">@${username} </textarea>
    <button class="submit-reply">REPLY</button>
  `;

  /* insert form right after the current comment/reply */
  commentBox.insertAdjacentElement('afterend', form);
}

// 5) kick things off
loadComments();


    if (!response.ok) {
      throw new Error("JSON file not loaded");
    }

    let data = await response.json();

    displayComments(data.comments); 

  }
   catch (error) {
    console.error("Error loading comments:", error);
  }
}

// Display Comments
function displayComments(comments) {
  let html = "";

  comments.forEach(comment => { 
    html += `
      <div class="comment-box">
        <div class="user-info">
          <img src="${comment.user.image.png}" alt="${comment.user.username}" class= "imgsize">
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

  replies.forEach(reply => { 
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












