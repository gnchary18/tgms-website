
const staff = [
    {
        name: "Dr. N. Mallareddy",
        designation: "Assistant Professor",
        department: "Computer Science",
        qualification: "M.Sc., Ph.D.",
        experience: "15 Years",
        image: "images/staff1.jpg"
    },
    {
        name: "Mr. B. Suresh",
        designation: "Assistant Professor",
        department: "Computer Science",
        qualification: "M.Sc., M.Phil.",
        experience: "10 Years",
        image: "images/staff2.jpg"
    }
];

const container = document.getElementById("staff-list");

container.innerHTML = staff.map(member => `
    <div class="profile-container">

        <div class="profile-image">
            <img src="${member.image}" alt="${member.name}">
        </div>

        <div class="profile-details">
            <h2>${member.name}</h2>
            <p><strong>Designation:</strong> ${member.designation}</p>
            <p><strong>Department:</strong> ${member.department}</p>
            <p><strong>Qualification:</strong> ${member.qualification}</p>
            <p><strong>Experience:</strong> ${member.experience}</p>
        </div>

    </div>
`).join("");
