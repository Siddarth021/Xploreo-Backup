// front_end/js/modules/otp.js

export function generateOtp() {

    // temporary OTP
    // later replace with backend call

    const otp =
        Math.floor(
            100000 + Math.random() * 900000
        );

    console.log(
        "Generated OTP:",
        otp
    );

    return otp;

}

export function showOtpModal() {

    document
        .querySelector(".otp-modal")
        .classList.remove("hidden");

}

export function hideOtpModal() {

    document
        .querySelector(".otp-modal")
        .classList.add("hidden");

}

export function validateOtp(
    enteredOtp,
    realOtp
) {

    return enteredOtp === realOtp;

}