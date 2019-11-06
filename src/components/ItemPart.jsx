import React from 'react';
import '../styles/item-part.css';
import { connect } from 'react-redux';
import { toggleShowMore, addTag } from '../redux/actions.js';

class ItemPart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            styObj1: {
                display: "none"
            },
            styObj2: {
                display: "block"
            },
            tagVal: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.getAverage = this.getAverage.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.getFilteredList = this.getFilteredList.bind(this);
    }
    handleClick(studentEmail) {
        this.props.toggleShowMore(studentEmail);
    }
    getAverage(numArr) {
        let sum = 0;
        for (let x = 0; x < numArr.length; x++) {
            sum = sum + Number(numArr[x]);
        }
        let avg = sum / numArr.length;
        return avg;
    }
    handleEnter(email, event) {
        if (event.keyCode === 13) {
            if (event.target.value === "") {
                alert("You cannot submit an empty tag!");
                return;
            } else {
                let currentTagArr = null;
                for (let x = 0; x < this.props.studentInfo.length; x++) {
                    if (this.props.studentInfo[x].email === email) {
                        currentTagArr = this.props.studentInfo[x].tags;
                        break;
                    }
                }
                for (let x = 0; x < currentTagArr.length; x++) {
                    if (currentTagArr[x].toUpperCase() === event.target.value.toUpperCase()) {
                        alert("The tag already exists in the redux store!");
                        this.setState({
                            tagVal: ""
                        });
                        return;
                    }
                }
                this.props.addTag(email, event.target.value);
                this.setState({
                    tagVal: ""
                });
            }
        }
    }
    handleTagChange(event) {
        this.setState({
            tagVal: event.target.value
        });
    }
    getFilteredList() {
        // This method returns a filtered array according to the name and tag search.
        let filteredList1 = [];
        let filteredList2 = [];
        // consolidate the props data to be simple
        let studentArr = this.props.studentInfo;
        let queryName = this.props.nameForSearch.toUpperCase();
        let queryTag = this.props.tagForSearch.toUpperCase();
        // 1. do name search and generate a 1st stage filtered list
        if (queryName === "") {
            filteredList1 = studentArr;
        } else {
            for (let x = 0; x < studentArr.length; x++) {
                if (studentArr[x].firstName.toUpperCase().includes(queryName) || studentArr[x].lastName.toUpperCase().includes(queryName)) {
                    filteredList1.push(studentArr[x]);
                }
            }
        }
        // 2. do tag search and generate a 2nd stage filtered list based on the 1st stage list
        if (queryTag === "") {
            filteredList2 = filteredList1;
        } else {
            for (let y = 0; y < filteredList1.length; y++) {
                let tagArr = filteredList1[y].tags;
                for (let z = 0; z < tagArr.length; z++) {
                    if (tagArr[z].toUpperCase().includes(queryTag)) {
                        filteredList2.push(filteredList1[y]);
                        break;
                    }
                }
            }
        }
        // 3. return the final filtered array
        return filteredList2;
    }
    render() {
        let filteredList = this.getFilteredList();
        if (filteredList.length === 0) {
            return (
                <ul className="itemPart">
                    <li className="noMatch">No result matches the filter condition :(</li>
                </ul>
            );
        }
        return (
            <ul className="itemPart">
                {
                    filteredList.map((student, index) => {
                        return (
                            <li key={student.firstName + student.lastName}>
                                <div className="upperBox">
                                    <div className="leftSec">
                                        <img src={student.pic} alt="img not accessible" />
                                    </div>
                                    <div className="rightSec">
                                        <h1>{student.firstName} {student.lastName}</h1>
                                        <p>Email: {student.email}</p>
                                        <p>Company: {student.company}</p>
                                        <p>Skill: {student.skill}</p>
                                        <p>Average: {this.getAverage(student.grades)} %</p>
                                    </div>
                                    <div className="expand-btn" onClick={() => this.handleClick(student.email)}>{student.showMore ? '' : ''}</div>
                                </div>
                                <div className="lowerBox" style={student.showMore ? this.state.styObj2 : this.state.styObj1}>
                                    <div className="contentBox">
                                        {
                                            student.grades.map((grade, i) => (
                                                <p key={i}>Test {i + 1}:<span>{grade}%</span></p>
                                            ))
                                        }
                                    </div>
                                    <div className="tagBox">
                                        {
                                            student.tags.map((tag, tag_index) => (
                                                <div className="tag" key={tag + tag_index}>{tag}</div>
                                            ))
                                        }
                                    </div>
                                    <div className="addTagBox">
                                        <input type="text" placeholder="add a tag" onKeyUp={(event) => this.handleEnter(student.email, event)} onChange={this.handleTagChange} value={this.state.tagVal} className="add-tag-input" />
                                    </div>
                                </div>
                                <hr className="divider" />
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
}

export default connect((state) => {
    return {
        studentInfo: state.studentInfo,
        nameForSearch: state.nameForSearch,
        tagForSearch: state.tagForSearch
    };
}, {
    toggleShowMore: toggleShowMore,
    addTag: addTag
})(ItemPart);