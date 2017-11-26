import React from 'react';

export default class SummaryRecipe extends React.Component {
    render() {
        console.log(this)
        return (
            <li className="summaryList">
                <div className="SummaryTitle">
                    <h2>{this.props.data.day}</h2>
                    <p className="recipeName">{this.props.data.recipeObject.name}</p>
                </div>
            </li>
        )
    }
}