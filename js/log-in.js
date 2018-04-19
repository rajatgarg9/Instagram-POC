var userId = 12,
    profileObject = usersData.users[1],
    inputFieldUserName,
    inputFieldUserPassword;

//Event Binding
document.getElementById("user-name").oninput = function() {
    inputFieldUserName = this.value;
}
document.getElementById("user-password").oninput = function() {
    inputFieldUserPassword = this.value;
}
document.getElementById("form-elements-container").onsubmit = function() {

    return logInProcessHandler(inputFieldUserName, inputFieldUserPassword, profileObject);
}

/*
* @method:logInProcessHandler
* @param:{string}inputFieldUserName,{string}inputFieldUserPassword,{object}profileObject
* @desc:validate the credential on submit the form
* @return:{boolean}
*/
function logInProcessHandler(inputFieldUserName, inputFieldUserPassword, profileObject) {
    if (inputFieldUserName == profileObject.user_name && inputFieldUserPassword == profileObject.password)
        return true;
    else {
        if (document.getElementById("login-error-message") == null)
            document.getElementById("form-elements-container").insertAdjacentHTML("beforeEnd", logInErrorMessageGenerator());
        return false;
    }

}

/*
* @method:logInErrorMessageGenerator
* @param:{undefined}undefined
* @desc:hide create the error message for wronng credentials
* @return:undefined{undefined}
*/
function logInErrorMessageGenerator() {
    var _template = '<div id="login-error-message">' +
        "<p>The username you entered doesn't belong to an account. Please check your username and try again.</p>" +
        '</div>';
    return _template;
}