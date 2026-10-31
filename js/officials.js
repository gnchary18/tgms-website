
const staff = [

    {
        name: "Sri A.Revanth Reddy",
        designation: "Hon'ble Chief Minister of Telangana",
        image: "asset/images/cm.jpg"
    },

    {
        name: "Mrs Yogitha Rana",
        designation: "",
        image: "images/staff2.jpg"
    },

    {
        name: "",
        designation: "",
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

            
        </div>

    </div>

`).join("");
