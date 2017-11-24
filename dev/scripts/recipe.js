import React from 'react';

export default class IndRecipe extends React.Component {
    render(){
        
        console.log(this.props.data.day);
        console.log(this.props.data.recipeObject.directions);
        console.log(this.props.data)

        let directions = this.props.data.recipeObject.directions;
        let ingredients = this.props.data.recipeObject.ingredients;
        let name = this.props.data.recipeObject.name;
        let servings = this.props.data.recipeObject.servings
        let day = this.props.data.day
        
        if(day === "Wednesday") {
           directions = this.props.data.recipeObject.direction; 
        }
        return(
            <div>
                <h3>Wednesday</h3>
                <p>{directions}</p>
            </div>
        )
    }
    // return(
    //     // <div className="indRecipe">
    //     //     <h3>{props.data.name}</h3>
    //     //     <p>{props.data.servings}</p>
    //     //     <p>{props.data.ingredients}</p>
    //     //     <p>{props.data.directions}</p>
    //     // </div>
    // )
}


