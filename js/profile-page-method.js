/*
* @method:notificationBoxHandler
* @param:{object}profileObject,{object}userObject
* @desc:create notification list from the json data on click
* @return:undefined{undefined}
*/
function notificationBoxHandler(profileObject, userObject) {

    var _currentProfileName = profileObject.name,
        _userProfileImagePath = profileObject.data_path + profileObject.profile_pitcure,
        _template,
        _notificatorId,
        _notificatorUserIndexNumber,
        _notificatorUserName,
        _notificatorName,
        _notificatorImagePath,
        _notificatorContent,
        _notificatorTimePassed,
        _notificationData,
        _notificationList = document.getElementsByClassName("notification-retrive-list")[0];

    for (_notificationIndexNumber = 0; _notificationIndexNumber < profileObject.notifications.length; _notificationIndexNumber++) {
        _notificatorId = profileObject.notifications[_notificationIndexNumber].notificator_id;
        _notificatorUserIndexNumber = userArrayIndexFinder(userObject, _notificatorId);
        _notificatorUserName = userObject[_notificatorUserIndexNumber].user_name;
        _notificatorName = userObject[_notificatorUserIndexNumber].name;
        _notificatorImagePath = userObject[_notificatorUserIndexNumber].data_path + userObject[_notificatorUserIndexNumber].profile_pitcure;
        _notificatorContent = profileObject.notifications[_notificationIndexNumber].notification_content
        _notificatorTimePassed = postTimeHandler(profileObject.notifications[_notificationIndexNumber].notification_time);
        _notificationData = {
            notificator_user_name: _notificatorUserName,
            notificator_name: _notificatorName,
            notificator_image_path: _notificatorImagePath,
            notificator_content: _notificatorContent,
            notificator_time_passed: _notificatorTimePassed,
            current_profile_name: _currentProfileName,
            current_user_profile_image_path: _userProfileImagePath
        };
        _template = notificationTemplateGenerator(_notificationData);
        addChildNodeAtPosition(_notificationList, _template, "beforeEnd");

    }

    //Event Binding
    document.getElementById("transparent-box-model").addEventListener("click", notificationTransparentBoxHandler);

}
/*
* @method:notificationTransparentBoxHandler
* @param:{undefined}undefined
* @desc:hide the notification list and transparent box and remove event from tranparent box on click 
* @return:undefined{undefined}
*/
function notificationTransparentBoxHandler() {
    document.getElementsByClassName("notification-box-container")[0].style.display = "none";
    this.style.display = "none";
    document.getElementById("transparent-box-model").removeEventListener("click", notificationTransparentBoxHandler);
}

/*
* @method:searchResultHandler
* @param:{undefined}userObject
* @desc:display list of user whose userName start with the text in the search field on given input and also handle hide and show of search result list
* @return:undefined{undefined}
*/
function searchResultHandler(userObject) {
    var _listElement,
        _node1,
        _node2,
        _list = document.getElementsByClassName("search-result-list")[0],
        _searchField = document.getElementsByClassName("search")[0];

    _list.innerHTML = "";

    for (var _userIndexNumber = 0; _userIndexNumber < userObject.length; _userIndexNumber++) {

        if (_searchField.value == "")
            break;

        if (_.startsWith(_.toUpper(userObject[_userIndexNumber].user_name), _.toUpper(_searchField.value)) == 1) {
            _listElement = searchResultTemplate(_userIndexNumber, userObject);
            addChildNodeAtPosition(_list, _listElement, "beforeEnd");
        }
    }


    if (_list.getElementsByTagName("li").length == 0 && _searchField.value != "") {
        _node1 = createNode("li");
        _node2 = createTextNode("No Result Found");
        _node1 = addChildNode(_node1, _node2);
        _listElement = addAttribute(_node1, "class", "search-result-not-found");
        addChildNodeAtPosition(_list, _listElement.outerHTML, "beforeEnd");
    }

    if (_searchField.value != "") {
        document.getElementsByClassName("search-name-result-box-container")[0].style.display = "block";
        document.getElementById("transparent-box-model").style.display = "block"
        //Event Binding
        _searchField.addEventListener("click",function(){searchResulClickActionHandler(_searchField)});
        document.getElementById("transparent-box-model").addEventListener("click", searchResultTransparentBoxHandler);
    } else {
        document.getElementsByClassName("search-name-result-box-container")[0].style.display = "none";
        document.getElementById("transparent-box-model").style.display = "none";
        document.getElementById("transparent-box-model").removeEventListener("click", searchResultTransparentBoxHandler);
    }
}

