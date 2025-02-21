const baseURL = 'https://chat-app-socket-be.vercel.app';

$("#login").click(() => {
    const email = $("#email").val();
    const password = $("#password").val();
    const data = { email, password };

    console.log({ data });

    // Clear previous errors
    $("#errorAlert").addClass("d-none").empty();

    axios({
        method: 'post',
        url: `${baseURL}/users/signin`,
        data: data,
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    })
    .then(function (response) {
        console.log({ response });
        const { message, user, tokens } = response.data;
        console.log({ message, user, tokens });

        if (message === "User loged In Successfully...") {
            localStorage.setItem('token', tokens.accessToken);
            window.location.href = 'chat.html';
        } else {
            showError("Invalid email or password. Please try again.");
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

// Function to display errors in Bootstrap alert
function showError(message) {
    $("#errorAlert").removeClass("d-none").html(message);
}
