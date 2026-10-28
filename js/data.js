/* ==========================================================
   TGMS Dammannapet – site content you are most likely to edit.
   Change the values below; every page picks them up automatically.
   ========================================================== */
window.SITE = {
  name: "TGMS Dammannapet",
  tagline: "Telangana Model School",
  motto: "Learning with discipline, curiosity and care",

  // ---- Contact details (REPLACE with the real ones) ----
  address: "TGMS, Dammannapet, Telangana – add full address and PIN code",
  phone: "+91 9885130905",
  email: "your-school-email@example.com",
  officeHours: "Mon – Sat, 9:30 AM – 4:30 PM",
  mapQuery: "Dammannapet, Telangana",

  // ---- Navigation (file name, label) ----
  nav: [
    ["index.html", "Home"],
    ["about.html", "About Us"],
    ["academics.html", "Academics"],
    ["admissions.html", "Admissions"],
    ["facilities.html", "Facilities"],
    ["gallery.html", "Gallery"],
    ["notices.html", "Notices"],
    ["contact.html", "Contact"]
  ],

  // ---- Notices: newest first. type: "general" | "admission" | "exam" | "event" ----
  // date format: YYYY-MM-DD.  Set important:true to highlight a notice.
  notices: [
    { date: "2026-10-20", title: "Sample notice: Admission information for the next academic year will be announced here.", type: "admission", important: true },
    { date: "2026-10-12", title: "Sample notice: Term examination timetable will be displayed on the notice board and this page.", type: "exam" },
    { date: "2026-10-05", title: "Sample notice: Parent–teacher meeting schedule to be announced.", type: "event" },
    { date: "2026-09-28", title: "Sample notice: Students are reminded to wear the prescribed uniform every day.", type: "general" },
    { date: "2026-09-15", title: "Sample notice: Science exhibition and cultural day preparations begin.", type: "event" }
  ],

  // ---- Gallery: put photos in assets/images/ and list them here ----
  // If a file is missing the tile shows a coloured placeholder instead.
  gallery: [
    { src: "assets/images/campus-1.jpg", caption: "School campus" },
    { src: "assets/images/classroom-1.jpg", caption: "Classroom learning" },
    { src: "assets/images/lab-1.jpg", caption: "Science laboratory" },
    { src: "assets/images/sports-1.jpg", caption: "Sports day" },
    { src: "assets/images/assembly-1.jpg", caption: "Morning assembly" },
    { src: "assets/images/library-1.jpg", caption: "Library" },
    { src: "assets/images/cultural-1.jpg", caption: "Cultural programme" },
    { src: "assets/images/computer-1.jpg", caption: "Computer lab" }
  ]
};
