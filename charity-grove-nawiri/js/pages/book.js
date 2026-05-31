(function () {
  "use strict";

  var picks = document.querySelectorAll("#book-services .pick[data-svc]");
  var svcSelect = document.getElementById("svc");
  var bookSection = document.getElementById("book");

  function syncSelectState() {
    if (!svcSelect) return;
    svcSelect.classList.toggle("has-value", !!svcSelect.value);
  }

  function selectService(value, activeCard) {
    if (svcSelect && value) svcSelect.value = value;
    syncSelectState();
    picks.forEach(function (card) {
      var selected = activeCard
        ? card === activeCard
        : value && card.dataset.svc === value;
      card.classList.toggle("is-selected", selected);
      card.setAttribute("aria-pressed", selected ? "true" : "false");
    });
  }

  picks.forEach(function (card) {
    card.addEventListener("click", function () {
      selectService(card.dataset.svc, card);
      if (bookSection) {
        bookSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  if (svcSelect) {
    svcSelect.addEventListener("change", function () {
      if (!svcSelect.value) {
        picks.forEach(function (card) {
          card.classList.remove("is-selected");
          card.setAttribute("aria-pressed", "false");
        });
        syncSelectState();
        return;
      }
      selectService(svcSelect.value, null);
    });
    syncSelectState();
  }
})();
