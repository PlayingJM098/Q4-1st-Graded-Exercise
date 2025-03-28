// public/script.js (Frontend Fixes)
function solve() {
  const form = document.getElementById('input_form');
  const formData = new FormData(form);
  
  const name = formData.get('name');
  const gender = formData.get('gender');
  
  if (!name || !gender) {
      alert("Please enter all required fields.");
      return;
  }
  
  const pronoun = gender === "male" ? "he's" : "she's";
  const song1 = `For ${pronoun} a jolly good fellow...`;
  const song2 = `Happy birthday dear ${name}...`;
  
  document.getElementById("song_output").innerHTML = song1 + "<br>" + song2;
}
