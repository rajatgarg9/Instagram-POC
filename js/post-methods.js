/*
 * @method:mainPostTemplate
 * @param :{object} selectedPost,{string} timeResult
 * @desc  : work as a template and create post section on call
 * @return:_template {string}
 */
function mainPostTemplate(selectedPost, timeResult) {
    var _template = '<div class="inner-content-container">' +
        '<section>' +
        '<div class="post-header">' +
        '<div class="post-header-profile-pitcure-icon-container">' +
        '<img src="' + selectedPost.user_profile + '" alt="' + selectedPost.user_name + '" class="post-header-profile-pitcure-icon" />' +
        '</div>' +
        '<span class="post-header-profile-name">' + selectedPost.user_name + '</span>' +
        '<span class="post-header-time-post" title="' + (new Date(selectedPost.post_time)).toDateString() + '" >' + timeResult + '</span>' +
        '</div>' +
        '<div><figure class="post">' +
        '<img src="' + selectedPost.user_profile + '" alt="' + selectedPost.user_name + '" class="post-main-image"/>' +
        ' </figure></div>' +
        '<div class="post-foot-container">' +
        '<p class="total-likes-text"><span class="total-likes">' + selectedPost.likes_count + '  </span>' + '&nbsp;<span class="total-likes">likes</span></p>' +
        '<div class="Comment-stack">' +
        '<div class="row">' +
        '<p>' +
        '<span class="commenter-name">' + selectedPost.user_name + '</span>' +
        selectedPost.content +
        '</p>' +
        '</div>' +
        '</div>' +
        '<hr/>' +
        '<div class="row">' +
        '<div class="like-button float-left heart hand-sign"></div>' +
        '<div class=" float-left">' +
        '<input class="add-comment" type="text" name="comment" size="55" placeholder="Add a Comment...."/>' +
        '</div>' +
        '<div class=" float-right"><span class="post-related-action">...</span></div>' +
        '</div>' +
        '</section>' +
        '</div>';
    return _template;

}
/*
 * @method:postTimeHandler
 * @param :{number} userId, {object} contentContainer,{object} sectionContainer
 * @desc  : load existing post and their data from json on call
 * @return:undefined {undefined}
 */
function renderExistingPost(userId, contentContainer, sectionContainer) {
    var _commentArea,
        _containerComment,
        _timeResult,
        _template,
        _postList = dataList.data.posts,
        _selectedPost,
        _commenterID,
        _commenterComment;

    for (var _postNumber = 0; _postNumber < _postList.length; _postNumber++) {
        _selectedPost = _postList[_postNumber];
        _timeResult = postTimeHandler(_selectedPost.post_time);
        _template = mainPostTemplate(_selectedPost, _timeResult);
        contentContainer[0].insertAdjacentHTML('beforeend', _template);

        for (var _commentNumber = 0; _commentNumber < _selectedPost.comments.length; _commentNumber++) {
            _commenterID = _selectedPost.comments[_commentNumber].user_id;
            _commenterComment = _selectedPost.comments[_commentNumber].comment;
            _containerComment = createCommentContainer(_commenterID, _commenterComment);
            _commentArea = sectionContainer[_postNumber].getElementsByClassName("Comment-stack");
            _commentArea[0].appendChild(_containerComment);
            deleteCommentImage(userId, _commenterID, _containerComment);
        }

        if (_.indexOf(_selectedPost.likes.user_ids, userId) != -1) {
            likeHandler(sectionContainer[_postNumber]);
            decreaseLikeCounter(sectionContainer[_postNumber]);
        }

    }
}
/*
 * @method:postTimeHandler
 * @param :{string} postTime
 * @desc  :calculate how much time has been gone since the post time
 * @return:_timeResult {string}
 */
function postTimeHandler(postTime) {
    var _postedTime = new Date(postTime),
        _currentTime = new Date(),
        _timeDifference = _currentTime.getTime() - _postedTime.getTime(),
        _timeDifferenceMinute = _timeDifference / (1000 * 60),
        _timeResult;
    if (_timeDifferenceMinute < 60)
        _timeResult = Math.floor(_timeDifferenceMinute) + " minutes";
    else if (60 < _timeDifferenceMinute && _timeDifferenceMinute < 1440) {
        if ((_timeDifferenceMinute / 60) - Math.floor((_timeDifferenceMinute / 60)) < 0.5)
            _timeResult = Math.floor((_timeDifferenceMinute / 60)) + " hours";
        else
            _timeResult = Math.ceil((_timeDifferenceMinute / 60)) + " hours";
    } else {
        if ((_timeDifferenceMinute / 1440 - Math.floor(_timeDifferenceMinute / 1440)) < 0.5)
            _timeResult = Math.floor(_timeDifferenceMinute / 1440) + " days";
        else
            _timeResult = Math.ceil(_timeDifferenceMinute / 1440) + " days";
    }
    return _timeResult;
}