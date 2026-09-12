"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const backButton = document.getElementById("detailBackButton");
    const homeButton = document.getElementById("detailHomeButton");
    const codeElement = document.getElementById("transactionCode");
    const dateElement = document.getElementById("transactionDate");
    const amountElement = document.getElementById("transactionAmountValue");
    const contentElement = document.getElementById("transactionContent");

    const fallbackTransaction = {
        code: "5254 - 35233",
        date: "31/07/2026",
        amount: "1,500,000",
        content:
            "UHHT..393319..20260729..452404...1539.20260730. DG:FACEBK *H2ZH8W5822 Dubli.1,130,116.00VND",
        kind: "out"
    };

    function readTransaction() {
        try {
            const saved = sessionStorage.getItem("selectedTransaction");
            return saved
                ? { ...fallbackTransaction, ...JSON.parse(saved) }
                : fallbackTransaction;
        } catch {
            return fallbackTransaction;
        }
    }

    function cleanAmount(value) {
        return String(value || fallbackTransaction.amount)
            .replace(/\bVND\b/gi, "")
            .replace(/^[+\-\s]+/, "")
            .trim();
    }

    function renderTransaction() {
        const transaction = readTransaction();

        codeElement.textContent = transaction.code;
        dateElement.textContent = transaction.date;
        amountElement.textContent = cleanAmount(transaction.amount);
        contentElement.textContent = transaction.content;

        document.documentElement.dataset.transactionKind =
            transaction.kind || "out";
    }

    function leaveThen(callback) {
        document.body.classList.add("is-leaving");
        window.setTimeout(callback, 150);
    }

    backButton?.addEventListener("click", () => {
        leaveThen(() => {
            if (window.history.length > 1) {
                window.history.back();
                return;
            }

            window.location.href = "./transaction-history.html";
        });
    });

    homeButton?.addEventListener("click", () => {
        leaveThen(() => {
            window.location.href = "./home.html";
        });
    });

    renderTransaction();
});
