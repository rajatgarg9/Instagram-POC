var profilePostContainer,
    profileObject = usersData.users[1],
    userObject = usersData.users,
    followerElement,
    userId = 12;

//DOM manipulation
profilePostContainer = document.getElementsByClassName("post-section")[0];
document.getElementsByClassName("follower-count-number")[0].innerHTML = profileObject.followers.length;
document.getElementsByClassName("following-count-number")[0].innerHTML = profileObject.following.length;
document.getElementsByClassName("post-count-number")[0].innerHTML = profileObject.posts.length;
document.getElementsByClassName("profile-pitcure-element")[0].src = profileObject.data_path + profileObject.profile_pitcure;
document.getElementById("profile-user-name").innerHTML = profileObject.user_name;
document.getElementById("profile-name").innerHTML = profileObject.name;
document.getElementsByClassName("bio-information")[0].innerHTML = profileObject.bio;


//function Call
sessionManagementHandler();

//Event binding
document.getElementsByClassName("profile-text-informtion-activity")[1].onclick = function() {
    followerFollowingListModalBox(profileObject, userObject, "followers", this);
}
document.getElementsByClassName("profile-text-informtion-activity")[2].onclick = function() {
    followerFollowingListModalBox(profileObject, userObject, "following", this);
}
document.getElementsByClassName("log-out-button")[0].onclick = function() {
    logOutButtonModalBoxHandler();
}
document.getElementsByClassName("profile-pitcure-element")[0].onclick = function() {
    profilePitcureModalBoxHandler(profileObject);
}
document.getElementsByClassName("search")[0].oninput = function() {
    searchResultHandler(userObject);
}
document.getElementsByClassName("notification-image")[0].addEventListener("click", function(event) {
    notificationBoxHandler(profileObject, userObject);
    document.getElementsByClassName("notification-box-container")[0].style.display = "block";
    document.getElementById("transparent-box-model").style.display = "block";
});



//function Call
profilePostAdderBoundaryCounter(profileObject, profilePostContainer, userId);