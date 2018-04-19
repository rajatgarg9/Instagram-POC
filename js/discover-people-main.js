var userId = 12,
    jsonDataObjsConatainer = {
        profile_object: usersData.users[1],
        user_object: usersData.users,
        users_list: userMapping.users
    };



//Event Binding
document.getElementsByClassName("search")[0].oninput = function() {
    searchResultHandler(jsonDataObjsConatainer.user_object);
}
document.getElementsByClassName("notification-image")[0].addEventListener("click", function(event) {
    notificationBoxHandler(jsonDataObjsConatainer.profile_object, jsonDataObjsConatainer.user_object);
    document.getElementsByClassName("notification-box-container")[0].style.display = "block";
    document.getElementById("transparent-box-model").style.display = "block";
});



discoverPeopleDataHandler(jsonDataObjsConatainer, userId);