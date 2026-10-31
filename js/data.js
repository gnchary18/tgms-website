/* ==========================================================
   TGMS Dammannapet – site content you are most likely to edit.
   Change the values below; every page picks them up automatically.
   ========================================================== */
window.SITE = {
  name: "TGMS Dammannapet",
  tagline: "Telangana Model School & Junior College",
  motto: "Learning with discipline, curiosity and care",

  // ---- Contact details (REPLACE with the real ones) ----
  address: "PMSHRI TELANGANA MODEL SCHOOL & JUNIOR COLLEGE , Dammannapet, GambhiraoPet, Rajanna Siricilla District, Telangana ",
  phone: "+91 9885130905",
  email: "tgms.dammannapet.knr@gmail.com",
  officeHours: "Mon – Sat, 9:00 AM – 4:15 PM",
  mapQuery: "Dammannapet, Telangana",

  // ---- Navigation (file name, label) ----
  nav: [
    ["index.html", "Home"],
    ["about.html", "About Us"],
    ["academics.html", "Academics"],
    ["admissions.html", "Admissions"],
    ["facilities.html", "Facilities"],
   ["Staff.html", "Staff"],
    ["gallery.html", "Gallery"],
    ["notices.html", "Notices"],
    ["contact.html", "Contact"]
  ],

  // ---- Notices: newest first. type: "general" | "admission" | "exam" | "event" ----
  // date format: YYYY-MM-DD.  Set important:true to highlight a notice.
  notices: [
    { date: "2026-10-20", title: "Admission information for the next academic year will be announced here.", type: "admission", important: true },
    { date: "2026-10-12", title: "Term examination timetable will be displayed on the notice board and this page.", type: "exam" },
    { date: "2026-10-05", title: "Parent–teacher meeting schedule to be announced.", type: "event" },
    { date: "2026-09-28", title: "Students are reminded to wear the prescribed uniform every day.", type: "general" },
    { date: "2026-10-31", title: "Study Hours for SSC and Intermediate students commences from 02-11-2026", type: "studyhour" }
  ],

  // ---- Gallery: put photos in assets/images/ and list them here ----
  // If a file is missing the tile shows a coloured placeholder instead.
  gallery: [
    { src: "asset/images/Groupphoto.jpeg", caption: "School campus" },
    { src: "asset/images/ptm1.jpeg", caption: "Classroom learning" },
    { src: "asset/images/ptm2.jpeg", caption: "Science laboratory" },
    { src: "asset/images/pmshrilogo.jpeg", caption: "Sports day" },
    { src: "asset/images/assembly-1.jpeg", caption: "Morning assembly" },
    { src: "asset/images/library-1.jpeg", caption: "Library" },
    { src: "asset/images/cultural-1.jpeg", caption: "Cultural programme" },
    { src: "asset/images/computer-1.jpeg", caption: "Computer lab" }
  ]
};
