/* Blog page – category filter chips.
   Reveal/nav/hero/banner animations come from the global js/nawiri.js. */
(function () {
  "use strict";
  document.querySelectorAll(".chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      document.querySelectorAll(".chip").forEach(function (x) {
        x.classList.remove("active");
      });
      chip.classList.add("active");
      var f = chip.dataset.cat;
      document.querySelectorAll(".cat").forEach(function (el) {
        el.style.display = f === "all" || el.dataset.cat === f ? "" : "none";
      });
    });
  });
})();
