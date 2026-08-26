(function () {
  const tabs = Array.from(document.querySelectorAll("[data-lesson-tab]"));
  const units = Array.from(document.querySelectorAll(".lesson-unit"));
  const status = document.querySelector("[data-lesson-status]");
  const finish = document.querySelector("[data-lesson-finish]");
  const prev = document.querySelector("[data-lesson-prev]");
  const next = document.querySelector("[data-lesson-next]");
  if (!tabs.length || !units.length) return;

  let i = 0;
  const fromHash = () => {
    const m = (location.hash || "").match(/lesson-(\d)/);
    if (m) i = Math.min(units.length - 1, Math.max(0, Number(m[1]) - 1));
  };
  fromHash();

  function show(n) {
    i = Math.max(0, Math.min(units.length - 1, n));
    units.forEach((el, idx) => {
      el.hidden = idx !== i;
    });
    tabs.forEach((t, idx) => t.classList.toggle("on", idx === i));
    if (status) status.textContent = "Lesson " + (i + 1) + " of " + units.length;
    if (finish) finish.hidden = i !== units.length - 1;
    if (prev) prev.disabled = i === 0;
    if (next) next.textContent = i === units.length - 1 ? "Finish" : "Continue";
    const id = units[i].id;
    if (id && location.hash !== "#" + id) history.replaceState(null, "", "#" + id);
  }

  tabs.forEach((t, idx) => t.addEventListener("click", () => show(idx)));
  if (prev) prev.addEventListener("click", () => show(i - 1));
  if (next) next.addEventListener("click", () => show(i + 1));
  window.addEventListener("hashchange", () => {
    fromHash();
    show(i);
  });
  show(i);
})();