/*
* @method:searchResulClickActionHandler
* @pram:{object} searchField
* @desc:display the search result box ,transparent modal box and add event on transparent modal box and remove the event of serch field  on click
* @return:undefined{undefined}
*/
function searchResulClickActionHandler(searchField) {
    if (searchField.value != "") {
        document.getElementById("transparent-box-model").style.display = "block";
        document.getElementsByClassName("search-name-result-box-container")[0].style.display = "block";
        document.getElementById("transparent-box-model").addEventListener("click", searchResultTransparentBoxHandler);
    }
}

/*
* @method:searchResulClickActionHandler
* @pram:{undefined} undefined
* @desc:hide the search result box ,transparent modal box and remove the event of transparent modal box on click
* @return:undefined{undefined}
*/

function searchResultTransparentBoxHandler() {
    document.getElementsByClassName("search-name-result-box-container")[0].style.display = "none";
    this.style.display = "none";
    document.getElementById("transparent-box-model").removeEventListener("click", searchResultTransparentBoxHandler);
}

/*
* @method:profilePitcureModalBoxHandler
* @param:{object}profileObject
* @desc:on click display the modal box containg the option for profile pitcure and bind events on that option
* @return:undefined{undefined}
*/
function profilePitcureModalBoxHandler(profileObject) {

    var _modalBox = document.getElementsByClassName("profile-pitcure-modal-box")[0];

    _modalBox.style.display = "block";
    document.getElementsByClassName("profile-upload-file")[0].style.display = "none";

    //Event Binding
    _modalBox.onclick = function(event) {
        outsideAreaModel(event, _modalBox);
    }
    document.getElementById("profile-pitcure-modal-box-cancel").onclick = function(event) {
        hideModal(_modalBox);
    }
    document.getElementById("profile-pitcure-modal-box-upload-photo").onclick = function() {
        document.getElementsByClassName("profile-upload-file")[0].click();
        fileUploaderHandler();
        hideModal(_modalBox);
    }
    document.getElementById("profile-pitcure-modal-box-Remove-Current-Photo").onclick = function() {
        removeCurrentPhotoHandler(profileObject, this);
        hideModal(_modalBox);
    }
}


function sessionManagementHandler() {

    //profile pitcure
    if (localStorage.getItem("data.posts.profilePitcureFlag") == 0) {
        document.getElementsByClassName("profile-pitcure-element")[0].src = profileObject.removed_profile_pitcure;
        document.getElementById("profile-pitcure-modal-box-Remove-Current-Photo").style.display = "none";
    } else if (localStorage.getItem("data.posts.profilePitcureFlag") == 1 && localStorage.getItem("data.posts.profilePitcureSrc") != null) {
        document.getElementsByClassName("profile-pitcure-element")[0].src = localStorage.getItem("data.posts.profilePitcureSrc");
        document.getElementById("profile-pitcure-modal-box-Remove-Current-Photo").style.display = "block";
    }

}

/*
* @method:removeCurrentPhotoHandler
* @param:{object}profileObject,{object}thisObj
* @desc:on click set the profile pitcure to blank person and set the profile pitcure flag and hide remove profile pitcure option
* @return:undefined{undefined}
*/
function removeCurrentPhotoHandler(profileObject, thisObj) {
    document.getElementsByClassName("profile-pitcure-element")[0].src = profileObject.removed_profile_pitcure;
    thisObj.style.display = "none";
    localStorage.setItem("data.posts.profilePitcureFlag", "0");
}

/*
* @method:fileUploaderHandler
* @param:{undefined}undefined
* @desc:on click set the selected image as profile pitcure and store flag for that in local storage and enable option to remove profile pitucre
* @return:undefined{undefined}
*/
function fileUploaderHandler() {
    document.getElementsByClassName("profile-upload-file")[0].onchange = function() {
        var _file = this.files[0],
            _fileReader = new FileReader();

        _fileReader.onload = function() {
            document.getElementsByClassName("profile-pitcure-element")[0].src = this.result;
            document.getElementsByClassName("profile-pitcure-element")[0].alt = _file.name;
            localStorage.setItem("data.posts.profilePitcureSrc", this.result);
        }
        _fileReader.readAsDataURL(_file);
    }
    localStorage.setItem("data.posts.profilePitcureFlag", "1");
    document.getElementById("profile-pitcure-modal-box-Remove-Current-Photo").style.display = "block";
}

