(function () {
  if (document.getElementById("sv-chat-root")) return;
  var WA = "https://wa.me/256788668652";
  var css = "#sv-chat-root{all:initial;font-family:Inter,system-ui,sans-serif}#sv-chat-btn{position:fixed;right:18px;bottom:18px;z-index:2147483000;width:58px;height:58px;border:0;border-radius:50%;background:#25D366;color:#fff;font:600 13px Inter,sans-serif;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.25)}#sv-chat-panel{position:fixed;right:18px;bottom:86px;z-index:2147483000;width:min(340px,calc(100vw - 20px));height:420px;background:#fff;border:1px solid #ddd;border-radius:12px;display:none;flex-direction:column;overflow:hidden;box-shadow:0 16px 40px rgba(0,0,0,.2)}#sv-chat-panel.on{display:flex}#sv-chat-panel header{background:#171a20;color:#fff;padding:12px 14px;font-size:14px;font-weight:600}#sv-chat-panel header small{display:block;font-weight:400;opacity:.7;font-size:12px}#sv-chat-log{flex:1;overflow:auto;padding:12px;background:#f4f5f6}#sv-chat-log .b,#sv-chat-log .m{max-width:90%;padding:8px 10px;border-radius:10px;margin:0 0 8px;font-size:13px;line-height:1.4}#sv-chat-log .b{background:#fff;border:1px solid #e5e5e5}#sv-chat-log .m{background:#3E6AE1;color:#fff;margin-left:auto}#sv-chat-panel form{display:flex;gap:6px;padding:8px;border-top:1px solid #eee}#sv-chat-panel input{flex:1;border:1px solid #ccc;border-radius:6px;padding:8px}#sv-chat-panel form button{border:0;background:#171a20;color:#fff;border-radius:6px;padding:0 12px}";
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);
  var root = document.createElement("div");
  root.id = "sv-chat-root";
  root.innerHTML = '<button type="button" id="sv-chat-btn" aria-label="Chat">Chat</button><div id="sv-chat-panel"><header>Shefa Assistant<small>Type human for WhatsApp</small></header><div id="sv-chat-log"></div><form><input maxlength="240" placeholder="Ask a question" autocomplete="off"><button type="submit">Send</button></form></div>';
  document.body.appendChild(root);
  var panel = document.getElementById("sv-chat-panel");
  var log = document.getElementById("sv-chat-log");
  var input = panel.querySelector("input");
  function line(text, me) {
    var d = document.createElement("div");
    d.className = me ? "m" : "b";
    d.textContent = text;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
  }
  function reply(q) {
    q = (q || "").toLowerCase();
    if (/human|person|agent|staff|whatsapp|call|talk/.test(q)) return "A person can help on WhatsApp 0788668652. Link: " + WA;
    if (/price|fee|tuition|cost|pay/.test(q)) return "Fees: IT UGX 1,200,000 (12 weeks). Cyber UGX 1,500,000 (12 weeks). Forex UGX 800,000 (8 weeks). Confirm on WhatsApp before paying.";
    if (/forex|trading/.test(q)) return "Forex is education only and does not guarantee profit. Fee UGX 800,000.";
    if (/cyber|security|pentest/.test(q)) return "Security work is authorized and defensive. See Cybersecurity or WhatsApp 0788668652.";
    if (/enroll|course|learn|education|program/.test(q)) return "Choose one academy on the Education page, then apply.";
    if (/it|web|app|software|cloud/.test(q)) return "IT covers web, apps, software, cloud and support. Book a consultation or WhatsApp.";
    if (/email|mail|contact/.test(q)) return "Email shefaventurez@outlook.com or WhatsApp 0788668652.";
    if (/hi|hello|hey|help/.test(q)) return "Hello. Ask about IT, security, fees, or type human.";
    return "I will hand you to a person. WhatsApp 0788668652 " + WA;
  }
  document.getElementById("sv-chat-btn").onclick = function () {
    panel.classList.toggle("on");
  };
  panel.querySelector("form").onsubmit = function (e) {
    e.preventDefault();
    var q = (input.value || "").trim();
    if (!q) return;
    line(q, true);
    input.value = "";
    line(reply(q), false);
  };
  line("Hello. Ask about services or fees. Type human to open WhatsApp.", false);
})();
