


function parseDOB(dob) {
  let parts = dob.split('-').map(function (p) { return parseInt(p, 10); });
  return { Y: parts[0], M: parts[1], D: parts[2] };
}

function computeD(Y, M, D) {
  const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  
  let y = Y - (M < 3 ? 1 : 0);
  let res = y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + t[M - 1] + D;
  return ((res % 7) + 7) % 7;
}

function getAkanName(d, gender) {
  let male = ['Kwasi','Kwadwo','Kwabena','Kwaku','Yaw','Kofi','Kwame'];
  let female = ['Akosua','Adwoa','Abenaa','Akua','Yaa','Afua','Ama'];
  let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  let name = (gender === 'male') ? male[d] : female[d];
  return name + ' (' + days[d] + ')';
}

document.addEventListener('DOMContentLoaded', function () {
  let form = document.getElementById('simple-form');
  let answerForm = document.getElementById('answer-form');
  let akanInput = document.getElementById('akan-name');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let dob = document.getElementById('dob').value;
    let genderEl = document.querySelector('input[name="gender"]:checked');
    if (!dob || !genderEl) return; 

    let dobParts = parseDOB(dob);
    let d = computeD(dobParts.Y, dobParts.M, dobParts.D);
    akanInput.value = getAkanName(d, genderEl.value);
    answerForm.style.display = 'block';
  });
});