import React from 'react';

export default class IndRecipe extends React.Component {
    render(){
        console.log(this) 
        
        return(
            <li className="recipeList">
                <div className="listTitle">
                    <h2>{this.props.data.day}</h2>
                    <p className="recipeName">{this.props.data.recipeObject.name}</p>
                </div>
                <div className="listInfo">
                    <p className="recipeServings">Servings: {this.props.data.recipeObject.servings}</p>
                    <h3>Ingredients</h3>
                    <p>{this.props.data.recipeObject.ingredients}</p>
                    <h3>Directions</h3>
                    <p>{this.props.data.recipeObject.directions}</p>
                <button onClick={() => this.props.remove(this.props.data.key)} className="removeBtn">Remove Recipe</button>
                </div>
            </li>
        )
    }
}


