function nextStep(currentStep) {
  document.getElementById("step" + currentStep).classList.remove("active");
  document.getElementById("step" + (currentStep + 1)).classList.add("active");
}
document.querySelectorAll(".sex-btn").forEach(btn => {
  btn.addEventListener("click", function() {
    document.querySelectorAll(".sex-btn").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
  });
});
function loadSymptoms() {
  const bodypart = document.getElementById("bodypart").value;
  const symptomsDropdown = document.getElementById("symptoms");
  symptomsDropdown.innerHTML = '<option value="">Select a symptom</option>';

  let symptoms = [];

  if (bodypart === "head") {
    symptoms = ["Headache", "Throbbing Head Pain", "Dizziness", "Migraines"];
  } else if (bodypart === "arm") {
    symptoms = ["Upper Arm Pain", "Fracture", "Tissue Tear", "Elbow Pain"];
  } else if (bodypart === "leg") {
    symptoms = ["Knee Pain", "Muscle Cramps", "Fracture", "Swelling"];
  } else if (bodypart === "chest") {
    symptoms = ["Chest Pain", "Tightness", "Breathing Difficulty"];
  } else if (bodypart === "stomach") {
    symptoms = ["Stomach Ache", "Bloating", "Cramps", "Nausea"];
  }


  symptoms.forEach(symptom => {
    let option = document.createElement("option");
    option.value = symptom.toLowerCase().replace(/ /g, "_");
    option.textContent = symptom;
    symptomsDropdown.appendChild(option);
  });
}


document.addEventListener('DOMContentLoaded', function() {
  const firstNextBtn = document.getElementById('firstNextBtn');
  
  if (firstNextBtn) {
    firstNextBtn.addEventListener('click', function() {
      window.location.href = 'login.html';
    });
  }
});