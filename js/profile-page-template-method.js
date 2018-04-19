/*
* @method:notificationTemplateGenerator
* @param:{object} notificationDataObject
* @desc:create the one list element containing user information of notifation on call
* @return:_template{string}
*/
function notificationTemplateGenerator(notificationDataObject) {

    var _template,
        _userImageTemplate;


    _template = '<li>' +
        '<div class="notification-data">' +
        '<div class="notification-box-activist-image-container">' +
        '<img src="' + notificationDataObject.notificator_image_path + '" alt="' + notificationDataObject.notificator_name + '" class="activist-profile-image">' +
        '</div>' +
        '<div class="dispaly-inline-block notification-box-text-container">' +
        '<p>' +
        '<span class="notification-box-user-name">' + notificationDataObject.notificator_user_name + '</span>' +
        '<span>' + " " + notificationDataObject.notificator_content + '</span>' +
        '<span class="notification-box-notification-time">' + " " + notificationDataObject.notificator_time_passed + '</span>' +
        '</p>' +
        '</div>';
    _userImageTemplate = '<div class="notification-box-activist-image-container">' +
        '<img src="' + notificationDataObject.current_user_profile_image_path + '" alt="' + notificationDataObject.current_profile_name +
        '" class="notification-profile-image"/>' +
        '</div>';

    if (notificationDataObject.notificator_content == "liked your photo."){
        _template=_template + _userImageTemplate + '</div></li>';
        return _template;
    }
    else if (notificationDataObject.notificator_content == "start following you."){
        _template=_template + '</div></li>';
        return _template;
    }
        
}

/*
* @method:searchResultTemplate
* @param:{number}userIndexNumber,{object}userObject
* @desc:create the list element of passed user for the search result list on call 
* @return:_list{string}
*/
function searchResultTemplate(userIndexNumber, userObject) {
    var _list = '<li>' +
        '<div>' +
        '<div class="search-result-image-container">' +
        '<img src="' + userObject[userIndexNumber].data_path + userObject[userIndexNumber].profile_pitcure +
        '" alt="' + userObject[userIndexNumber].name + '" class="search-result-profile-image">' +
        '</div>' +
        '<div class="search-result-name-user-name-container">' +
        '<p class="search-result-user-name">' + userObject[userIndexNumber].user_name + '</p>' +
        '<p class="search-result-name">' + userObject[userIndexNumber].name + '</p>' +
        '</div>' +
        '</div>' +
        '</li>';

    return _list;

}
/*
* @method:listTemplatefollowerFollowingListModalBox
* @param:{object}userObject,{number}userIndexNumber,{string}followFollowingButtonClass,{string}followFollowingButtonContent
* @desc:create the list element of one user for the required list on call
* @return:_listTemplate{string}
*/
function listTemplatefollowerFollowingListModalBox(userObject, userIndexNumber, followFollowingButtonClass, followFollowingButtonContent) {
    var _listTemplate,
        _listDataTemplate = '<div class="follower-image-container">' +
        '<img src="' + "./" + userObject[userIndexNumber].data_path + userObject[userIndexNumber].profile_pitcure +
        '" alt="' + userObject[userIndexNumber].name + '" class="follower-image"/>' +
        '</div>' +
        '<div class="followers-name-user-name-container">' +
        '<p class="follower-user-name">' + userObject[userIndexNumber].user_name + '</p>' +
        '<p class="follower-name">' + userObject[userIndexNumber].name + '</p>' +
        '</div>';

    _listTemplate = '<li><div>' + _listDataTemplate + '<div class="' + followFollowingButtonClass +
        ' follow-button-finder">' + followFollowingButtonContent + '</div>' +
        '</div>' +
        '</li>';

    return _listTemplate;

}
/*
* @method:followerFollowingListModalBoxTemplate
* @param:{string}listName
* @desc:create template for the empty list for following or followers users on call
* @return:_followerFollowingListModalBoxTemplate{string}
*/
function followerFollowingListModalBoxTemplate(listName) {
    var _followerFollowingListModalBoxTemplate = '<div class="modal-box follower-modal">' +
        '<div class="modal-content-container-followers">' +
        '<ul class="modal-content-followers">' +
        '<li>' + listName + '</li>' +
        '<li>' +
        '<div class="modal-content-followers-list">' +
        '<ul class="modal-content-followers-list-inner-container">' +
        '</ul>' +
        '</div>' +
        '</li>' +
        '</ul>' +
        ' </div>' +
        '</div>' +
        '</div>';

    return _followerFollowingListModalBoxTemplate;
}

