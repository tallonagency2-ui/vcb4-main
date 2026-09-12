"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const backButton = document.getElementById("historyBackButton");
    const homeButton = document.getElementById("historyHomeButton");
    const copyButton = document.getElementById("historyCopyButton");
    const accountNumber = document.getElementById("historyAccountNumber");
    const searchButton = document.getElementById("historySearchButton");
    const searchPanel = document.getElementById("historySearchPanel");
    const searchInput = document.getElementById("historySearchInput");
    const clearSearch = document.getElementById("historyClearSearch");
    const tabs = [...document.querySelectorAll(".history-tab")];
    const items = [...document.querySelectorAll(".history-item")];
    const emptyMessage = document.getElementById("historyEmpty");
    const toast = document.getElementById("historyToast");

    let activeFilter = "all";
    let toastTimer;

    function navigateBack() {
        document.body.classList.add("is-leaving");

        window.setTimeout(() => {
            if (window.history.length > 1) {
                window.history.back();
                return;
            }

            window.location.href = "./home.html";
        }, 150);
    }

    function navigateHome() {
        document.body.classList.add("is-leaving");

        window.setTimeout(() => {
            window.location.href = "./home.html";
        }, 150);
    }

    function showToast(message) {
        if (!toast) {
            return;
        }

        window.clearTimeout(toastTimer);
        toast.textContent = message;
        toast.classList.add("is-visible");

        toastTimer = window.setTimeout(() => {
            toast.classList.remove("is-visible");
        }, 1700);
    }

    function normalizeText(value) {
        return value
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    }

    function renderTransactions() {
        const query = normalizeText(searchInput?.value || "");
        let visibleCount = 0;

        items.forEach((item) => {
            const matchesFilter =
                activeFilter === "all" ||
                item.dataset.kind === activeFilter;
            const matchesSearch = normalizeText(
                item.dataset.search || item.textContent
            ).includes(query);
            const isVisible = matchesFilter && matchesSearch;

            item.hidden = !isVisible;

            if (isVisible) {
                visibleCount += 1;
            }
        });

        if (emptyMessage) {
            emptyMessage.hidden = visibleCount !== 0;
        }
    }

    backButton?.addEventListener("click", navigateBack);
    homeButton?.addEventListener("click", navigateHome);

    copyButton?.addEventListener("click", async () => {
        const value = accountNumber?.textContent.trim() || "0051000548028";

        try {
            await navigator.clipboard.writeText(value);
            showToast("Đã sao chép số tài khoản.");
        } catch {
            showToast(`Số tài khoản: ${value}`);
        }
    });

    searchButton?.addEventListener("click", () => {
        const willOpen = searchPanel?.hidden ?? false;

        if (searchPanel) {
            searchPanel.hidden = !willOpen;
        }

        searchButton.setAttribute("aria-expanded", String(willOpen));

        if (willOpen) {
            window.setTimeout(() => searchInput?.focus(), 0);
        }
    });

    searchInput?.addEventListener("input", renderTransactions);

    clearSearch?.addEventListener("click", () => {
        if (searchInput) {
            searchInput.value = "";
            searchInput.focus();
        }

        renderTransactions();
    });

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            activeFilter = tab.dataset.filter || "all";

            tabs.forEach((currentTab) => {
                const isActive = currentTab === tab;
                currentTab.classList.toggle("is-active", isActive);
                currentTab.setAttribute(
                    "aria-selected",
                    String(isActive)
                );
            });

            renderTransactions();
        });
    });

    renderTransactions();
});
