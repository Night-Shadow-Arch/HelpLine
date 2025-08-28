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


const profileIcon = document.getElementById("profileIcon");
const usernameTooltip = document.getElementById("usernameTooltip");

profileIcon.addEventListener("mouseover", () => {
    usernameTooltip.style.display = "block";
});

profileIcon.addEventListener("mouseout", () => {
    usernameTooltip.style.display = "none";
});


profileIcon.addEventListener("click", () => {
    if (usernameTooltip.style.display === "block") {
        usernameTooltip.style.display = "none";
    } else {
        usernameTooltip.style.display = "block";
    }
});


const symptomCheckerBtn = document.getElementById("symptomCheckerBtn");
const symptomModal = document.getElementById("symptomModal");
const closeModal = document.getElementById("closeModal");
const viewDoctorsBtn = document.getElementById("viewDoctorsBtn");

symptomCheckerBtn.addEventListener("click", () => {
    symptomModal.style.display = "flex";
    document.body.style.overflow = "hidden"; 
});

closeModal.addEventListener("click", () => {
    symptomModal.style.display = "none";
    document.body.style.overflow = "auto"; 
    resetForm();
});


symptomModal.addEventListener("click", (e) => {
    if (e.target === symptomModal) {
        symptomModal.style.display = "none";
        document.body.style.overflow = "auto"; 
        resetForm();
    }
});


document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && symptomModal.style.display === "flex") {
        symptomModal.style.display = "none";
        document.body.style.overflow = "auto"; 
        resetForm();
    }
});


document.getElementById("symptomForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const severity = document.getElementById("severity").value;
    const bodyPart = document.getElementById("bodypart").value;
    const symptom = document.getElementById("symptoms").value;
    const symptomText = document.getElementById("symptoms").options[document.getElementById("symptoms").selectedIndex].text;

    if (severity === "mild") {
        showMildResults(bodyPart, symptom, symptomText);
    } else if (severity === "moderate" || severity === "severe") {
        showSevereWarning();
    }

    nextStep(3); 
});


function showMildResults(bodyPart, symptom, symptomText) {
    document.getElementById("mildResults").style.display = "block";
    document.getElementById("severeWarning").style.display = "none";

    const causesElement = document.getElementById("causesText");
    const remediesElement = document.getElementById("remediesText");

   
    const analysis = getSymptomAnalysis(bodyPart, symptom, symptomText);

    causesElement.innerHTML = analysis.causes;
    remediesElement.innerHTML = analysis.remedies;


    viewDoctorsBtn.onclick = function() {
        showDoctorRecommendations(bodyPart);
        nextStep(4); 
    };
}

function showSevereWarning() {
    document.getElementById("mildResults").style.display = "none";
    document.getElementById("severeWarning").style.display = "block";


    const bodyPart = document.getElementById("bodypart").value;

    viewDoctorsBtn.onclick = function() {
        showDoctorRecommendations(bodyPart);
        nextStep(4); 
    };
}


function showDoctorRecommendations(bodyPart) {

    const doctorContainer = document.getElementById("doctorRecommendations");
    doctorContainer.innerHTML = "";

    let doctors = [];


    switch (bodyPart) {
        case "head":
            doctors = [{
                name: "Dr. Prabhat Chalishe",
                specialty: "Neurologist",
                phone: "+977-98XXXXXXX",
                email: "dr.prabhat@example.com"
            }];
            break;
        case "arm":
        case "leg":
            doctors = [{
                    name: "Dr. Suraj Dahal",
                    specialty: "Orthopedic Surgeon",
                    phone: "+977-98XXXXXXX",
                    email: "dr.suraj@example.com"
                },
                {
                    name: "Dr. Sishir Lakhey",
                    specialty: "Orthopedic Specialist",
                    phone: "+977-98XXXXXXX",
                    email: "dr.sishir@example.com"
                }
            ];
            break;
        case "chest":
            doctors = [{
                name: "Dr. Prahlad Karki",
                specialty: "Cardiologist",
                phone: "+977-98XXXXXXX",
                email: "dr.prahlad@example.com"
            }];
            break;
        case "stomach":
            doctors = [{
                    name: "Dr. Sasi Sharma Rijal",
                    specialty: "Gastroenterologist",
                    phone: "+977-98XXXXXXX",
                    email: "dr.sasi@example.com"
                },
                {
                    name: "Dr. Hari Ghimire",
                    specialty: "Gastroenterology Specialist",
                    phone: "+977-98XXXXXXX",
                    email: "dr.hari@example.com"
                }
            ];
            break;
        default:
            doctors = [{
                name: "General Physician",
                specialty: "Primary Care",
                phone: "+977-98XXXXXXX",
                email: "info@helpline.com"
            }];
    }

    doctors.forEach(doctor => {
        const doctorCard = document.createElement("div");
        doctorCard.className = "doctor-card";

        doctorCard.innerHTML = `
            <div class="doctor-name">${doctor.name}</div>
            <div class="doctor-specialty">${doctor.specialty}</div>
            <div class="doctor-contact">
                <div class="contact-item">
                    <i class="fas fa-phone contact-icon"></i>
                    <span>${doctor.phone}</span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-envelope contact-icon"></i>
                    <span>${doctor.email}</span>
                </div>
            </div>
        `;

        doctorContainer.appendChild(doctorCard);
    });
}

