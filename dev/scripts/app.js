import React from 'react';
import ReactDOM from 'react-dom';
import IndRecipe from './recipe.js'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: []
    }
    this.showRecipe = this.showRecipe.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
  }
  showRecipe(e) {
    e.preventDefault();
    console.log('hi');
    console.log(this);
  }
  addRecipe(e){
    e.preventDefault();
    console.log('submitted');
    console.log(this);
    const recipe = {
      name: this.recipeName.value,
      servings: this.recipeServings.value,
      ingredients: this.recipeIngredients.value,
      directions: this.recipeDirections.value
    };
    const newRecipes = Array.from(this.state.recipes);
    newRecipes.push(recipe);
    this.setState({
      recipes: newRecipes
    });
    this.recipeName.value = "";
    this.recipeServings.value = "";
    this.recipeIngredients.value ="";
    this.recipeDirections.value ="";
  }
    render() {
      return (
        <div>
          <header>
            <h1>Weekly Meal Plan</h1>
          </header>
          <section>
            <ul>
              <li>
                <a href="" onClick={this.showRecipe}>
                  <h2>Monday</h2>
                  <p></p>
                </a>
              </li>
              <li>
                <a href="">
                  <h2>Tuesday</h2>
                  <p></p>
                </a>
              </li>
              <li>
                <a href="">
                  <h2>Wednesday</h2>
                  <p></p>
                </a>
              </li>
            </ul>
          </section>
          <section>
            <form action="" onSubmit={this.addRecipe}>
              <label htmlFor="recipeName">Name</label>
              <input type="text" name="recipeName" ref={ref => this.recipeName = ref}/>
              <label htmlFor="recipeServing">Number of Servings</label>
              <input type="recipeServing" ref={ref => this.recipeServings = ref}/>
              <label htmlFor="recipeIngredients">Ingredients</label>
              <textarea name="recipeIngredients" ref={ref => this.recipeIngredients = ref}></textarea>
              <label htmlFor="recipeDirections">Directions</label>
              <textarea name="recipeDirections" ref={ref => this.recipeDirections = ref}></textarea>
              <input type="submit" value="Add New Recipe" />
            </form>
          </section>
          <section className="recipes">
            {this.state.recipes.map(recipe =>{
              return(
                <IndRecipe recipe={recipe} />
              )
            })}
          </section>
        </div>
      )
    }
}

// class RecipeForm extends React.Component{
//   render(){
//     return(
//       <section>
        
//       </section>
//     )
//   }
// }

// class WeeklyForm extends React.Component {
//   render(){
//     return(
//       <div>
//         <ul>
//           <li>
//             <a href="">
//               <h2>Monday</h2> 
//               <p></p>
//             </a>
//           </li>
//           <li>
//             <a href="">
//               <h2>Tuesday</h2>
//               <p></p>
//             </a>
//           </li>
//           <li>
//             <a href="">
//               <h2>Wednesday</h2>
//               <p></p>
//             </a>
//           </li>
//           <li>
//             <a href="">
//               <h2>Thursday</h2>
//               <p></p>
//             </a>
//           </li>
//           <li>
//             <a href="">
//               <h2>Friday</h2>
//               <p></p>
//             </a>
//           </li>
//           <li>
//             <a href="">
//               <h2>Saturday</h2>
//               <p></p>
//             </a>
//           </li>
//           <li>
//             <a href="">
//               <h2>Sunday</h2>
//               <p></p>
//             </a>
//           </li>
//         </ul>
//       </div>
//     )
//   }
// }

ReactDOM.render(<App />, document.getElementById('app'));
