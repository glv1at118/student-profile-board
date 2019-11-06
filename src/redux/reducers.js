import initialState from "./state.js";

function myReducer(previousState = initialState, action) {
    // Make sure to clone the deeply nested array/object inside the outer array/object
    let nextState = { ...previousState, studentInfo: [...previousState.studentInfo] };
    switch (action.type) {
        case "UPDATE_STATE":
            for (let i = 0; i < action.studentArr.length; i++) {
                let studentObj = {
                    city: action.studentArr[i].city,
                    company: action.studentArr[i].company,
                    email: action.studentArr[i].email,
                    firstName: action.studentArr[i].firstName,
                    grades: action.studentArr[i].grades,
                    id: action.studentArr[i].id,
                    lastName: action.studentArr[i].lastName,
                    pic: action.studentArr[i].pic,
                    skill: action.studentArr[i].skill,
                    showMore: false,
                    tags: []
                };
                nextState.studentInfo.push(studentObj);
            }
            return nextState;
        case "TOGGLE_SHOW_MORE":
            for (let x = 0; x < nextState.studentInfo.length; x++) {
                if (nextState.studentInfo[x].email === action.emailMark) {
                    nextState.studentInfo[x].showMore = !nextState.studentInfo[x].showMore;
                    break;
                }
            }
            return nextState;
        case "UPDATE_NAME_FOR_SEARCH":
            nextState.nameForSearch = action.newName;
            return nextState;
        case "UPDATE_TAG_FOR_SEARCH":
            nextState.tagForSearch = action.newTag;
            return nextState;
        case "ADD_TAG":
            for (let x = 0; x < nextState.studentInfo.length; x++) {
                if (nextState.studentInfo[x].email === action.emailMark) {
                    nextState.studentInfo[x].tags.push(action.tagContent);
                    break;
                }
            }
            return nextState;
        default:
            return previousState;
    }
}

export default myReducer;