function getSymptomAnalysis(bodyPart, symptom, symptomText) {
    let causes = "";
    let remedies = "";

    switch (bodyPart) {
        case "head":
            if (symptom.includes("headache")) {
                causes = "Possible causes include tension headaches, dehydration, lack of sleep, eye strain, caffeine withdrawal, or mild sinus pressure. Stress and poor posture can also contribute to tension headaches.";
                remedies = "Rest in a quiet, dark room. Apply a cool compress to your forehead. Stay hydrated with water. Consider over-the-counter pain relievers like acetaminophen or ibuprofen if appropriate. Practice relaxation techniques and ensure adequate sleep.";
            } else if (symptom.includes("throbbing")) {
                causes = "Throbbing head pain often indicates migraines or cluster headaches. Possible triggers include hormonal changes, certain foods, bright lights, strong smells, or weather changes.";
                remedies = "Apply cold or warm compresses to head or neck. Massage scalp and temples. Avoid bright lights and loud noises. Consider prescribed migraine medication if available. Stay in a dark, quiet room.";
            } else if (symptom.includes("dizziness")) {
                causes = "Possible causes include low blood pressure, dehydration, inner ear problems (vertigo), low blood sugar, anxiety, or standing up too quickly. Can also be related to medication side effects.";
                remedies = "Sit or lie down immediately when dizzy. Drink water or juice. Move slowly when changing positions. Avoid sudden head movements. Eat regular meals to maintain blood sugar levels.";
            } else if (symptom.includes("migraine")) {
                causes = "Migraines are often caused by neurological factors, hormonal changes, stress, certain foods (aged cheese, processed meats), alcohol, caffeine, sensory stimuli, or changes in sleep patterns.";
                remedies = "Rest in dark, quiet room. Use migraine-specific medications if prescribed. Apply cold compress to forehead. Hydrate well. Avoid known triggers. Consider preventive medications if migraines are frequent.";
            }
            break;

        case "arm":
            if (symptom.includes("upper_arm_pain")) {
                causes = "Possible causes include muscle strain from overuse, rotator cuff issues, biceps tendonitis, frozen shoulder, or minor injuries from lifting heavy objects improperly.";
                remedies = "Rest the arm and avoid heavy lifting. Apply ice for 15-20 minutes several times daily. Use anti-inflammatory medication. Gentle stretching after 48 hours. Consider physical therapy for persistent pain.";
            } else if (symptom.includes("fracture")) {
                causes = "Arm fractures typically result from trauma, falls, direct blows, or sports injuries. Osteoporosis can increase fracture risk in older adults.";
                remedies = "SEEK IMMEDIATE MEDICAL ATTENTION. Immobilize the arm. Apply ice to reduce swelling. Do not attempt to realign the bone. Keep arm elevated to reduce swelling.";
            } else if (symptom.includes("tissue_tear")) {
                causes = "Muscle or tendon tears often occur from sudden heavy lifting, sports injuries, falls, or repetitive strain. Poor conditioning or inadequate warm-up can contribute.";
                remedies = "Follow RICE protocol: Rest, Ice, Compression, Elevation. Avoid using the arm. Seek medical evaluation for proper diagnosis. Physical therapy may be needed for recovery.";
            } else if (symptom.includes("elbow_pain")) {
                causes = "Possible causes include tennis elbow (lateral epicondylitis), golfer's elbow (medial epicondylitis), bursitis, arthritis, or nerve compression. Often related to repetitive motions.";
                remedies = "Rest and avoid repetitive motions. Ice the area for 15-20 minutes. Use elbow brace or strap. Gentle stretching exercises. Anti-inflammatory medications. Modify activities causing strain.";
            }
            break;

        case "leg":
            if (symptom.includes("knee_pain")) {
                causes = "Possible causes include patellofemoral pain syndrome, meniscus tears, ligament sprains, arthritis, bursitis, or IT band syndrome. Often related to overuse, improper alignment, or injury.";
                remedies = "Rest and avoid weight-bearing activities. Ice for 15-20 minutes. Elevate leg when possible. Use supportive footwear. Low-impact exercises like swimming. Consider knee brace if needed.";
            } else if (symptom.includes("muscle_cramps")) {
                causes = "Often caused by dehydration, electrolyte imbalances (especially potassium, magnesium, calcium), muscle fatigue, poor circulation, or nerve compression. Can occur during exercise or at night.";
                remedies = "Gently stretch and massage the affected muscle. Apply heat to tense muscles or ice if sore. Stay hydrated. Ensure balanced diet with electrolytes. Consider magnesium supplements if deficient.";
            } else if (symptom.includes("fracture")) {
                causes = "Leg fractures typically result from trauma, falls, sports injuries, or accidents. Osteoporosis, certain medications, or repetitive stress can increase fracture risk.";
                remedies = "SEEK IMMEDIATE MEDICAL ATTENTION. Keep leg immobilized. Apply ice to reduce swelling. Do not attempt to walk on injured leg. Elevate leg above heart level if possible.";
            } else if (symptom.includes("swelling")) {
                causes = "Swelling can indicate sprains, strains, inflammation, blood clots, infections, or circulatory problems. Can also be related to prolonged sitting or standing.";
                remedies = "Elevate leg above heart level. Apply ice for acute injuries. Use compression bandages. Stay mobile to promote circulation. Avoid prolonged sitting/standing. Seek medical attention if swelling is severe or sudden.";
            }
            break;

        case "chest":
            if (symptom.includes("chest_pain")) {
                causes = "Possible causes include muscle strain, acid reflux (GERD), anxiety attacks, costochondritis (chest wall inflammation), pleurisy, or respiratory infections. Always rule out cardiac causes.";
                remedies = "Rest and avoid strenuous activity. For muscle strain, use ice and anti-inflammatories. For acid reflux, avoid spicy foods and eat smaller meals. Practice relaxation techniques if anxiety-related. SEEK EMERGENCY CARE if pain is severe or accompanied by shortness of breath.";
            } else if (symptom.includes("tightness")) {
                causes = "Chest tightness can indicate anxiety, asthma, respiratory infections, muscle tension, or acid reflux. Can also be related to cardiac issues in some cases.";
                remedies = "Practice deep breathing exercises. Ensure proper posture. Use bronchodilators if asthma-related. Anti-anxiety techniques if stress-related. SEEK IMMEDIATE CARE if accompanied by pain radiating to arm, jaw, or shortness of breath.";
            } else if (symptom.includes("breathing_difficulty")) {
                causes = "Possible causes include asthma, allergies, respiratory infections, anxiety, COPD, or more serious conditions like pulmonary embolism or heart problems.";
                remedies = "SIT UPRIGHT and try to remain calm. Use prescribed inhalers if available. Practice pursed-lip breathing. SEEK EMERGENCY MEDICAL ATTENTION IMMEDIATELY if breathing difficulty is severe, sudden, or accompanied by chest pain.";
            }
            break;

        case "stomach":
            if (symptom.includes("stomach_ache")) {
                causes = "Possible causes include indigestion, gas, constipation, food intolerance, mild food poisoning, stress, or menstrual cramps. Can also be related to irritable bowel syndrome.";
                remedies = "Drink peppermint or ginger tea. Use heating pad on abdomen. Avoid fatty, spicy, or gas-producing foods. Eat smaller, more frequent meals. Stay hydrated with clear fluids. Rest and avoid strenuous activity.";
            } else if (symptom.includes("bloating")) {
                causes = "Often caused by gas production from certain foods, constipation, food intolerances (lactose, gluten), swallowing air, or irritable bowel syndrome. Can also be related to menstrual cycle.";
                remedies = "Avoid gas-producing foods (beans, broccoli, cabbage). Eat slowly to avoid swallowing air. Peppermint tea or capsules. Gentle walking after meals. Consider probiotic supplements. Stay hydrated.";
            } else if (symptom.includes("cramps")) {
                causes = "Abdominal cramps can indicate menstrual periods, gas, constipation, diarrhea, food poisoning, or inflammatory bowel conditions. Muscle strain or dehydration can also cause cramping.";
                remedies = "Apply heat to abdomen. Gentle abdominal massage. Stay hydrated with electrolyte solutions. Avoid dairy and high-fiber foods during acute episodes. Rest in comfortable position. Anti-spasmodic medications if appropriate.";
            } else if (symptom.includes("nausea")) {
                causes = "Possible causes include viral infections, food poisoning, motion sickness, pregnancy, medication side effects, anxiety, or acid reflux. Can also be early sign of various conditions.";
                remedies = "Sip clear fluids (water, ginger ale, broth). Eat bland foods (crackers, toast, bananas). Ginger tea or candies. Avoid strong odors. Rest in upright position. Consider anti-nausea medications if severe.";
            }
            break;

        default:
            causes = "Common causes could include minor strain, temporary inflammation, overuse, environmental factors, or mild infections. Stress and dehydration can also contribute to various symptoms.";
            remedies = "Rest the affected area. Stay hydrated with water. Consider over-the-counter remedies if appropriate. Monitor symptoms closely. Consult a healthcare professional if symptoms persist beyond 48 hours, worsen, or are accompanied by fever, severe pain, or other concerning symptoms.";
    }

    return {
        causes: causes,
        remedies: remedies
    };
}

function resetForm() {
    document.getElementById("symptomForm").reset();
    document.querySelectorAll(".sex-btn").forEach(btn => btn.classList.remove("active"));

  
    document.querySelectorAll(".form-step").forEach(step => {
        step.classList.remove("active");
    });
    document.getElementById("step1").classList.add("active");

  
    document.getElementById("mildResults").style.display = "block";
    document.getElementById("severeWarning").style.display = "none";
}

function resetFormAndClose() {
    resetForm();
    symptomModal.style.display = "none";
    document.body.style.overflow = "auto";
}