/*
* @method:hoverProfilePostTemplate
* @param:{object}profileObject,{number}postNumberHovered
* @desc:create the hover node for post on call
* @return:_template{string}
*/
function hoverProfilePostTemplate(profileObject, postNumberHovered) {
    var _template = '<div class="profile-posts-container-hover">' +
        '<div class="comment-like-hover-information-container">' +
        '<div class="dispaly-inline-block comment-like-hover-information-inner-container">' +
        '<img alt="likes" src="./images/white-heart-md.png" class="comment-like-image-size"/>' +
        '<span>' + profileObject.posts[postNumberHovered].likes_count + '</span>' +
        '</div>' +
        '<div class="dispaly-inline-block comment-like-hover-information-inner-container">' +
        '<img alt="comment" src="./images/speech-bubble-24.png" class="comment-like-image-size " />' +
        '<span>' + profileObject.posts[postNumberHovered].comments_count + '</span>' +
        '</div>' +
        '</div>' +
        '</div>';
    return _template;
}


/*
* @method:profilePostModalBoxTemplate
* @param:{object}SelectedPostObject,{string}imageFolder,{object}profileObject
* @desc:create the modal box containg post information on click
* @return:_postModalBox{string}
*/
function profilePostModalBoxTemplate(SelectedPostObject, imageFolder, profileObject) {
    var _postModalBox = '<div class="modal-box-profile-posts">' +
        '<div class="modal-box-profile-posts-content-container">' +
        '<div class="modal-box-previous-profile-posts">&#60</div>' +
        '<div class="dispaly-inline-block float-left">' +
        '<img src="' + imageFolder + SelectedPostObject.post_image + '" alt="profile pitcure" class="profile-posts-modal-box-image" />' +
        '</div>' +
        '<div class="post-related-information-container dispaly-inline-block float-left">' +
        '<div class="profile-post-modal-side-bar-upper-container">' +
        '<div class="profile-post-modal-side-bar-row-1">' +
        '<div class="dispaly-inline-block cursor-pointer">' +
        ' <img src="' + imageFolder + profileObject.profile_pitcure + '" alt="profile pitcure" class="profile-pitcure-side-icon" />' +
        '</div>' +
        '<div class="dispaly-inline-block cursor-pointer beside-profile-user-name">' +
        '<p>' + profileObject.user_name + '</p>' +
        '</div>' +
        '</div>' +
        '<hr/>' +
        '<div class="profile-post-modal-side-bar-row-2">' +
        '<div class="dispaly-inline-block profile-post-modal-side-bar-total-likes">' +
        '<p><span class="total-likes">' + SelectedPostObject.likes_count + '</span> likes</p>' +
        '</div>' +
        '<div class="dispaly-inline-block profile-post-modal-side-bar-time float-right cursor-pointer">' +
        '<p>' + postTimeHandler(SelectedPostObject.post_time) + '</p>' +
        '</div>' +
        '</div>' +
        '<div class="Comment-stack profile-post-modal-side-bar-comment-area">' +
        '<div class="row">' +
        '<span class="commenter-name">' + profileObject.user_name + '</span>' + SelectedPostObject.content +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div>' +
        '<hr/>' +
        '<div class="like-button float-left heart hand-sign like-button-alignment heart-active ">' +
        '</div>' +
        '<div class="dispaly-inline-block">' +
        '<input type="text" name="comment area" placeholder="Add a Comment" class="add-comment" />' +
        '</div>' +
        '<div class="dispaly-inline-block post-related-action float-right">...</div>' +
        '</div>' +
        '</div>' +
        '<div class="modal-box-next-profile-posts">&#62</div>' +
        '</div>' +
        '<div class="modal" id="post-related-action-modal">' +
        '<div class="modal-content">' +
        '<ul class="modal-list">' +
        ' <li>Embed</li>' +
        '<li id="post-related-action-modal-cancel">Cancel</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div>';
    return _postModalBox;

}