/*
* @method:logOutButtonModalBoxHandler
* @param:undefined{undefined}
* @desc:on click show the modal box containing logOut option and bind bind events for different action on modal box
* @return:undefined{undefined}
*/
function logOutButtonModalBoxHandler(){

    var _modalBox = document.getElementsByClassName("log-out-modal-box")[0];

    _modalBox.style.display = "block";

    //Event Binding
    _modalBox.onclick = function(event) {
        outsideAreaModel(event, _modalBox);
    }
    document.getElementById("log-out-cancel").onclick = function(event) {
        hideModal(_modalBox);
    }
    document.getElementById("main-log-out-button").onclick = function(){
    window.location.assign("./index.html");
}
}

/*
* @method:followerFollowingListModalBox
* @param:{object}profileObject,{object}userObject,{string}listNameInDataBase,{object}thisObj
* @desc:create the follower and following list on first click then display and hide for further click
* @return:undefined{undefined}
*/
function followerFollowingListModalBox(profileObject, userObject, listNameInDataBase, thisObj) {
    var _userIndexNumber,
        _listTemplate,
        _FollowingId,
        _followersFollowingUsersId,
        _modalBox,
        _appendModalBoxContainer = document.getElementsByClassName("profile-information-container")[0],
        _followerFollowingListModalBoxTemplate = followerFollowingListModalBoxTemplate(listNameInDataBase),
        _cloneNode = thisObj.cloneNode(true);;

    //DOM Manipulation
    document.getElementsByClassName("follower-count-number")[0].innerHTML = profileObject.followers.length;
    document.getElementsByClassName("following-count-number")[0].innerHTML = profileObject.following.length;
    thisObj.parentNode.replaceChild(_cloneNode, thisObj);


    addChildNodeAtPosition(_appendModalBoxContainer, _followerFollowingListModalBoxTemplate, "afterBegin");

    _followersFollowingUsersId = profileObject[listNameInDataBase];
    _FollowingId = profileObject["following"];

    for (var i = 0; i < _followersFollowingUsersId.length; ++i) {
        _userIndexNumber = userArrayIndexFinder(userObject, _followersFollowingUsersId[i]);
        _appendDataContainer = document.getElementsByClassName("modal-content-followers-list-inner-container")[0];

        if (_.findIndex(_FollowingId, function(x) {
                return x == _followersFollowingUsersId[i]
            }) != -1)
            _listTemplate = listTemplatefollowerFollowingListModalBox(userObject, _userIndexNumber, "following-button", "Following");
        else
            _listTemplate = listTemplatefollowerFollowingListModalBox(userObject, _userIndexNumber, "follow-button", "Follow");


        addChildNodeAtPosition(_appendDataContainer, _listTemplate, "beforeEnd");

        //Event Binding
        document.getElementsByClassName("follow-button-finder")[i].onclick = function() {
            followFollowingButtonHandler(this);
        }
    }
    _modalBox = document.getElementsByClassName("follower-modal")[0];
    _modalBox.style.display = "block";



    //Event Binding
    _cloneNode.onclick = function(event) {
        displayModal(_modalBox);
    }
    _modalBox.onclick = function(event) {
        outsideAreaModel(event, _modalBox)
    }
}


/*
* @method:followFollowingButtonHandler
* @param:{object}thisElement
* @desc:toggle class of follow and following button on click to that button
* @return:undefined{undefined}
*/
function followFollowingButtonHandler(thisElement) {
    var _attributeClass = thisElement.getAttribute("class");

    if (classChecker(_attributeClass, "following-button") == -1) {
        thisElement.innerHTML = "Following";
        thisElement.setAttribute("class", classReplacer(thisElement.getAttribute("class"), "following-button", "follow-button"));
        document.getElementsByClassName("following-count-number")[0].innerHTML = ++document.getElementsByClassName("following-count-number")[0].innerHTML;
    } else {
        thisElement.innerHTML = "Follow";
        thisElement.setAttribute("class", classReplacer(thisElement.getAttribute("class"), "follow-button", "following-button"));
        document.getElementsByClassName("following-count-number")[0].innerHTML = --document.getElementsByClassName("following-count-number")[0].innerHTML;
    }

}

