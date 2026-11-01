(function () {
  "use strict";

  /* ------------------------------------------------------------------
     DATA
     Replace `src` values with your own files (e.g. "photos/lake.jpg",
     "videos/trip.mp4") and edit titles/categories. Sample photos come
     from picsum.photos and sample videos from Google's public sample
     bucket, so they need an internet connection.
     ------------------------------------------------------------------ */
  var VIDEO_BASE = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/";

  // Mosaic pattern repeats every 6 photos: big, normal, normal, tall, normal, wide.
  var PATTERN = ["s-big", "", "", "s-tall", "", "s-wide"];
  var SIZES = {
    "s-big":  [1200, 1200],
    "s-tall": [700, 1100],
    "s-wide": [1100, 600],
    "":       [700, 700]
  };

  function photoUrl(seed, w, h) {
    return "https://picsum.photos/seed/" + seed + "/" + w + "/" + h;
  }

  var photoData = {
    Nature:       ["forest", "river", "peak", "lake", "moss", "canyon"],
    Architecture: ["tower", "arch", "facade", "atrium", "spire", "plaza"],
    Food:         ["bread", "citrus", "noodles", "spice", "berries", "cheese"],
    Travel:       ["station", "alley", "ferry", "temple", "village", "highway"],
    Animals:      ["heron", "fox", "gecko", "owl", "otter", "moth"]
  };

  var photoCategories = Object.keys(photoData).map(function (name) {
    return {
      name: name,
      items: photoData[name].map(function (seed, i) {
        var cls = PATTERN[i % PATTERN.length];
        var size = SIZES[cls];
        return {
          type: "image",
          src: photoUrl(seed, size[0], size[1]),
          title: name + " " + String(i + 1).padStart(2, "0"),
          cls: cls,
          w: size[0],
          h: size[1]
        };
      })
    };
  });

  var videoCategories = [
    {
      name: "Short Films",
      items: [
        { file: "BigBuckBunny.mp4",  title: "Big Buck Bunny" },
        { file: "ElephantsDream.mp4", title: "Elephants Dream" },
        { file: "Sintel.mp4",         title: "Sintel" },
        { file: "TearsOfSteel.mp4",   title: "Tears of Steel" }
      ]
    },
    {
      name: "Quick Clips",
      items: [
        { file: "ForBiggerBlazes.mp4",     title: "Clip 01" },
        { file: "ForBiggerEscapes.mp4",    title: "Clip 02" },
        { file: "ForBiggerFun.mp4",        title: "Clip 03" },
        { file: "ForBiggerJoyrides.mp4",   title: "Clip 04" },
        { file: "ForBiggerMeltdowns.mp4",  title: "Clip 05" }
      ]
    }
  ].map(function (cat) {
    return {
      name: cat.name,
      items: cat.items.map(function (v) {
        return {
          type: "video",
          src: VIDEO_BASE + v.file,
          title: v.title,
          category: cat.name
        };
      })
    };
  });

  /* ------------------------------------------------------------------
     HELPERS
     ------------------------------------------------------------------ */
  var $ = function (id) { return document.getElementById(id); };

  function placeholder(label, w, h) {
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + " " + h + '">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#2f6f5e"/><stop offset="1" stop-color="#16302a"/></linearGradient></defs>' +
      '<rect width="100%" height="100%" fill="url(#g)"/>' +
      '<text x="50%" y="50%" fill="#d8e6e0" font-family="sans-serif" font-size="' + Math.round(w / 18) +
      '" text-anchor="middle" dominant-baseline="middle">' + label + "</text></svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  function formatTime(sec) {
    if (!isFinite(sec)) return "";
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return m + ":" + String(s).padStart(2, "0");
  }

  /* ------------------------------------------------------------------
     TILE BUILDERS
     ------------------------------------------------------------------ */
  function makePhotoTile(item) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tile" + (item.cls ? " " + item.cls : "");
    btn.setAttribute("aria-label", "Open " + item.title);

    var img = document.createElement("img");
    img.src = item.src;
    img.alt = item.title;
    img.loading = "lazy";
    img.decoding = "async";
    img.width = item.w;
    img.height = item.h;
    img.addEventListener("error", function () {
      img.src = placeholder(item.title, item.w, item.h);
    }, { once: true });

    var cap = document.createElement("span");
    cap.className = "cap";
    cap.textContent = item.title;

    btn.appendChild(img);
    btn.appendChild(cap);
    return btn;
  }

  function makeVideoCard(item) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "vcard";
    btn.setAttribute("aria-label", "Play " + item.title);

    var thumb = document.createElement("span");
    thumb.className = "thumb";

    // The first frame of the video itself is used as the thumbnail.
    var vid = document.createElement("video");
    vid.muted = true;
    vid.loop = true;
    vid.playsInline = true;
    vid.preload = "metadata";
    vid.src = item.src + "#t=2";
    vid.setAttribute("aria-hidden", "true");

    var play = document.createElement("span");
    play.className = "play";
    var dur = document.createElement("span");
    dur.className = "dur";

    vid.addEventListener("loadedmetadata", function () {
      dur.textContent = formatTime(vid.duration);
    });

    thumb.appendChild(vid);
    thumb.appendChild(play);
    thumb.appendChild(dur);

    var meta = document.createElement("span");
    meta.className = "vmeta";
    var name = document.createElement("strong");
    name.textContent = item.title;
    var sub = document.createElement("small");
    sub.textContent = item.category;
    meta.appendChild(name);
    meta.appendChild(sub);

    btn.appendChild(thumb);
    btn.appendChild(meta);

    // Silent hover preview on devices that support hover.
    if (window.matchMedia && window.matchMedia("(hover: hover)").matches) {
      btn.addEventListener("mouseenter", function () {
        btn.classList.add("previewing");
        var p = vid.play();
        if (p && p.catch) p.catch(function () {});
      });
      btn.addEventListener("mouseleave", function () {
        btn.classList.remove("previewing");
        vid.pause();
        try { vid.currentTime = 2; } catch (e) {}
      });
    }
    return btn;
  }

  /* ------------------------------------------------------------------
     LIBRARY (chips + category sections), reused by both tabs
     ------------------------------------------------------------------ */
  function buildLibrary(cfg) {
    var active = "All";
    var secEls = {};
    var total = cfg.categories.reduce(function (n, c) { return n + c.items.length; }, 0);
    cfg.countEl.textContent = total;

    function visible() {
      var list = [];
      cfg.categories.forEach(function (cat) {
        if (active === "All" || active === cat.name) list = list.concat(cat.items);
      });
      return list;
    }

    cfg.categories.forEach(function (cat) {
      var section = document.createElement("section");
      section.className = "category";
      var headId = cfg.idPrefix + "-" + cat.name.replace(/\s+/g, "-");
      section.setAttribute("aria-labelledby", headId);

      var head = document.createElement("div");
      head.className = "category-head";
      var h2 = document.createElement("h2");
      h2.id = headId;
      h2.textContent = cat.name;
      var count = document.createElement("span");
      count.textContent = cat.items.length + " " + cfg.noun + (cat.items.length === 1 ? "" : "s");
      head.appendChild(h2);
      head.appendChild(count);

      var grid = document.createElement("div");
      grid.className = cfg.gridClass;
      cat.items.forEach(function (item) {
        var el = cfg.makeTile(item);
        el.addEventListener("click", function () {
          var list = visible();
          openLightbox(list, list.indexOf(item));
        });
        grid.appendChild(el);
      });

      section.appendChild(head);
      section.appendChild(grid);
      cfg.sectionsEl.appendChild(section);
      secEls[cat.name] = section;
    });

    var names = ["All"].concat(cfg.categories.map(function (c) { return c.name; }));

    function refresh() {
      cfg.categories.forEach(function (cat) {
        secEls[cat.name].hidden = !(active === "All" || active === cat.name);
      });
      Array.prototype.forEach.call(cfg.chipsEl.children, function (chip, i) {
        chip.setAttribute("aria-pressed", String(names[i] === active));
      });
    }

    names.forEach(function (name, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      var n = i === 0 ? total : cfg.categories[i - 1].items.length;
      b.appendChild(document.createTextNode(name));
      var small = document.createElement("small");
      small.textContent = n;
      b.appendChild(small);
      b.addEventListener("click", function () {
        active = name;
        refresh();
      });
      cfg.chipsEl.appendChild(b);
    });

    refresh();
  }

  buildLibrary({
    categories: photoCategories,
    chipsEl: $("chips-photos"),
    sectionsEl: $("sections-photos"),
    countEl: $("count-photos"),
    gridClass: "mosaic",
    idPrefix: "photos",
    noun: "photo",
    makeTile: makePhotoTile
  });

  buildLibrary({
    categories: videoCategories,
    chipsEl: $("chips-videos"),
    sectionsEl: $("sections-videos"),
    countEl: $("count-videos"),
    gridClass: "vgrid",
    idPrefix: "videos",
    noun: "video",
    makeTile: makeVideoCard
  });

  /* ------------------------------------------------------------------
     TABS (#photos / #videos in the URL)
     ------------------------------------------------------------------ */
  var tabNames = ["photos", "videos"];
  var tabs = [$("tab-photos"), $("tab-videos")];
  var panels = [$("panel-photos"), $("panel-videos")];

  function pauseAllPreviews() {
    Array.prototype.forEach.call(document.querySelectorAll(".thumb video"), function (v) {
      v.pause();
    });
  }

  function showTab(index, updateHash) {
    tabs.forEach(function (t, i) {
      var on = i === index;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      panels[i].hidden = !on;
    });
    pauseAllPreviews();
    if (updateHash) history.replaceState(null, "", "#" + tabNames[index]);
    try { localStorage.setItem("gallery-tab", tabNames[index]); } catch (e) {}
  }

  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { showTab(i, true); });
    t.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        var next = (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
        tabs[next].focus();
        showTab(next, true);
      }
    });
  });

  function tabFromHash() {
    var h = location.hash.replace("#", "");
    if (tabNames.indexOf(h) !== -1) return tabNames.indexOf(h);
    try {
      var saved = localStorage.getItem("gallery-tab");
      if (tabNames.indexOf(saved) !== -1) return tabNames.indexOf(saved);
    } catch (e) {}
    return 0;
  }

  window.addEventListener("hashchange", function () { showTab(tabFromHash(), false); });
  showTab(tabFromHash(), false);

  /* ------------------------------------------------------------------
     LIGHTBOX / VIDEO PLAYER
     ------------------------------------------------------------------ */
  var lb = $("lightbox");
  var lbMedia = $("lb-media");
  var lbCaption = $("lb-caption");
  var current = [];
  var index = 0;

  function stopMedia() {
    var v = lbMedia.querySelector("video");
    if (v) {
      v.pause();
      v.removeAttribute("src");
      v.load();
    }
    lbMedia.innerHTML = "";
  }

  function show() {
    stopMedia();
    var item = current[index];
    var el;

    if (item.type === "video") {
      el = document.createElement("video");
      el.controls = true;
      el.autoplay = true;
      el.playsInline = true;
      el.src = item.src;
      el.addEventListener("error", function () {
        stopMedia();
        var note = document.createElement("p");
        note.className = "lb-note";
        note.textContent = "This video could not be loaded. Check the file path or your connection.";
        lbMedia.appendChild(note);
      }, { once: true });
    } else {
      el = document.createElement("img");
      el.alt = item.title;
      el.src = item.src;
      el.addEventListener("error", function () {
        el.src = placeholder(item.title, 800, 600);
      }, { once: true });
    }

    lbMedia.appendChild(el);
    lbCaption.textContent = item.title + "  (" + (index + 1) + " / " + current.length + ")";
  }

  function openLightbox(list, i) {
    current = list;
    index = Math.max(0, i);
    show();
    if (typeof lb.showModal === "function") lb.showModal();
  }

  function step(d) {
    index = (index + d + current.length) % current.length;
    show();
  }

  $("lb-prev").addEventListener("click", function () { step(-1); });
  $("lb-next").addEventListener("click", function () { step(1); });
  $("lb-close").addEventListener("click", function () { lb.close(); });

  lb.addEventListener("click", function (e) {
    if (e.target === lb) lb.close();
  });

  lb.addEventListener("keydown", function (e) {
    if (e.target && e.target.tagName === "VIDEO") return; // arrows seek inside the player
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  lb.addEventListener("close", stopMedia);
})();
