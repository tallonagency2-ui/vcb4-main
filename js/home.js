"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const balanceValue = document.getElementById("balanceValue");
  const balanceToggleButton = document.getElementById("balanceToggleButton");
  const copyAccountButton = document.getElementById("copyAccountButton");
  const demoToast = document.getElementById("demoToast");

  let toastTimer;

  function showToast(message) {
    if (!demoToast || !message) {
      return;
    }

    window.clearTimeout(toastTimer);
    demoToast.textContent = message;
    demoToast.classList.add("is-visible");

    toastTimer = window.setTimeout(() => {
      demoToast.classList.remove("is-visible");
    }, 1800);
  }

  if (balanceToggleButton && balanceValue) {
    balanceToggleButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isVisible =
        balanceToggleButton.getAttribute("aria-pressed") === "true";
      const nextVisible = !isVisible;

      balanceValue.textContent = nextVisible
        ? balanceValue.dataset.value
        : "********";

      balanceToggleButton.setAttribute("aria-pressed", String(nextVisible));
      balanceToggleButton.setAttribute(
        "aria-label",
        nextVisible ? "Ẩn số dư" : "Hiện số dư",
      );
    });
  }

  if (copyAccountButton) {
    copyAccountButton.addEventListener("click", async () => {
      const accountNumber = "0051000548028";

      try {
        await navigator.clipboard.writeText(accountNumber);
        showToast("Đã sao chép số tài khoản.");
      } catch {
        showToast(`Số tài khoản: ${accountNumber}`);
      }
    });
  }

  document.querySelectorAll("[data-toast]").forEach((button) => {
    button.addEventListener("click", () => {
      showToast(button.dataset.toast);
    });
  });

  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("is-missing");
    });
  });
});