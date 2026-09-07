/* Shefa Venturez interactions */
(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const mobile = document.querySelector(".mobile-nav");

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = mobile.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    mobile.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        mobile.classList.remove("open");
        toggle.classList.remove("open");
        document.body.style.overflow = "";
      })
    );
  }

  document.querySelectorAll(".faq-q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const was = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((i) => i.classList.remove("open"));
      if (!was) item.classList.add("open");
    });
  });

  const waNumber = (document.documentElement.dataset.wa || "256763533786").replace(/[^\d]/g, "").slice(0, 15);
  const waMenu = [
    ["IT services", "Hello Shefa Venturez — I need help with IT (web, software, cloud or support). Please reply with the next step."],
    ["Cybersecurity", "Hello Shefa Venturez — I would like to discuss authorized cybersecurity work. Please reply with the next step."],
    ["Academy", "Hello Shefa Venturez — I want to know about the academy (IT, Cyber, or Forex). Please reply with the next step."],
    ["General question", "Hello Shefa Venturez — I have a question. Please reply with the next step."],
  ];
  function waLink(text) {
    return "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(text);
  }
  const defaultWa = waLink(waMenu[3][1]);
  document.querySelectorAll("[data-whatsapp]").forEach((el) => {
    const custom = el.getAttribute("data-wa-msg");
    el.setAttribute("href", custom ? waLink(custom) : defaultWa);
  });
  if (!document.querySelector(".float-wa")) {
    const wrap = document.createElement("div");
    wrap.className = "wa-dock";
    const sheet = document.createElement("div");
    sheet.className = "wa-sheet";
    sheet.hidden = true;
    sheet.setAttribute("role", "dialog");
    sheet.setAttribute("aria-label", "Message Shefa on WhatsApp");
    sheet.innerHTML =
      "<p class=\"wa-sheet-title\">WhatsApp +256 763 533 786</p>" +
      "<p class=\"wa-sheet-copy\">Choose a topic. The first message is already written for you.</p>" +
      waMenu
        .map(function (row) {
          return "<a class=\"wa-sheet-link\" href=\"" + waLink(row[1]) + "\">" + row[0] + "</a>";
        })
        .join("");
    const a = document.createElement("button");
    a.type = "button";
    a.className = "float-wa";
    a.setAttribute("aria-label", "Chat on WhatsApp +256 763 533 786");
    a.setAttribute("aria-expanded", "false");
    a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1s-.7.9-.8 1c-.2.1-.3.2-.6.1a7.3 7.3 0 0 1-2.2-1.4 8 8 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.4.1-.3c0-.1 0-.3-.1-.4s-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.4c.1.2 1.6 2.4 3.8 3.4 1.4.6 1.9.7 2.6.6.4 0 1.3-.2 1.5-.5s.6-.6.7-.8.1-.4 0-.5-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>';
    a.addEventListener("click", function () {
      const open = sheet.hidden;
      sheet.hidden = !open;
      a.setAttribute("aria-expanded", open ? "true" : "false");
    });
    wrap.appendChild(sheet);
    wrap.appendChild(a);
    document.body.appendChild(wrap);
  }

  const canvas = document.getElementById("net-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w, h, nodes, raf, mx = 0.5, my = 0.5;
    const COUNT = window.matchMedia("(max-width:720px)").matches ? 38 : 72;

    function resize() {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }
    function init() {
      nodes = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }));
    }
    function tick() {
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);
      const ox = (mx - 0.5) * 18;
      const oy = (my - 0.5) * 14;
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            ctx.strokeStyle = `rgba(37,99,235,${(1 - d / 130) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x + ox, a.y + oy);
            ctx.lineTo(b.x + ox, b.y + oy);
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.fillStyle = "rgba(8,145,178,0.55)";
        ctx.arc(n.x + ox, n.y + oy, n.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    }
    resize();
    init();
    tick();
    window.addEventListener("resize", () => { resize(); init(); });
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
    }, { passive: true });
  }

  const filters = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll("[data-category]");
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.filter;
      cards.forEach((c) => {
        c.style.display = cat === "all" || c.dataset.category === cat ? "" : "none";
      });
    });
  });


  function sanitize(value) {
    return String(value || "")
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
      .replace(/[\r\n]+/g, " ")
      .replace(/[<>]/g, "")
      .replace(/javascript:/gi, "")
      .replace(/on\w+\s*=/gi, "")
      .trim();
  }
  function looksLikeInjection(value) {
    const v = String(value || "").toLowerCase();
    return /(\b(select|insert|update|delete|drop|union|alter|exec|sleep)\b\s)|(--|\/\*|\*\/)|(['"]\s*or\s+['"]?\d)|(<script|<\/script|onerror\s*=|onload\s*=)/i.test(v);
  }
  function isEmail(v) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v) && v.length <= 120;
  }
  function isPhone(v) {
    const d = v.replace(/[^\d+]/g, "");
    return d.length >= 9 && d.length <= 16 && /^[+]?[\d\s()-]{9,20}$/.test(v);
  }
  function isName(v) {
    return /^[\p{L}\s.'-]{2,80}$/u.test(v);
  }
  function clearErrors(form) {
    form.querySelectorAll(".field-error").forEach((n) => n.remove());
    form.querySelectorAll(".invalid").forEach((n) => n.classList.remove("invalid"));
  }
  function setError(el, msg) {
    el.classList.add("invalid");
    const e = document.createElement("p");
    e.className = "field-error";
    e.textContent = msg;
    el.insertAdjacentElement("afterend", e);
  }
  function honeypotTripped(form) {
    const hp = form.querySelector("[name=website_hp]");
    return hp && hp.value;
  }
  function validateField(el) {
    if (!el || el.name === "website_hp" || el.type === "hidden" || el.type === "radio" || el.type === "checkbox") return true;
    const raw = el.value || "";
    const val = sanitize(raw);
    if (val !== raw) el.value = val;
    if (looksLikeInjection(raw) && el.tagName !== "TEXTAREA") {
      setError(el, "This field contains characters that are not allowed.");
      return false;
    }
    if (el.required && !val) {
      setError(el, "This field is required.");
      return false;
    }
    if (!val) return true;
    if ((el.type === "email" || el.name === "email") && !isEmail(val)) {
      setError(el, "Enter a valid email address.");
      return false;
    }
    if ((el.name === "phone" || el.name === "whatsapp") && val && !isPhone(val)) {
      setError(el, "Enter a valid phone number.");
      return false;
    }
    if ((el.name === "name" || el.name === "fullName") && !isName(val)) {
      setError(el, "Use letters, spaces, apostrophes or hyphens only.");
      return false;
    }
    const max = Number(el.getAttribute("maxlength") || 0);
    if (max && val.length > max) {
      setError(el, "This field is too long.");
      return false;
    }
    return true;
  }
  function validateForm(form, names) {
    clearErrors(form);
    if (honeypotTripped(form)) return false;
    let ok = true;
    const list = names
      ? names.map((n) => form.querySelector(`[name="${n}"]`)).filter(Boolean)
      : [...form.querySelectorAll("input, textarea, select")];
    list.forEach((el) => {
      if (!validateField(el)) ok = false;
    });
    return ok;
  }

  const enroll = document.getElementById("enroll-form");
  const FEES = {
    "IT Academy": "$349 · 12 weeks · ≈ UGX 1,300,000",
    "Cybersecurity Academy": "$429 · 12 weeks · ≈ UGX 1,600,000",
    "Forex Academy": "$299 · 8 weeks · ≈ UGX 1,100,000"
  };
  if (enroll) {
    const q = new URLSearchParams(location.search).get("program");
    const map = { it: "IT Academy", cyber: "Cybersecurity Academy", forex: "Forex Academy" };
    if (q) {
      const val = map[q] || q;
      const radio = enroll.querySelector('input[name=program][value="' + val + '"]');
      if (radio) radio.checked = true;
    }
    let step = 1;
    const panes = enroll.querySelectorAll("[data-step-pane]");
    const dots = document.querySelectorAll(".step-dot");
    const show = (n) => {
      step = n;
      panes.forEach((p) => (p.hidden = Number(p.dataset.stepPane) !== n));
      dots.forEach((d, i) => d.classList.toggle("on", i < n));
    };
    enroll.querySelectorAll("[data-next]").forEach((b) =>
      b.addEventListener("click", () => {
        if (step === 1 && !enroll.querySelector("input[name=program]:checked")) {
          alert("Please choose one academy to continue.");
          return;
        }
        if (step === 2) {
          if (!validateForm(enroll, ["fullName", "email", "phone", "whatsapp", "country", "educationLevel", "profession"])) return;
        }
        if (step === 3) {
          if (!validateForm(enroll, ["goal", "mode", "startDate", "message"])) return;
        }
        const prog = (enroll.querySelector("input[name=program]:checked") || {}).value;
        const feeEl = document.getElementById("fee-review");
        if (feeEl && step >= 3) feeEl.textContent = prog ? ("Tuition: " + (FEES[prog] || "") + ". Pay only after confirmation on WhatsApp +256 763 533 786.") : "";
        show(Math.min(4, step + 1));
      })
    );
    enroll.querySelectorAll("[data-prev]").forEach((b) =>
      b.addEventListener("click", () => show(Math.max(1, step - 1)))
    );
    enroll.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateForm(enroll)) return;
      sendToOutlook(enroll).then((ok) => {
        if (!ok) return;
        const data = Object.fromEntries(new FormData(enroll).entries());
        const box = document.getElementById("enroll-success");
        enroll.hidden = true;
        box.hidden = false;
        const nameEl = box.querySelector("[data-success-name]");
        const progEl = box.querySelector("[data-success-program]");
        if (nameEl) nameEl.textContent = sanitize(data.fullName) || "there";
        if (progEl) progEl.textContent = sanitize(data.program) || "your program";
      });
    });
  }

  const pdfForm = document.getElementById("pdf-form");
  if (pdfForm) {
    pdfForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateForm(pdfForm, ["name", "email"])) return;
      const btn = pdfForm.querySelector('[type="submit"]');
      const original = btn ? btn.textContent : "";
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Preparing…";
      }
      const payload = {};
      new FormData(pdfForm).forEach((v, k) => {
        if (k === "website_hp" || k === "_honey" || k === "company_site") return;
        payload[k] = sanitize(v);
      });
      payload._subject = "Shefa PDF download";
      payload._template = "table";
      payload._captcha = "false";
      if (payload.email) payload._replyto = payload.email;
      const finish = () => {
        pdfForm.hidden = true;
        const done = pdfForm.parentElement.querySelector(".form-done");
        if (done) done.hidden = false;
        const a = document.createElement("a");
        a.href = "/assets/docs/shefa-forex-free-path.pdf";
        a.download = "shefa-forex-free-path.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        if (btn) {
          btn.disabled = false;
          btn.textContent = original;
        }
      };
      fetch("https://formsubmit.co/ajax/shefaventurez@outlook.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      })
        .catch(() => {})
        .finally(finish);
    });
  }

  async function sendToOutlook(form) {
    const btn = form.querySelector('[type="submit"]');
    const original = btn ? btn.textContent : "";
    if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
    const payload = {};
    new FormData(form).forEach((v, k) => {
      if (k === "website_hp" || k === "_honey") return;
      payload[k] = sanitize(v);
    });
    payload._subject = payload._subject || "Shefa Venturez website";
    payload._template = "table";
    payload._captcha = "false";
    if (payload.email) payload._replyto = payload.email;
    try {
      const res = await fetch("https://formsubmit.co/ajax/shefaventurez@outlook.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success !== "false" && json.success !== false) {
        if (btn) { btn.disabled = false; btn.textContent = original; }
        return true;
      }
    } catch (err) {
      /* fall through to mail */
    }
    const lines = Object.entries(payload)
      .filter(([k, v]) => !k.startsWith("_") && String(v || "").trim())
      .map(([k, v]) => k + ": " + v)
      .join("\n")
      .slice(0, 1800);
    const mail =
      "mailto:shefaventurez@outlook.com?subject=" +
      encodeURIComponent(payload._subject) +
      "&body=" +
      encodeURIComponent(lines);
    window.location.href = mail;
    if (btn) { btn.disabled = false; btn.textContent = original; }
    return true;
  }

  document.querySelectorAll("form[data-local], form.subscribe").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateForm(form)) return;
      sendToOutlook(form).then((ok) => {
        if (!ok) return;
        const done = form.parentElement.querySelector(".form-done");
        form.hidden = true;
        if (done) done.hidden = false;
      });
    });
  });

  document.querySelectorAll("form input, form textarea").forEach((el) => {
    el.addEventListener("blur", () => {
      const form = el.closest("form");
      if (!form) return;
      const prev = el.nextElementSibling;
      if (prev && prev.classList.contains("field-error")) prev.remove();
      el.classList.remove("invalid");
      validateField(el);
    });
  });
})();

document.addEventListener('scroll', () => {
  const h = document.querySelector('.site-header');
  if (h) h.classList.toggle('scrolled', window.scrollY > 24);
}, {passive:true});
(function () {
  const path = (location.pathname || "/").replace(/index\.html$/i, "").replace(/\/+$/, "") || "/";
  if (path !== "/") {
    document.body.classList.add("inner");
    const h = document.querySelector(".site-header");
    if (h) h.classList.add("scrolled");
  }
})();

setInterval(() => {
  document.querySelectorAll('a[href*="tiiny"], [id*="tiiny"], [class*="tiiny"]').forEach((n) => n.remove());
}, 800);

(function () {
  const key = (location.hash || "").replace("#", "");
  if (!key) return;
  const btn = document.querySelector('[data-pick="'+key+'"]');
  if (btn) btn.click();
})();
