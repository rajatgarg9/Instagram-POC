//global variables 
var userId = 12,
    contentContainer,
    sectionContainer,
    postRelatedActionModal,
    selectedSectionContainer,
    jsonDataObjsConatainer = {
        profile_object: usersData.users[1],
        user_object: usersData.users,
        users_list: userMapping.users
    };

//DOM manipulation
contentContainer = document.getElementsByClassName('content-container');
sectionContainer = document.getElementsByClassName('inner-content-container');
postRelatedActionModal = document.getElementById('post-related-action-modal');


//function call
renderExistingPost(userId, contentContainer, sectionContainer);

//event bindings 
for (var _sectionNumber = 0; _sectionNumber < sectionContainer.length; _sectionNumber++) {
    sectionContainer[_sectionNumber].addEventListener("click", function(event) {
        selectedSectionContainer = event.currentTarget;
    }, true);
    sectionContainer[_sectionNumber].getElementsByClassName('add-comment')[0].onkeypress = function(event) {
        addComment(event, userId, selectedSectionContainer);
    }
    document.getElementsByClassName("like-button")[_sectionNumber].onclick = function() {
        likeHandler(selectedSectionContainer);
    };
    document.getElementsByClassName("post")[_sectionNumber].ondblclick = function() {
        likeHandler(selectedSectionContainer);
    };
    document.getElementsByClassName('post-related-action')[_sectionNumber].onclick = function() {
        displayModal(postRelatedActionModal);
        postRelatedActionModalHandler(postRelatedActionModal);
    };
}
document.getElementsByClassName("search")[0].oninput = function() {
    searchResultHandler(jsonDataObjsConatainer.user_object);
}
document.getElementsByClassName("notification-image")[0].addEventListener("click", function(event) {
    notificationBoxHandler(jsonDataObjsConatainer.profile_object, jsonDataObjsConatainer.user_object);
    document.getElementsByClassName("notification-box-container")[0].style.display = "block";
    document.getElementById("transparent-box-model").style.display = "block";
});