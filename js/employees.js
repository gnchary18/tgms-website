/*
  EDIT EMPLOYEE INFORMATION HERE.

  Add each employee inside the correct array.
  photo: use a relative image path, for example "images/employee-01.jpg".
  Put your photo files inside an "images" folder next to these HTML files.
  If photo is left empty, a neat initials placeholder is shown.
*/
const employeeData = {
  regular: [
    { id: "REG001", name: "A.Srilatha", designation: "Principal", photo: "images/alana.jpg", initials: "S" },
    { id: "REG002", name: "S.Sumalatha", designation: "PGT in Chemistry ", photo: "images/aditi.jpg", initials: "S" },
    { id: "REG003", name: "Babu John", designation: "PGT in Zoology", photo: "images/alana.jpg", initials: "B" },
    { id: "REG004", name: "Srinivas", designation: "PGT in Civics ", photo: "images/aditi.jpg", initials: "S" },
    { id: "REG005", name: "Pradeep", designation: "PGT in Physics", photo: "images/alana.jpg", initials: "P" },
    { id: "REG006", name: "Alnaz Anjum", designation: "PGT in Botony ", photo: "images/aditi.jpg", initials: "A" },
    { id: "REG007", name: "Md.Abdul Ravoof", designation: "TGT in Hindi", photo: "images/alana.jpg", initials: "R" },
    { id: "REG008", name: "Suhasini", designation: "TGT in Science ", photo: "images/aditi.jpg", initials: "S" },
     { id: "REG009", name: "A.Renuka", designation: "TGT in Mathematics ", photo: "images/aditi.jpg", initials: "R" },
    { id: "REG010", name: "Chandra Shekhar", designation: "TGT in Telugu ", photo: "images/aditi.jpg", initials: "C" }
  ],
  outsourcing: [
    { id: "OUT001", name: "Mrs.Sarika", designation: "Computer Operator", photo: "images/sarika.jpg", initials: "E1" },
    { id: "OUT002", name: "Mr.Srinivas", designation: "Lab Assistant", photo: "images/srinivas.jpg", initials: "E2" }
  ],
  hourly: [
    { id: "HOUR001", name: "Mr.Narsimha Chary", designation: "Associate Professor", photo: "images/charysir.jpg", initials: "E1" },
    { id: "HOUR002", name: "Mrs. Jayanthi Madam", designation: "Associate Professor", photo: "images/jayanthi.jpg", initials: "E2" }
  ]
};

function createEmployeeCard(employee) {
  const card = document.createElement("article");
  card.className = "employee-card";

  let photoElement;
  if (employee.photo && employee.photo.trim()) {
    photoElement = document.createElement("img");
    photoElement.className = "employee-photo";
    photoElement.src = employee.photo;
    photoElement.alt = `Photo of ${employee.name}`;
    photoElement.loading = "lazy";
    photoElement.onerror = () => {
      const placeholder = document.createElement("div");
      placeholder.className = "employee-photo photo-placeholder";
      placeholder.textContent = employee.initials || "EMP";
      placeholder.setAttribute("aria-label", `Photo placeholder for ${employee.name}`);
      photoElement.replaceWith(placeholder);
    };
  } else {
    photoElement = document.createElement("div");
    photoElement.className = "employee-photo photo-placeholder";
    photoElement.textContent = employee.initials || "EMP";
    photoElement.setAttribute("aria-label", `Photo placeholder for ${employee.name}`);
  }

  const info = document.createElement("div");
  info.className = "employee-info";

  const name = document.createElement("h2");
  name.className = "employee-name";
  name.textContent = employee.name;

  const details = document.createElement("dl");
  details.className = "employee-meta";

  const idRow = document.createElement("div");
  const idLabel = document.createElement("dt");
  idLabel.textContent = "Employee ID:";
  const idValue = document.createElement("dd");
  idValue.className = "employee-id";
  idValue.textContent = employee.id;
  idRow.append(idLabel, idValue);

  const designationRow = document.createElement("div");
  const designationLabel = document.createElement("dt");
  designationLabel.textContent = "Designation:";
  const designationValue = document.createElement("dd");
  designationValue.textContent = employee.designation;
  designationRow.append(designationLabel, designationValue);

  details.append(idRow, designationRow);
  info.append(name, details);
  card.append(photoElement, info);
  return card;
}

function renderEmployees() {
  const list = document.getElementById("employee-list");
  if (!list) return;

  const fileName = window.location.pathname.split("/").pop().toLowerCase();
  const categoryByPage = {
    "regular.html": "regular",
    "outsourcing.html": "outsourcing",
    "hourly.html": "hourly"
  };
  const category = categoryByPage[fileName];
  const employees = category ? employeeData[category] : [];

  if (!employees || employees.length === 0) {
    const note = document.createElement("p");
    note.className = "empty-note";
    note.textContent = "Employee details will appear here once they are added.";
    list.appendChild(note);
    return;
  }

  employees.forEach(employee => list.appendChild(createEmployeeCard(employee)));
}

function setupDropdown() {
  document.querySelectorAll(".dropdown").forEach(dropdown => {
    const button = dropdown.querySelector(".dropdown-toggle");
    button.addEventListener("click", () => {
      const isOpen = dropdown.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", event => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        dropdown.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        button.focus();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupDropdown();
  renderEmployees();
});
