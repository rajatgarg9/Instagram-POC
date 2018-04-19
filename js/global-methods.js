/*
 * @method : likeHandler
 * @param : {object} selectedSectionContainer 
 * @desc : Update likes on click  
 * @return : undefined {undefined}
 */
function likeHandler(selectedSectionContainer) {
    var _likeButton = selectedSectionContainer.getElementsByClassName("like-button")[0];

    if (_likeButton.getAttribute('class').search(" heart-active ") == -1) {

        _likeButton.setAttribute("class", _likeButton.getAttribute('class') + " heart-active ");
        increaseLikeCounter(selectedSectionContainer)
    } else {
        decreaseLikeCounter(selectedSectionContainer);
        _likeButton.setAttribute("class", _likeButton.getAttribute("class").replace(" heart-active ", ""));
    }
}
/*
 * @method: increaseLikeCounter
 * @param : {object} selectedSectionContainer
 * @desc  : increase post`s likes on call
 * @return: undefined {undefined}
 */
function increaseLikeCounter(selectedSectionContainer) {
    var _totalLikes = selectedSectionContainer.getElementsByClassName("total-likes")[0],
        _totalLikesCount = _totalLikes.innerHTML;

    _totalLikesCount++;
    _totalLikes.innerHTML = _totalLikesCount;
}
/*
 * @method:decreaseLikeCounter
 * @param :selectedSectionContainer
 * @desc  :decrease post`s like on call
 * @return:undefined {undefined}
 */
function decreaseLikeCounter(selectedSectionContainer) {
    var _totalLikes = selectedSectionContainer.getElementsByClassName("total-likes")[0],
        _totalLikesCount = _totalLikes.innerHTML;

    _totalLikesCount--;
    _totalLikes.innerHTML = _totalLikesCount;
}
/*
 * @method:addComment
 * @param :{object} textFieldEvent, {Number} userId, {object} selectedSectionContainer
 * @desc  :add comment on pressing enter in comment field
 * @return:undefined {undefined}
 */
function addComment(textFieldEvent, userId, selectedSectionContainer) {
    var _containerComment,
        _commentArea,
        _commentInput = textFieldEvent.target;

    if (((textFieldEvent.keyCode || textFieldEvent.which) == 13) && (_commentInput.value.length > 0)) {
        _containerComment = createCommentContainer(userId, _commentInput.value);
        _commentArea = selectedSectionContainer.getElementsByClassName("Comment-stack");
        _commentArea[0].appendChild(_containerComment, _commentArea);
        deleteCommentImage(userMapping.users[userId], userMapping.users[userId], _containerComment);
        _commentInput.value = "";
    }
}
/*
 * @method:createCommentContainer
 * @param :{Number} commenterId, {String} commentContent
 * @desc  :create the Element containing entered comment in the comment box on call
 * @return:_containerComment {object}
 */
function createCommentContainer(commenterID, commentContent) {
    var _containerComment = document.createElement("div"),
        _commenterName = document.createElement("span"),
        _commenterNameText = document.createTextNode(userMapping.users[commenterID]),
        _comment = document.createElement("p"),
        _CommentText = document.createTextNode(commentContent);

    _commenterName.setAttribute('class', 'commenter-name'); /*add class in span*/
    _containerComment.setAttribute('class', 'row'); /*add class in div*/
    _commenterName.appendChild(_commenterNameText); /*add text in span*/
    _containerComment.appendChild(_commenterName); /*put span in div*/
    _containerComment.appendChild(_CommentText); /*put p in div*/
    return _containerComment;
}
/*
 * @method:deleteCommentImage
 * @param :{Number} userId, {Number} commenterId, {object} containerComment
 * @desc  :add delete option to comment if  logined user add comment
 * @return:undefined {undefined}
 */
function deleteCommentImage(userId, commenterID, containerComment) {
    var _deletecomment;

    if (userId == commenterID) {
        _deletecomment = '<div class="float-right hand-sign"><img src="images/delete_comment.png" alt="delete comment"/></div>';
        containerComment.insertAdjacentHTML('beforeEnd', _deletecomment);
        deleteCommentModalHandler(containerComment);
    }
}
/*
 * @method:deleteCommentModalHandler
 * @param :{object} containerComment
 * @desc  :
 *return  :undefined {undefined}
 */

function deleteCommentModalHandler(containerComment) {
    var _commentModal = document.getElementsByClassName('comment-modal')[0];

    containerComment.getElementsByTagName('img')[0].onclick = function(event) {
        _deleteCommentEvent = event;
        displayModal(_commentModal);
    };
    document.getElementsByClassName('cancel-comment')[0].onclick = function(event) {
        hideModal(_commentModal);
        event.stopPropagation();
    };
    document.getElementsByClassName('delete-comment')[0].onclick = function(event) {
        deleteComment(_deleteCommentEvent, _commentModal);
        event.stopPropagation();
    };
    _commentModal.onclick = function(event) {
        outsideAreaModel(event, _commentModal);
    };
}
/*
 * @method:postRelatedActionModalHandler
 * @param :{object} postRelatedActionModal
 * @desc  :
 * @return:undefined {undefined}
 */
function postRelatedActionModalHandler(postRelatedActionModal) {
    var _postRelatedActionModalReportInappropriateModal = document.getElementById('post-related-action-modal-report-inappropriate-modal');

    document.getElementById('post-related-action-modal-cancel').onclick = function() {
        hideModal(postRelatedActionModal);
        event.stopPropagation();
    }
    document.getElementById('post-related-action-modal-report-inappropriate').onclick = function(event) {
        displayModal(_postRelatedActionModalReportInappropriateModal);
        hideModal(postRelatedActionModal);
        postRelatedActionModalHandlerReportInappropriate(_postRelatedActionModalReportInappropriateModal);
        event.stopPropagation();
    };
    postRelatedActionModal.onclick = function(event) {
        outsideAreaModel(event, postRelatedActionModal);
    };
}

function postRelatedActionModalHandlerReportInappropriate(postRelatedActionModalReportInappropriateModal) {

    postRelatedActionModalReportInappropriateModal.onclick = function(event) {
        outsideAreaModel(event, postRelatedActionModalReportInappropriateModal);
    };
    document.getElementById('post-related-action-modal-report-inappropriate-cancel').onclick = function() {
        hideModal(postRelatedActionModalReportInappropriateModal);
        event.stopPropagation();
    }

}
/*
 * @method:displayModal
 * @param :{object} modal
 * @desc  :dispaly the passed modal box on call
 * @return:undefined {undefined}
 */
function displayModal(modal) {
    modal.style.display = "block";
}
/*
 * @method:hideModal
 * @param :{object} modal
 * @desc  :hide the passed modal box on call
 * @return:undefined {undefined}
 */
function hideModal(modal) {
    modal.style.display = "none";
}
/*
 * @method:hideModal
 * @param :{object} modal
 * @desc  :hide the passed modal box(on clicking outside modal box content) on call
 * @return:undefined {undefined}
 */
function outsideAreaModel(modalEvent, modal) {
    if (modalEvent.target == modal)
        hideModal(modal);
}
/*
 * @method:deleteComment
 * @param :{object} deleteCommentEvent, {object} modal
 * @desc  :delete the clicked comment on call
 * @return:undefined {undefined}
 */
function deleteComment(deleteCommentEvent, modal) {
    deleteCommentEvent.target.parentNode.parentNode.parentNode.removeChild(deleteCommentEvent.target.parentNode.parentNode);
    hideModal(modal);
}