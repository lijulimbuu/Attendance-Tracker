const studentData = [];

function displayStudentList() {
    const tbody = document.querySelector("#student-list tbody");
    tbody.innerHTML = "";

    studentData.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td contenteditable="true" class="editable-id">${student.id}</td>
            <td contenteditable="true" class="editable-name">${student.name}</td>
            <td>${student.course}</td>
            <td>${student.semester}</td>
            <td>
                <input type="radio" class="attendance-radio" name="attendance-${index}" data-index="${index}" data-status="P" ${student.attendance === 'P' ? 'checked' : ''}>
                <label class="present-label">Present</label>
                <input type="radio" class="attendance-radio" name="attendance-${index}" data-index="${index}" data-status="A" ${student.attendance === 'A' ? 'checked' : ''}>
                <label class="absent-label">Absent</label>
            </td>
            <td>
                 <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </td>
        `;

        const editBtn = row.querySelector(".edit-btn");
        const deleteBtn = row.querySelector(".delete-btn");

        editBtn.addEventListener("click", () => editStudent(index));
        deleteBtn.addEventListener("click", () => deleteStudent(index));

        const radioButtons = row.querySelectorAll(".attendance-radio");
        radioButtons.forEach((radio) => {
            radio.addEventListener("change", () => updateAttendance(index, radio));
        });

        tbody.appendChild(row);
    });
}

function addStudent(id, name, course, semester) {
    // Check if the ID already exists
    const existingStudent = studentData.find((student) => student.id === id);
    if (existingStudent) {
        alert("ID number already exists. Please choose a different ID.");
        return;
    }

    studentData.push({ id, name, course, semester, attendance: '' });
    displayStudentList();
}

function editStudent(index) {
    const student = studentData[index];
    const newName = document.querySelector(`.editable-name[data-index="${index}"]`);
    const newId = document.querySelector(`.editable-id[data-index="${index}"]`);

    newName.contentEditable= "true";
    newId.contentEditable= "true";

    newName.focus(); // Focus on the editable field for a better editing experience

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.addEventListener("click", () => saveEditedStudent(index, newName, newId));

    const editBtn = document.querySelector(`.edit-btn[data-index="${index}"]`);
    const deleteBtn = document.querySelector(`.delete-btn[data-index="${index}"]`);

    // Replace "Edit" and "Delete" buttons with "Save" button
    editBtn.replaceWith(saveBtn);
    deleteBtn.disabled = true; // Disable the "Delete" button while editing
}
function editStudent(index) {
    const student = studentData[index];
    const newName = document.querySelector(`.editable-name[data-index="${index}"]`);
    const newId = document.querySelector(`.editable-id[data-index="${index}"]`);

    // Enable editing for name and ID fields
    newName.contentEditable = "true";
    newId.contentEditable = "true";

    newName.focus(); // Focus on the editable field for a better editing experience

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.addEventListener("click", () => saveEditedStudent(index, newName, newId));

    const editBtn = document.querySelector(`.edit-btn[data-index="${index}"]`);
    const deleteBtn = document.querySelector(`.delete-btn[data-index="${index}"]`);

    // Replace "Edit" and "Delete" buttons with "Save" button
    editBtn.replaceWith(saveBtn);
    deleteBtn.disabled = true; // Disable the "Delete" button while editing

    // Clear the old ID and name values
    newName.textContent = "";
    newId.textContent = "";
}


function enableDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((deleteBtn) => {
        deleteBtn.disabled = false;
    });
}

function deleteStudent(index) {
    studentData.splice(index, 1);
    displayStudentList();
}

function updateAttendance(index, radio) {
    const student = studentData[index];
    student.attendance = radio.dataset.status;
}

const presentStudentList = document.querySelector("#present-student-list");
const absentStudentList = document.querySelector("#absent-student-list");
const presentStudentsDiv = document.querySelector("#present-students");
const absentStudentsDiv = document.querySelector("#absent-students");

// Function to display Present and Absent students
function displayPresentAndAbsentStudents() {
    presentStudentList.innerHTML = "";
    absentStudentList.innerHTML = "";

    studentData.forEach((student) => {
        if (student.attendance === 'P') {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
            `;
            presentStudentList.appendChild(row);
        } else if (student.attendance === 'A') {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
            `;
            absentStudentList.appendChild(row);
        }
    });

    presentStudentsDiv.style.display = "block";
    absentStudentsDiv.style.display = "block";
}
function addStudent(id, name, course, semester) {
    // Check if the ID is a valid integer
    if (!isValidInteger(id)) {
        alert("Please enter a valid student ID (numbers only).");
        return;
    }

    // Check if the ID already exists
    const existingStudent = studentData.find((student) => student.id === id);
    if (existingStudent) {
        alert("ID number already exists. Please choose a different ID.");
        return;
    }

    studentData.push({ id, name, course, semester, attendance: '' });
    displayStudentList();
}
// Function to check if a string is a valid integer
function isValidInteger(str) {
    return /^\d+$/.test(str);
}


const saveBtn = document.querySelector("#save-btn");
saveBtn.addEventListener("click", () => {
    // Check if any attendance data is saved
    const savedAttendanceData = studentData.some((student) => student.attendance === 'P' || student.attendance === 'A');
    if (savedAttendanceData) {
        alert("Data saved.");
        displayPresentAndAbsentStudents();
    } else {
        alert("No attendance data to save.");
    }
});

const addStudentBtn = document.querySelector("#student-form");
addStudentBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const studentId = document.querySelector("#student-id").value.trim();
    const studentName = document.querySelector("#student-name").value.trim();
    const studentCourse = document.querySelector("#student-course").value.trim();
    const studentSemester = document.querySelector("#student-semester").value.trim();

    if (studentId === "" || studentName === "" || studentCourse === "" || studentSemester === "") {
        alert("Please fill in all fields.");
        return;
    }

    addStudent(studentId, studentName, studentCourse, studentSemester);

    // Clear the input fields after adding a student
    document.querySelector("#student-id").value = "";
    document.querySelector("#student-name").value = "";
    document.querySelector("#student-course").value = "";
    document.querySelector("#student-semester").value = "";
});

displayStudentList();
