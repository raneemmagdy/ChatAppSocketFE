const baseURL = 'https://chat-app-socket-be.vercel.app';

// Auto move between OTP fields
$(".otp-box").on("input", function () {
    const index = $(".otp-box").index(this);
    if (this.value.length === 1 && index < 3) {
        $(".otp-box").eq(index + 1).focus();
    }
});

// Handle confirmation
$("#confirm").click(() => {
    const email = $("#confirmEmail").val();
    const otp = $("#otp1").val() + $("#otp2").val() + $("#otp3").val() + $("#otp4").val();

    if (!email || otp.length !== 4) {
        showConfirmError("Please enter your email and a 4-digit OTP.");
        return;
    }

    axios({
        method: 'patch',
        url: `${baseURL}/users/confirmEmail`,
        data: { email, otp },
    })
    .then(response => {
        if (response.data.message === "Email Confirmed Successfully...") {
            alert("Email confirmed successfully! You can now log in.");
            window.location.href = 'index.html';
        }
    })
    .catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
            showConfirmError(error.response.data.error);
        } else {
            showConfirmError("An error occurred. Please try again.");
        }
    });
});

// Resend OTP
$("#resendOtp").click(() => {
    const email = $("#confirmEmail").val();

    if (!email) {
        showConfirmError("Please enter your email to resend OTP.");
        return;
    }

    axios({
        method: 'post',
        url: `${baseURL}/users/resendOtp`,
        data: { email },
    })
    .then(() => {
        alert("A new OTP has been sent to your email.");
    })
    .catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
            showConfirmError(error.response.data.error);
        } else {
            showConfirmError("Failed to resend OTP. Please try again.");
        }
    });
});

// Show error message
function showConfirmError(message) {
    $("#confirmErrorAlert").removeClass("d-none").html(message);
}
