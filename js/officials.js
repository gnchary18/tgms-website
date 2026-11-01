
const staff = [

    {
        name: "Sri A.Revanth Reddy",
        designation: "Hon'ble Chief Minister of Telangana",
        image: "asset/images/cm.jpg"
    },

    {
        name: "Dr Yogitha Rana IAS",
        designation: "Secretary to Government, Education Department",
        image: "asset/images/yogitarana.jpg"
    },

      {
        name: "Dr. E. Naveen Nicolas IAS",
        designation: "Director of School Education, Model Schools",
        image: "asset/images/naveennicolus.jpg"
    },
    {
        name: "S. Srinivasa Chary",
        designation: "Additional Director, TG Model Schools",
        image: "asset/images/srinivasachary.jpg"
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
