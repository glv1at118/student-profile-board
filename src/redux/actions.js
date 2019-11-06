import axios from 'axios';

export function updateNameForSearch(newName) {
    return {
        type: "UPDATE_NAME_FOR_SEARCH",
        newName: newName
    };
}

export function updateTagForSearch(newTag) {
    return {
        type: "UPDATE_TAG_FOR_SEARCH",
        newTag: newTag
    };
}

export function toggleShowMore(email) {
    return {
        type: "TOGGLE_SHOW_MORE",
        emailMark: email
    };
}

export function addTag(email, tagContent) {
    return {
        type: "ADD_TAG",
        emailMark: email,
        tagContent: tagContent
    };
}

export function updateState(studentArr) {
    return {
        type: "UPDATE_STATE",
        studentArr: studentArr
    };
}

export function makeRequest() {
    return function (dispatch, getState) {
        axios.get('https://www.hatchways.io/api/assessment/students')
            .then(function (response) {
                // retrieves the student info array & dispatch a sync action-creator
                let studentArr = response.data.students;
                dispatch(updateState(studentArr));
            })
            .catch(function (error) {
                console.log(error);
            });
    };
}