function classChecker(attributeClass, wantToCheckClass) {
    return _.findIndex(_.split(attributeClass, " "), function(o) {
        return o == wantToCheckClass
    })
}

function classReplacer(attributeClass, replaceWithClass, replaceToClass) {
    var _classIndex;
    attributeClass = _.split(attributeClass, " ");
    _classIndex = _.findIndex(attributeClass, function(o) {
        return o == replaceToClass
    });
    attributeClass[_classIndex] = replaceWithClass;
    attributeClass = _.join(attributeClass, " ");
    return attributeClass;
}
/*
* @method:userArrayIndexFinder
* @param:{object}userObject,{number}wantedUserId
* @desc:get the index number of the user by the userId of array in json data
* @return:_userArrayIndex{number}
*/
function userArrayIndexFinder(userObject, wantedUserId) {

    for (var _userArrayIndex = 0; _userArrayIndex < userObject.length; _userArrayIndex++) {
        if (userObject[_userArrayIndex].user_id == wantedUserId)
            break;
    }
    return _userArrayIndex;
}

/*
* @method:profilePostAdderBoundaryCounter
* @param:{object}profileObject,{object}profilePostContainer{number}userId,
* @desc:find the number of post and handle the load more button on call
* @return:undefined{undefined}
*/
function profilePostAdderBoundaryCounter(profileObject, profilePostContainer, userId) {
    var _loadMoreDataContainer = document.getElementsByClassName("load-more-data")[0];
    _postNumberPositionDetails = {
        start_post_number: "",
        stop_post_number: "",
        data_container: ""
    };

    if (profileObject.posts.length <= 12) {
        _postNumberPositionDetails.start_post_number = 0;
        _postNumberPositionDetails.stop_post_number = profileObject.posts.length - 1;
        _postNumberPositionDetails.data_container = profilePostContainer;
        document.getElementsByClassName("load-more")[0].style.display = "none";
        profilePostAdder(profileObject, userId, _postNumberPositionDetails);
    } else if (profileObject.posts.length > 12) {
        _postNumberPositionDetails.start_post_number = profileObject.posts.length - 12;
        _postNumberPositionDetails.stop_post_number = profileObject.posts.length - 1;
        _postNumberPositionDetails.data_container = profilePostContainer;
        profilePostAdder(profileObject, userId, _postNumberPositionDetails);
        document.getElementsByClassName("load-more")[0].style.display = "display";

        //Event binding
        document.getElementsByClassName("load-more")[0].onclick = function() {
            _postNumberPositionDetails.start_post_number = 0;
            _postNumberPositionDetails.stop_post_number = profileObject.posts.length - 13;
            _postNumberPositionDetails.data_container = _loadMoreDataContainer;
            document.getElementsByClassName("load-more")[0].style.display = "none";
            profilePostAdder(profileObject, userId, _postNumberPositionDetails);
        }
    }
}

/*
* @method:profilePostAdder
* @param:{object}profileObject,{number}userId,{object}postNumberContainerObj
* @desc:add all the post and add hover content and also handle post modal box on call
* @return:undefined{undefined}
*/
function profilePostAdder(profileObject, userId, postNumberContainerObj) {
    var _imageFolder = "./" + profileObject.data_path,
        _imageName,
        _imagePath,
        _hoverPostTemplate;

    for (var _postsNumber = postNumberContainerObj.start_post_number; _postsNumber <= postNumberContainerObj.stop_post_number; ++_postsNumber) {
        _imageName = profileObject.posts[_postsNumber].post_image,
            _imagePath = _imageFolder + _imageName;
        profilePostCreater(postNumberContainerObj.data_container, _imagePath);

        _hoverPostTemplate = hoverProfilePostTemplate(profileObject, _postsNumber);
        addChildNodeAtPosition(postNumberContainerObj.data_container.getElementsByClassName("profile-posts-container")[0], _hoverPostTemplate, "beforeEnd");


        //Event binding
        postNumberContainerObj.data_container.getElementsByClassName("profile-posts-container-hover")[0].onclick = function() {
            var _clickedPostNumber = clickedHoveredPostNumberFinder(_imageFolder, this.parentNode.getElementsByClassName("profile-posts")[0], profileObject);
            profilePostModalBoxHandler(_imageFolder, _clickedPostNumber, profileObject, profilePostContainer, userId);
        }

    }
}

