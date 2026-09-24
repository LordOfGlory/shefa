(function () {
  var root = document.querySelector("[data-record]");
  if (!root) return;
  var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
  var shots = Array.prototype.slice.call(root.querySelectorAll("[data-group]"));
  var chapters = Array.prototype.slice.call(root.querySelectorAll("[data-chapter]"));

  function apply(filter) {
    buttons.forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-filter") === filter); });
    shots.forEach(function (el) {
      el.hidden = filter !== "all" && el.getAttribute("data-group") !== filter;
    });
    chapters.forEach(function (ch) {
      var visible = Array.prototype.some.call(ch.querySelectorAll("[data-group]"), function (el) { return !el.hidden; });
      ch.hidden = !visible;
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { apply(b.getAttribute("data-filter")); });
  });

  var hashMap = { practice: "practice", lab: "lab", campuses: "campus", gatherings: "gathering", convocation: "convocation" };
  var hash = (location.hash || "").replace("#", "");
  if (hashMap[hash]) apply(hashMap[hash]);

  var box = document.querySelector(".lightbox");
  var pic = box.querySelector("img");
  var cap = box.querySelector("figcaption");
  var order = shots.filter(function (el) { return el.querySelector("a.frame"); });
  var index = 0;

  function openAt(i) {
    var visible = order.filter(function (el) { return !el.hidden; });
    if (!visible.length) return;
    index = (i + visible.length) % visible.length;
    var el = visible[index];
    var img = el.querySelector("img");
    pic.src = img.currentSrc || img.src;
    pic.alt = img.alt;
    cap.textContent = el.querySelector("h3").textContent;
    box.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function close() {
    box.classList.remove("open");
    pic.src = "";
    document.body.style.overflow = "";
  }
  order.forEach(function (el) {
    el.querySelector("a.frame").addEventListener("click", function (e) {
      e.preventDefault();
      var visible = order.filter(function (item) { return !item.hidden; });
      openAt(visible.indexOf(el));
    });
  });
  box.querySelector(".lb-x").addEventListener("click", close);
  box.addEventListener("click", function (e) { if (e.target === box) close(); });
  box.querySelector(".prev").addEventListener("click", function () { openAt(index - 1); });
  box.querySelector(".next").addEventListener("click", function () { openAt(index + 1); });
  document.addEventListener("keydown", function (e) {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") openAt(index + 1);
    if (e.key === "ArrowLeft") openAt(index - 1);
  });
})();
