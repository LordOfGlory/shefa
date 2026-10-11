/* Shefa Ventures interactions */
(function () {
  function rename(s) {
    return String(s)
      .replace(/Forex Academy/g, "Financial Markets Academy")
      .replace(/forex academy/gi, "financial markets academy")
      .replace(/Forex/g, "Financial Markets")
      .replace(/forex/g, "financial markets");
  }
  function walk(node) {
    if (!node) return;
    if (node.nodeType === 3) {
      if (/forex/i.test(node.nodeValue)) node.nodeValue = rename(node.nodeValue);
      return;
    }
    if (node.nodeType !== 1) return;
    var tag = node.tagName;
    if (tag === "SCRIPT" || tag === "STYLE") return;
    ["alt", "data-enroll", "aria-label"].forEach(function (attr) {
      if (!node.hasAttribute(attr)) return;
      var v = node.getAttribute(attr);
      if (v && /forex/i.test(v)) node.setAttribute(attr, rename(v));
    });
    if ((tag === "INPUT" || tag === "OPTION" || tag === "SELECT") && node.value && /forex/i.test(node.value)) {
      node.value = rename(node.value);
    }
    for (var i = 0; i < node.childNodes.length; i++) walk(node.childNodes[i]);
  }
  if (/forex/i.test(document.title)) document.title = rename(document.title);
  if (document.body) walk(document.body);
})();