/*
* @method:profilePostAdder
* @param:{string}imageFolder,{object}clickedThis,{object}profileObject
* @desc:find the post index number of the clicked image on click
* @return:_postsNumber{number}
*/
function clickedHoveredPostNumberFinder(imageFolder, clickedThis, profileObject) {
    var _clickedImage = _.replace(clickedThis.getAttribute("src"), imageFolder, ""),
        _imageName;

    for (var _postsNumber = 0; _postsNumber < profileObject.posts.length; _postsNumber++) {
        _imageName = profileObject.posts[_postsNumber].post_image;
        if (_clickedImage == _imageName)
            break;
    }
    return _postsNumber;
}

/*
* @method:profilePostCreater
* @param:{object}profilePostContainer,{string}profilePitcurePath
* @desc:add the post image in dom on call
* @return:undefined{undefined}
*/
function profilePostCreater(profilePostContainer, profilePitcurePath) {
    var _nodeParent,
        _nodeChild,
        _nodeChild2;
    _nodeParent = createNode("div");
    _nodeChild = createNode("img");
    _nodeChild = addAttribute(_nodeChild, "src", profilePitcurePath);
    _nodeChild = addAttribute(_nodeChild, "alt", "profile pitcure");
    _nodeChild = addAttribute(_nodeChild, "class", "profile-posts");
    _nodeChild2 = createNode("div");
    _nodeChild2 = addChildNode(_nodeChild2, _nodeChild);
    _nodeParent = addChildNode(_nodeParent, _nodeChild2);
    _nodeParent = addAttribute(_nodeParent, "class", "profile-posts-container dispaly-inline-block");
    addChildNodeAtPosition(profilePostContainer, _nodeParent.outerHTML, "afterBegin");
}

/*
* @method:profilePostModalBoxHandler
* @param:{string}imageFolder,{number}postsNumber,{object}profileObject,{object}profilePostContainer,{number}userId
* @desc:create post modal box of post and handle all events on click
* @return:undefined{undefined}
*/
function profilePostModalBoxHandler(imageFolder, postsNumber, profileObject, profilePostContainer, userId) {
    var _postModalBoxTemplate,
        _commenterID,
        _commenterComment,
        _commentArea,
        _postRelatedActionModal;

    _postModalBoxTemplate = profilePostModalBoxTemplate(profileObject.posts[postsNumber], imageFolder, profileObject);
    addChildNodeAtPosition(profilePostContainer, _postModalBoxTemplate, "afterBegin");

    _postRelatedActionModal = document.getElementById("post-related-action-modal");

    if (postsNumber == 0)
        document.getElementsByClassName("modal-box-next-profile-posts")[0].style.visibility = "hidden";
    if (postsNumber == (profileObject.posts.length - 1))
        document.getElementsByClassName("modal-box-previous-profile-posts")[0].style.visibility = "hidden";

    for (var _commentNumber = 0; _commentNumber < profileObject.posts[postsNumber].comments.length; _commentNumber++) {
        _commenterID = profileObject.posts[postsNumber].comments[_commentNumber].user_id;
        _commenterComment = profileObject.posts[postsNumber].comments[_commentNumber].comment;
        _containerComment = createCommentContainer(_commenterID, _commenterComment);
        _commentArea = profilePostContainer.getElementsByClassName("Comment-stack");
        _commentArea[0].appendChild(_containerComment, _commentArea);
        deleteCommentImage(userId, userId, _containerComment);
    }

    //Event binding
    document.getElementsByClassName("add-comment")[0].onkeypress = function(event) {

        addComment(event, userId, profilePostContainer);
    }
    document.getElementsByClassName("like-button")[0].onclick = function(event) {

        likeHandler(profilePostContainer);
    }
    document.getElementsByClassName("modal-box-profile-posts")[0].onclick = function(event) {
        if (event.target == event.currentTarget)
            profilePostContainer.removeChild(document.getElementsByClassName("modal-box-profile-posts")[0]);
    }
    document.getElementsByClassName("modal-box-next-profile-posts")[0].onclick = function() {
        profilePostModalBoxScrollerNext(imageFolder, postsNumber, profileObject, profilePostContainer, userId);
    }
    document.getElementsByClassName("modal-box-previous-profile-posts")[0].onclick = function() {
        profilePostModalBoxScrollerPrevious(imageFolder, postsNumber, profileObject, profilePostContainer, userId);
    }
    document.getElementsByClassName("post-related-action")[0].onclick = function(event) {
        _postRelatedActionModal.style.display = "block";
        profilePostModalBoxPostRelatedActionModalHandler(_postRelatedActionModal);
    }
}

