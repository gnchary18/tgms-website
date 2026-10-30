/* TGMS Dammannapet – shared behaviour (header/footer, notices, gallery, forms) */
(function () {
  "use strict";
  var S = window.SITE;
  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Header ---------- */
  function buildHeader() {
    var host = document.getElementById("site-header");
    if (!host) return;
    var links = S.nav.map(function (n) {
      var on = page === n[0] || (page === "" && n[0] === "index.html");
      return '<a href="' + n[0] + '"' + (on ? ' class="active" aria-current="page"' : "") + ">" + esc(n[1]) + "</a>";
    }).join("");
    host.innerHTML =
      '<div class="topbar"><div class="container">' +
       "<span>📞 " + esc(S.phone) + " &nbsp;|&nbsp; ✉️ " + esc(S.email) + "</span>" +
      "<span>🕘 " + esc(S.officeHours) + "</span></div></div>" +
      '<header class="site-header"><div class="container">' +
      '<a class="brand" href="index.html" aria-label="' + esc(S.name) + ' home">' +
      '<img src="asset/images/logo.svg" alt="" width="52" height="52">' +
      "<span><strong>" + esc(S.name) + "</strong><small>" + esc(S.tagline) + "</small></span></a>" +
      '<button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav">☰</button>' +
      '<nav class="nav" id="nav" aria-label="Main">' + links + "</nav></div></header>";

    var btn = host.querySelector(".nav-toggle");
    var nav = host.querySelector(".nav");
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
  }

  /* ---------- Footer ---------- */
  function buildFooter() {
    var host = document.getElementById("site-footer");
    if (!host) return;
    var links = S.nav.map(function (n) {
      return '<li><a href="' + n[0] + '">' + esc(n[1]) + "</a></li>";
    }).join("");
    host.innerHTML =
      '<footer class="site-footer"><div class="container">' +
      "<div><h4>" + esc(S.name) + "</h4><p>" + esc(S.motto) + ".</p><p>" + esc(S.address) + "</p></div>" +
      "<div><h4>Quick links</h4><ul>" + links + "</ul></div>" +
      "<div><h4>Contact</h4><ul>" +
      "<li>📞 " + esc(S.phone) + "</li><li>✉️ " + esc(S.email) + "</li><li>🕘 " + esc(S.officeHours) + "</li></ul></div>" +
      '</div><div class="copy">© <span id="yr"></span> ' + esc(S.name) + ". All rights reserved.</div></footer>" +
      '<button class="to-top" aria-label="Back to top">↑</button>';
    document.getElementById("yr").textContent = new Date().getFullYear();

    var top = host.querySelector(".to-top");
    top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    window.addEventListener("scroll", function () {
      top.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });
  }

  /* ---------- Notices ---------- */
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function noticeHTML(n) {
    var d = new Date(n.date + "T00:00:00");
    return '<li class="notice" data-type="' + esc(n.type) + '">' +
      '<div class="date-chip"><b>' + d.getDate() + "</b><span>" + MONTHS[d.getMonth()] + " " + d.getFullYear() + "</span></div>" +
      "<div>" + esc(n.title) +
      (n.important ? ' <span class="tag imp">Important</span>' : ' <span class="tag">' + esc(n.type) + "</span>") +
      "</div></li>";
  }

  function buildNotices() {
    var latest = document.getElementById("latest-notices");
    if (latest) {
      latest.innerHTML = S.notices.slice(0, 4).map(noticeHTML).join("");
    }
    var ticker = document.getElementById("ticker-text");
    if (ticker) {
      ticker.textContent = S.notices.slice(0, 3).map(function (n) { return n.title; }).join("   •   ");
    }
    var all = document.getElementById("all-notices");
    if (all) {
      var render = function (type) {
        var items = S.notices.filter(function (n) { return type === "all" || n.type === type; });
        all.innerHTML = items.length ? items.map(noticeHTML).join("") : "<li class='notice'>No notices in this category.</li>";
      };
      render("all");
      document.querySelectorAll(".filter-bar .chip").forEach(function (c) {
        c.addEventListener("click", function () {
          document.querySelectorAll(".filter-bar .chip").forEach(function (x) { x.classList.remove("on"); });
          c.classList.add("on");
          render(c.dataset.filter);
        });
      });
    }
  }

  /* ---------- Gallery + lightbox ---------- */
  var COLORS = ["#cfe3f8", "#ffe6b0", "#d6efd8", "#f6d4e0"];
  function buildGallery() {
    var host = document.getElementById("gallery");
    if (!host) return;
    host.innerHTML = S.gallery.map(function (g, i) {
      return '<figure data-i="' + i + '" style="background:' + COLORS[i % COLORS.length] + '">' +
        '<img src="' + esc(g.src) + '" alt="' + esc(g.caption) + '" loading="lazy">' +
        "<figcaption>" + esc(g.caption) + "</figcaption></figure>";
    }).join("");

    // Hide broken images so the coloured placeholder tile shows instead.
    host.querySelectorAll("img").forEach(function (img) {
      img.addEventListener("error", function () { img.style.display = "none"; });
    });

    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = '<button aria-label="Close">×</button><img alt="">';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector("img");
    host.addEventListener("click", function (e) {
      var fig = e.target.closest("figure");
      if (!fig) return;
      var img = fig.querySelector("img");
      if (img.style.display === "none") return; // no real photo yet
      lbImg.src = img.src; lbImg.alt = img.alt;
      lb.classList.add("open");
    });
    lb.addEventListener("click", function () { lb.classList.remove("open"); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") lb.classList.remove("open"); });
  }

  /* ---------- Forms (no backend: opens the visitor's email app) ---------- */
  function wireForms() {
    document.querySelectorAll("form[data-mailto]").forEach(function (f) {
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        var d = new FormData(f);
        var body = [];
        d.forEach(function (v, k) { if (k !== "subject") body.push(k + ": " + v); });
        var subject = d.get("subject") || "Enquiry from website";
        location.href = "mailto:" + S.email +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(body.join("\n"));
      });
    });
  }

  /* ---------- Contact map ---------- */
  function wireMap() {
    var m = document.getElementById("map");
    if (m) m.src = "https://www.google.com/maps?q=" + encodeURIComponent(S.mapQuery) + "&output=embed";
  }

  /* ---------- Scroll reveal ---------- */
  function reveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Fill [data-site="key"] placeholders ---------- */
  function fillText() {
    document.querySelectorAll("[data-site]").forEach(function (el) {
      var v = S[el.dataset.site];
      if (v) el.textContent = v;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildHeader(); buildFooter(); buildNotices(); buildGallery();
    wireForms(); wireMap(); fillText(); reveal();
  });
})();