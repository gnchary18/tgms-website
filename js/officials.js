
const staff = [

    {
        name: "Sri A.Revanth Reddy",
        designation: "Chief Minister of Telangana",
        department: "",
        qualification: "",
        experience: "",
        email: "",
        image: "images/staff1.jpg"
    },

    {
        name: "Mrs Yogitha Rana",
        designation: "",
        department: "",
        qualification: "",
        experience: "",
        email: "",
        image: "images/staff2.jpg"
    },

    {
        name: "",
        designation: "",
        department: "",
        qualification: "",
        experience: "",
        email: "",
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
