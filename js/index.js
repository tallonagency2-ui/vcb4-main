"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const splashPage = document.querySelector("#splashPage");

    if (!splashPage) {
        return;
    }

    /*
     * Tổng thời gian từ lúc mở splash đến khi vào login:
     * 4.550ms hiển thị + 450ms thoát = đúng khoảng 5 giây.
     */
    const totalDuration = 3000;
    const exitDuration = 300;
    const exitStartTime = totalDuration - exitDuration;

    const exitTimer = window.setTimeout(() => {
        splashPage.classList.add("is-leaving");
    }, exitStartTime);

    const redirectTimer = window.setTimeout(() => {
        window.location.replace("./login.html");
    }, totalDuration);

    /* Dọn bộ đếm nếu trang bị đóng trước khi chạy xong */
    window.addEventListener(
        "pagehide",
        () => {
            window.clearTimeout(exitTimer);
            window.clearTimeout(redirectTimer);
        },
        { once: true }
    );
});