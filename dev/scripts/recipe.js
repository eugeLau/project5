import React from 'react';

export default function(props) {
    // console.log(props)
    return(
        <div className="indRecipe">
            <h3>{props.recipe.name}</h3>
            <p>{props.recipe.servings}</p>
            <p>{props.recipe.ingredients}</p>
            <p>{props.recipe.directions}</p>
        </div>
    )
}