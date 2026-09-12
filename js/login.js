"use strict";

const appShell = document.querySelector(".app-shell");

const loginForm = document.querySelector("#loginForm");
const loginButton = document.querySelector("#loginButton");

const passwordField = document.querySelector("#passwordField");
const passwordDots = document.querySelector("#passwordDots");
const passwordPlaceholder = document.querySelector(
    "#passwordPlaceholder"
);
const passwordClear = document.querySelector("#passwordClear");
const passwordToggle = document.querySelector("#passwordToggle");

const faceIdButton = document.querySelector("#faceIdButton");
const forgotButton = document.querySelector("#forgotButton");
const languageButton = document.querySelector(".language-button");
const demoToast = document.querySelector("#demoToast");

const MAX_PASSWORD_DOTS = 9;

let passwordDotCount = 0;
let toastTimer;


/* Hiển thị thông báo */
function showToast(message) {
    clearTimeout(toastTimer);

    demoToast.textContent = message;
    demoToast.classList.add("is-visible");

    toastTimer = setTimeout(() => {
        demoToast.classList.remove("is-visible");
    }, 1800);
}


/* Cập nhật giao diện mật khẩu */
function renderPasswordDots() {
    passwordDots.replaceChildren();

    for (let index = 0; index < passwordDotCount; index += 1) {
        const dot = document.createElement("span");

        dot.className = "password-dot";
        passwordDots.appendChild(dot);
    }

    const hasDots = passwordDotCount > 0;
    const isComplete = passwordDotCount === MAX_PASSWORD_DOTS;

    passwordPlaceholder.hidden = hasDots;
    passwordClear.hidden = !hasDots;

    passwordField.classList.toggle("is-active", hasDots);

    passwordField.setAttribute(
        "aria-valuenow",
        String(passwordDotCount)
    );

    passwordField.setAttribute(
        "aria-label",
        `Đã nhập ${passwordDotCount} trên ${MAX_PASSWORD_DOTS} ký tự`
    );

    loginButton.disabled = !isComplete;
}


/* Thêm một dấu chấm */
function addPasswordDot() {
    if (passwordDotCount >= MAX_PASSWORD_DOTS) {
        return;
    }

    passwordDotCount += 1;
    renderPasswordDots();
}


/* Xóa toàn bộ dấu chấm */
function clearPasswordDots() {
    passwordDotCount = 0;
    renderPasswordDots();
}


/*
 * Chạm vào vùng trống trên màn hình sẽ thêm một dấu chấm.
 * Các nút chức năng khác sẽ không bị tính.
 */
appShell.addEventListener("click", (event) => {
    const clickedControl = event.target.closest(
        "button, a, input, select, textarea"
    );

    if (clickedControl) {
        return;
    }

    addPasswordDot();
});


/* Chạm trực tiếp vào ô mật khẩu */
passwordField.addEventListener("click", (event) => {
    if (event.target.closest("button")) {
        return;
    }

    /*
     * Ngăn sự kiện chạy tiếp lên appShell,
     * tránh một lần chạm nhưng thêm hai chấm.
     */
    event.stopPropagation();
    addPasswordDot();
});


/* Hỗ trợ phím Enter hoặc Space */
passwordField.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
        return;
    }

    event.preventDefault();
    addPasswordDot();
});


/* Nút X xóa mật khẩu */
passwordClear.addEventListener("click", (event) => {
    event.stopPropagation();
    clearPasswordDots();
});


/* Icon con mắt */
passwordToggle.addEventListener("click", (event) => {
    event.stopPropagation();

    showToast(
        "Đây là mật khẩu mô phỏng, không sử dụng mật khẩu thật."
    );
});


/* Xử lý đăng nhập */
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (passwordDotCount !== MAX_PASSWORD_DOTS) {
        showToast("Vui lòng chạm đủ 9 lần.");
        return;
    }

    /*
     * Không lưu hoặc gửi dữ liệu mật khẩu.
     * Chỉ chuyển trang trong giao diện demo.
     */
    window.location.href = "./home.html";
});


/* Nút Face ID */
faceIdButton.addEventListener("click", () => {
    showToast("Đang mô phỏng nhận diện khuôn mặt.");
});


/* Nút quên mật khẩu */
forgotButton.addEventListener("click", () => {
    showToast(
        "Tính năng quên mật khẩu đang ở chế độ demo."
    );
});


/* Nút đổi ngôn ngữ */
languageButton.addEventListener("click", () => {
    showToast("English version is in demo mode.");
});


/* Trạng thái ban đầu */
renderPasswordDots();