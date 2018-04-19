/*
* @method:discoverPeopleDataHandler
* @param:{object}jsonDataObjsConatainer,{number}userId
* @desc:create the list of nono following users
* @return:undefined{undefined}
*/ 
function discoverPeopleDataHandler(jsonDataObjsConatainer, userId) {
     var _userFollowing,
         _allUsers,
         _userjsonIndexNumber,
         _template;

     _userFollowing = jsonDataObjsConatainer.profile_object.following;
     _allUsers = Object.getOwnPropertyNames(jsonDataObjsConatainer.users_list);

     for (var _i = 0; _i < _allUsers.length; _i++) {
         _allUsers[_i] = Number(_allUsers[_i]);
     }

     _.pullAll(_allUsers, _userFollowing);
     _.pull(_allUsers, userId);

     for (var _notFollowedId = 0; _notFollowedId < _allUsers.length; ++_notFollowedId) {
         _userjsonIndexNumber = userArrayIndexFinder(jsonDataObjsConatainer.user_object, _allUsers[_notFollowedId]);
         _template = discoverPeopleListDataTemplateGenerator(jsonDataObjsConatainer.user_object[_userjsonIndexNumber]);

         addChildNodeAtPosition(document.getElementsByClassName("discover-people-list")[0], _template, "beforeEnd");

         document.getElementsByClassName("discover-people-follow-button-finder")[_notFollowedId].onclick = function() {
             DiscoverPeoplefollowFollowingButtonHandler(this);
         }

     }
 }

/*
* @method:DiscoverPeoplefollowFollowingButtonHandler
* @param:{object}thisElement
* @desc:handle the follow or following button action on click
* @return:undefined{undefined}
*/

 function DiscoverPeoplefollowFollowingButtonHandler(thisElement) {
     var _attributeClass = thisElement.getAttribute("class");
     if (classChecker(_attributeClass, "following-button") == -1) {
         thisElement.innerHTML = "Following";
         thisElement.setAttribute("class", classReplacer(thisElement.getAttribute("class"), "following-button", "follow-button"));
     } else {
         thisElement.innerHTML = "Follow";
         thisElement.setAttribute("class", classReplacer(thisElement.getAttribute("class"), "follow-button", "following-button"));
     }

 }


/*
* @method:discoverPeopleListDataTemplateGenerator
* @param:{object}selectedUserObject
* @desc:create the list element containing information of the user in discover list on call
* @return:_template{string}
*/
 function discoverPeopleListDataTemplateGenerator(selectedUserObject) {
     var _template,
         _allImageData = "";

     for (var _postIndexNumber = 0; _postIndexNumber < selectedUserObject.posts.length && _postIndexNumber < 3; ++_postIndexNumber) {
         _imageTemplate = '<img src="' + selectedUserObject.data_path + selectedUserObject.posts[_postIndexNumber].post_image + '"alt="' + selectedUserObject.name +
             '"class="not-followed-people-posts-image"/>';
         _allImageData = _allImageData + _imageTemplate;
     }

     _template = '<li>' +
         '<div class="not-followed-person-content display-line-block">' +
         '<div class="display-line-block">' +
         '<img src="' + selectedUserObject.data_path + selectedUserObject.profile_pitcure + '"alt="' + selectedUserObject.name + '"class="not-followed-people-profile-image"/>' +
         '</div>' +
         '<div class="not-followed-people-user-name-container">' +
         '<p class="not-followed-people-user-name">' + selectedUserObject.user_name + '</p>' +
         '<p class="not-followed-people-name">' + selectedUserObject.name + '</p>' +
         '</div>' +
         '<div class="follow-button discover-people-follow-button-finder">Follow</div>' +
         '</div>' +
         '<div class="not-followed-people-posts-image-container">' +
         '<figure>' + _allImageData + '</figure>' +
         '</div>' +
         '</li>';

     return _template;
 }