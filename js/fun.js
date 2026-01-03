const logoutBtn = document.getElementById("logoutBtn");
const postFunBtn = document.getElementById("postFunBtn");
const funMessageInput = document.getElementById("funMessage");
const funFeed = document.getElementById("funFeed");

let currentUser = null;

auth.onAuthStateChanged(user => {
  if (!user) return;
  currentUser = user;
  loadFunPosts();
});

logoutBtn.onclick = () => auth.signOut().then(() => window.location.href = "index.html");

postFunBtn.onclick = async () => {
  if (!currentUser) return;

  const message = funMessageInput.value.trim();
  if (!message) return;

  await db.collection("funPosts").add({
    uid: currentUser.uid,
    message,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  funMessageInput.value = "";
  loadFunPosts();
};

async function loadFunPosts() {
  const snap = await db.collection("funPosts").orderBy("createdAt", "desc").get();
  funFeed.innerHTML = "";

  snap.forEach(doc => {
    const post = doc.data();
    const div = document.createElement("div");
    div.className = "glass-card";
    div.innerHTML = `
      <p>${post.message}</p>
    `;
    funFeed.appendChild(div);
  });
}