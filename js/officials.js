
const staff = [

    {
        name: "Dr. N. Mallareddy",
        designation: "Assistant Professor",
        department: "Computer Science",
        qualification: "M.Sc., Ph.D.",
        experience: "15 Years",
        email: "mallareddy@example.com",
        image: "images/staff1.jpg"
    },

    {
        name: "Mr. B. Suresh",
        designation: "Assistant Professor",
        department: "Computer Science",
        qualification: "M.Sc., M.Phil.",
        experience: "10 Years",
        email: "suresh@example.com",
        image: "images/staff2.jpg"
    },

    {
        name: "Mr. G. Narsimhachary",
        designation: "Assistant Professor",
        department: "Computer Science",
        qualification: "M.Sc., M.Phil.",
        experience: "12 Years",
        email: "narsimhachary@example.com",
        image: "images/staff3.jpg"
    }

];

const container = document.getElementById("staffContainer");

container.innerHTML = staff.map(person => `

    <div class="profile-card">

        <div class="circle">

            <img src="${person.image}"
                 alt="${person.name}"
                 onerror="this.style.display='none'">

        </div>

        <div class="details">

            <h3>${person.name}</h3>

            <p class="designation">
                ${person.designation}
            </p>

            <p>
                <b>Department:</b> ${person.department}
            </p>

            <p>
                <b>Qualification:</b> ${person.qualification}
            </p>

            <p>
                <b>Experience:</b> ${person.experience}
            </p>

            <p>
                <b>Email:</b> ${person.email}
            </p>

        </div>

    </div>

`).join("");
