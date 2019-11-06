import React from 'react';
import '../styles/list-part.css';
import ItemPart from './ItemPart.jsx';

export default class ListPart extends React.Component {
    render(){
        return (
            <div id="listContainer">
                <ItemPart></ItemPart>
            </div>
        );    
    }
}