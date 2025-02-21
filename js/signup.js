const baseURL = 'https://chat-app-socket-be.vercel.app';

$("#signup").click(() => {
    const name = $("#name").val();
    const email = $("#email").val();
    const password = $("#password").val();
    const cPassword = $("#cPassword").val();
    const phone = $("#phone").val();
    const gender = $("#gender").val();
    const provider = "application"; 

    const profileImage = $("#profileImage")[0].files[0];
    const coverImages = $("#coverImages")[0].files; 

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("cPassword", cPassword);
    formData.append("phone", phone);
    formData.append("gender", gender);
    formData.append("provider", provider);

    if (profileImage) {
        formData.append("profileImage", profileImage);
    }

    for (let i = 0; i < coverImages.length; i++) {
        formData.append("coverImages", coverImages[i]);
    }

    // Clear previous error messages
    $("#errorAlert").addClass("d-none").empty();

    axios({
        method: 'post',
        url: `${baseURL}/users/signup`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(function (response) {
        console.log({ response });
        const { message, user } = response.data;
        console.log({ message, user });

        if (message === "User Created Successfully...") {
            alert("Signup successful! Please check your email for confirmation.");
            window.location.href = 'confirm.html';
        } else {
            showError("Signup failed. Please try again.");
        }
    })
    .catch(function (error) {
        console.log(error);
        if (error.response && error.response.data && error.response.data.error) {
            showError(error.response.data.error);
        } else {
            showError("An error occurred. Please try again.");
        }
    });
});

function showError(message) {
    $("#errorAlert").removeClass("d-none").html(message);
}
