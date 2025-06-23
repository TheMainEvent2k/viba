import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

window.uploadScreenshot = async function () {
  const fileInput = document.getElementById("screenshot");
  const file = fileInput.files[0];
  const status = document.getElementById("status");

  if (!file) {
    status.innerText = "No file selected.";
    return;
  }

  status.innerText = "Uploading...";

  const storageRef = ref(storage, `screenshots/${file.name}`);
  await uploadBytes(storageRef, file);

  status.innerText = "Uploaded! Now processing...";

  // Placeholder stats (OCR to be added later)
  const fakeStats = {
    team: "Example Team",
    players: [
      { name: "Player 1", pts: 20, ast: 5, reb: 7 },
      { name: "Player 2", pts: 12, ast: 4, reb: 3 }
    ],
    result: "win",
    fouls: 7,
    screenshot: file.name
  };

  await addDoc(collection(db, "games"), fakeStats);
  status.innerText = "Uploaded and stats saved!";
};
