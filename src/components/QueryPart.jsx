import React from 'react';
import '../styles/query-part.css';
import { connect } from 'react-redux';
import { updateNameForSearch, updateTagForSearch } from '../redux/actions.js';

class QueryPart extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
    }
    handleNameChange(event) {
        this.props.updateNameForSearch(event.target.value);
    }
    handleTagChange(event) {
        this.props.updateTagForSearch(event.target.value);
    }
    render() {
        return (
            <div id="inputContainer">
                <input type="text" placeholder="search by name" id="name-input" onChange={this.handleNameChange} value={this.props.nameForSearch} />
                <input type="text" placeholder="search by tag" id="tag-input" onChange={this.handleTagChange} value={this.props.tagForSearch} />
            </div>
        );
    }
}

export default connect((state) => ({
    nameForSearch: state.nameForSearch,
    tagForSearch: state.tagForSearch
}), {
    updateNameForSearch,
    updateTagForSearch
})(QueryPart);