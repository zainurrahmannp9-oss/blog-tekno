async function loadPosts() {
  const res = await fetch('posts.json');
  const posts = await res.json();
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const container = document.querySelector('.post-list');
  const detailView = document.getElementById('postDetail');
  container.innerHTML = '';
  detailView.classList.add('hidden');

  if (id) {
    const post = posts.find(p => p.id == id);
    if (post) showPostDetail(post);
  } else {
    posts.forEach(p => container.appendChild(createPostCard(p)));
  }
}

function createPostCard(post) {
  const div = document.createElement('div');
  div.className = 'post-card';
  div.innerHTML = `
    <img src="${post.image}" alt="Thumbnail">
    <div class="post-content">
      <h3>${post.title}</h3>
      <p>${post.content.substring(0,200)}...</p>
      <span class="date">${post.date}</span>
    </div>
  `;
  div.onclick = () => showPostDetail(post);
  return div;
}

function showPostDetail(post) {
  const container = document.querySelector('.post-list');
  const detailView = document.getElementById('postDetail');
  container.innerHTML = '';
  detailView.innerHTML = `
    <img src="${post.image}" alt="">
    <h2>${post.title}</h2>
    <p>${post.content}</p>
    <span class="date">${post.date}</span><br>
    <small class="watermark">${post.watermark}</small><br><br>
    <button onclick="goHome()">⬅️ Kembali ke Beranda</button>
    <button onclick="sharePost(${post.id})">🔗 Share</button>
  `;
  detailView.classList.remove('hidden');
  window.history.pushState({}, '', '?id=' + post.id);
}

function goHome() {
  window.history.pushState({}, '', window.location.pathname);
  loadPosts();
}

function sharePost(id) {
  const shareUrl = window.location.origin + window.location.pathname + '?id=' + id;
  navigator.clipboard.writeText(shareUrl);
  alert('Link disalin: ' + shareUrl);
}

document.getElementById('toggleMode').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

loadPosts();
