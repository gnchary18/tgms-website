/*
  EDIT EMPLOYEE INFORMATION HERE.

  Add each employee inside the correct array.
  photo: use a relative image path, for example "images/employee-01.jpg".
  Put your photo files inside an "images" folder next to these HTML files.
  If photo is left empty, a neat initials placeholder is shown.
*/
const employeeData = {
  regular: [
    { id: "9000434", name: "Ananthula Srilatha", designation: "Principal (FAC)", photo: "../asset/images/staff/ANANTHULA_SRILATHA.jpg", initials: "S" },
    { id: "9002734", name: "Donthula Pradeep Kumar", designation: "PGT in Physics", photo: "../asset/images/staff/DONTHULA_PRADEEP_KUMAR.jpg", initials: "P" },
    { id: "9000443", name: "Sabbani Sumalatha", designation: "PGT in Chemistry ", photo: "../asset/images/staff/SABBANI_SUMALATHA.jpg", initials: "S" },
    { id: "9002671", name: "Babu John.MD", designation: "PGT in Zoology", photo: "../asset/images/staff/BABU_JOHN_MD.jpg", initials: "B" },
    { id: "9000432", name: "Vadluri Srinivas", designation: "PGT in Civics ", photo: "../asset/images/staff/VADLURI_SRINIVAS.jpg", initials: "S" },
    
    { id: "9001069", name: "Alnaz Anjum", designation: "PGT in Botony ", photo: "../asset/images/staff/ABDUL_RAVOOF_MOHAMMED.jpg", initials: "A" },
    { id: "9002179", name: "Peddi Chandra Shekhar", designation: "TGT in Telugu ", photo: "../asset/images/staff/PEDDI_CHANDRASHEKAR.jpg", initials: "C" },
    { id: "9002975", name: "Ancha Renuka", designation: "TGT in Mathematics ", photo: "../asset/images/staff/ANCHA_RENUKA.jpg", initials: "R" },
    { id: "9000251", name: "Abdul Ravoof Mohammad", designation: "TGT in Hindi", photo: "../asset/images/staff/ABDUL_RAVOOF_MOHAMMED.jpg", initials: "R" },
    { id: "9000873", name: "Battu Suhasini", designation: "TGT in Science ", photo: "../asset/images/staff/BATTU_SUHASINI.jpg", initials: "S" },
     ,
    
  ],
  outsourcing: [
    { id: "OUT001", name: "Mrs.Sarika", designation: "Computer Operator", photo: "images/sarika.jpg", initials: "E1" },
    { id: "OUT002", name: "Mr.Srinivas", designation: "Lab Assistant", photo: "images/srinivas.jpg", initials: "E2" }
  ],
  hourly: [
    { id: "21907", name: "Middela Laxmi", designation: "PGT in Telugu", photo: "../asset/images/staff/MIDDELA_LAXMI.jpg", initials: "E1" },
    { id: "22074", name: "Athmakuri Praveena", designation: "PGT in Economics", photo: "../asset/images/staff/ATHMAKURI PAVEENA.jpg", initials: "E1" },
    { id: "22314", name: "Baddipadaga Santhosha", designation: "PGT in Mathematics", photo: "../asset/images/staff/BBADDIPADAGA_SATHOSHA.jpg", initials: "E1" },
    { id: "22755", name: "Rangu Ravinder", designation: "PGT in Commerce", photo: "../asset/images/staff/RANGU_RAVINDER.jpg", initials: "E1" },
    { id: "22754", name: "Gotte Sravanthi", designation: "PGT in English", photo: "../asset/images/staff/GOTTE_SRAVANTHI.jpg", initials: "E1" },
    { id: "21904", name: "Parsa Rajitha", designation: "PGT in English", photo: "../asset/images/staff/PARSA_RAJUTHA.jpg", initials: "E1" },
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
