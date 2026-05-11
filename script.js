let photoURL = "";

// Upload Photo
document.getElementById("profilePhoto").addEventListener("change", function(e){

    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = function(){
        photoURL = reader.result;
    }

    reader.readAsDataURL(file);
});

// Add Functions

function addSkill(){
    document.getElementById("skillsSection").innerHTML +=
    `<input type="text" placeholder="Skill">`;
}

function addEducation(){

    document.getElementById("educationSection").innerHTML += `

    <div class="education-block drag-item">
        <input type="text" placeholder="University">
        <input type="text" placeholder="Degree">
        <input type="text" placeholder="Year">
        <input type="text" placeholder="GPA">
    </div>
    `;
}

function addExperience(){

    document.getElementById("experienceSection").innerHTML += `

    <div class="experience-block drag-item">
        <input type="text" placeholder="Company">
        <input type="text" placeholder="Role">
        <input type="text" placeholder="Duration">
        <textarea placeholder="Description"></textarea>
    </div>
    `;
}

function addProject(){

    document.getElementById("projectSection").innerHTML += `

    <div class="project-block drag-item">
        <input type="text" placeholder="Project Name">
        <textarea placeholder="Project Description"></textarea>
    </div>
    `;
}

function addAchievement(){

    document.getElementById("achievementSection").innerHTML +=
    `<input type="text" placeholder="Achievement">`;
}

function addHobby(){

    document.getElementById("hobbySection").innerHTML +=
    `<input type="text" placeholder="Hobby">`;
}

function addLanguage(){

    document.getElementById("languageSection").innerHTML +=
    `<input type="text" placeholder="Language">`;
}

// Generate Resume

function generateResume(){

    const resume = document.getElementById("resumePreview");

    const template = document.getElementById("templateSelect").value;

    resume.className = "resume-section " + template;

    const name = document.getElementById("name").value;
    const role = document.getElementById("role").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const location = document.getElementById("location").value;
    const linkedin = document.getElementById("linkedin").value;
    const github = document.getElementById("github").value;
    const summary = document.getElementById("summary").value;

    // Skills
    let skills = "";

    document.querySelectorAll("#skillsSection input").forEach(skill=>{
        skills += `<li>${skill.value}</li>`;
    });

    // Education
    let education = "";

    document.querySelectorAll(".education-block").forEach(block=>{

        const inputs = block.querySelectorAll("input");

        education += `
        <div>
            <b>${inputs[1].value}</b><br>
            ${inputs[0].value}<br>
            ${inputs[2].value} | GPA: ${inputs[3].value}
        </div><br>
        `;
    });

    // Experience
    let experience = "";

    document.querySelectorAll(".experience-block").forEach(block=>{

        const inputs = block.querySelectorAll("input");

        const textarea = block.querySelector("textarea");

        experience += `
        <div>
            <b>${inputs[1].value}</b> - ${inputs[0].value}<br>
            ${inputs[2].value}
            <p>${textarea.value}</p>
        </div>
        `;
    });

    // Projects
    let projects = "";

    document.querySelectorAll(".project-block").forEach(block=>{

        const input = block.querySelector("input");

        const textarea = block.querySelector("textarea");

        projects += `
        <div>
            <b>${input.value}</b>
            <p>${textarea.value}</p>
        </div>
        `;
    });

    // Final Resume

    resume.innerHTML = `

    <div class="resume-header">

        <img src="${photoURL}" />

        <h1>${name}</h1>

        <h3>${role}</h3>

        <p>
        ${email} |
        ${phone} |
        ${location}
        </p>

        <p>
        ${linkedin}<br>
        ${github}
        </p>

    </div>

    <div class="resume-block">
        <h2>Professional Summary</h2>
        <p>${summary}</p>
    </div>

    <div class="resume-block">
        <h2>Skills</h2>
        <ul>${skills}</ul>
    </div>

    <div class="resume-block">
        <h2>Education</h2>
        ${education}
    </div>

    <div class="resume-block">
        <h2>Experience</h2>
        ${experience}
    </div>

    <div class="resume-block">
        <h2>Projects</h2>
        ${projects}
    </div>
    `;
}

// Save Local Storage

function saveData(){

    localStorage.setItem("resumeData", document.querySelector(".form-section").innerHTML);

    alert("Data Saved Successfully");
}

// PDF Download

function downloadPDF(){

    const element = document.getElementById("resumePreview");

    html2pdf().from(element).save("Resume.pdf");
}

// Drag & Drop

new Sortable(document.getElementById("educationSection"), {
    animation:150
});

new Sortable(document.getElementById("experienceSection"), {
    animation:150
});

new Sortable(document.getElementById("projectSection"), {
    animation:150
});