/*
* @method:profilePostModalBoxPostRelatedActionModalHandler
* @param:{object}postRelatedActionModal
* @desc:hide modal on clicking on cancel bitton or on clicking on outside area
* @return:undefined{undefined}
*/
function profilePostModalBoxPostRelatedActionModalHandler(postRelatedActionModal) {

    document.getElementById('post-related-action-modal-cancel').onclick = function() {
        hideModal(postRelatedActionModal);
        event.stopPropagation();
    };
    postRelatedActionModal.onclick = function(event) {
        outsideAreaModel(event, postRelatedActionModal);
    };
}

/*
* @method:profilePostModalBoxScrollerNext
* @param:{string}imageFolder,{number}postsNumber,{object}profileObject,{object}profilePostContainer,{number}userId
* @desc:remove current post modal box and display next post modal box on click
* @return:undefined{undefined}
*/
function profilePostModalBoxScrollerNext(imageFolder, postsNumber, profileObject, profilePostContainer, userId) {
    if (postsNumber >= 0 && postsNumber < profileObject.posts.length) {
        profilePostContainer.removeChild(document.getElementsByClassName("modal-box-profile-posts")[0]);
        --postsNumber;
        profilePostModalBoxHandler(imageFolder, postsNumber, profileObject, profilePostContainer, userId);
        if (postsNumber == 0)
            document.getElementsByClassName("modal-box-next-profile-posts")[0].style.visibility = "hidden";
    }

}

/*
* @method:profilePostModalBoxScrollerPrevious
* @param:{string}imageFolder,{number}postsNumber,{object}profileObject,{object}profilePostContainer,{number}userId
* @desc:remove current post modal box and display previous post modal box on click
* @return:undefined{undefined}
*/
function profilePostModalBoxScrollerPrevious(imageFolder, postsNumber, profileObject, profilePostContainer, userId) {
    if (postsNumber >= 0 && postsNumber < profileObject.posts.length) {
        profilePostContainer.removeChild(document.getElementsByClassName("modal-box-profile-posts")[0]);
        ++postsNumber;
        profilePostModalBoxHandler(imageFolder, postsNumber, profileObject, profilePostContainer, userId);
        if (postsNumber == (profileObject.posts.length - 1))
            document.getElementsByClassName("modal-box-previous-profile-posts")[0].style.visibility = "hidden";
    }

}

/*
* @method:createNode
* @param:{string}elementName
* @desc:create element on call
* @return:_node{object}
*/
function createNode(elementName) {
    var _node= document.createElement(elementName);
    return _node;
}

/*
* @method:createTextNode
* @param:{string}nodeContent
* @desc:create text node on call
* @return:_node{object}
*/
function createTextNode(nodeContent) {
    var _node=document.createTextNode(nodeContent);
    return _node;
}

/*
* @method:addChildNode
* @param:{object}parentNode,{string}ChildNode
* @desc:add the child node at the end of parent node on call
* @return:parentNode{object}
*/
function addChildNode(parentNode, ChildNode) {
    parentNode.appendChild(ChildNode);
    return parentNode;
}

/*
* @method:addChildNodeAtPosition
* @param:{object}parentNode,{string}ChildNode,{string}position
* @desc:add the HTML string at the selected position under parent node on call
* @return:parentNode{object}
*/
function addChildNodeAtPosition(parentNode, ChildNode, position) {
    parentNode.insertAdjacentHTML(position, ChildNode);
    return parentNode;
}

/*
* @method:addAttribute
* @param:{object}node,{string}attributeName,{string}attributeValue
* @desc:add the given attribute with given value to the node on call
* @return:node{object}
*/
function addAttribute(node, attributeName, attributeValue) {
    node.setAttribute(attributeName, attributeValue);
    return node;
}

