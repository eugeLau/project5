import React from 'react';
import ReactDOM from 'react-dom';
import IndRecipe from './recipe.js'

var config = {
  apiKey: "AIzaSyAY54hM1somlQnpDKP8jIZN7ipfaqCqUsU",
  authDomain: "weeklymealplan-8e228.firebaseapp.com",
  databaseURL: "https://weeklymealplan-8e228.firebaseio.com",
  projectId: "weeklymealplan-8e228",
  storageBucket: "weeklymealplan-8e228.appspot.com",
  messagingSenderId: "364510367872"
};
firebase.initializeApp(config);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectaday: "",
      recipes:[]
    }
    this.showDay = this.showDay.bind(this);
    // this.showRecipeTuesday = this.showRecipeTuesday.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
  }
  showDay(e) {
    e.preventDefault();
    console.log('hi');
    console.log(e.target.value);
    const day = e.target.value;
    
    // const newDay = Array.from(this.state.selectaday);
    // newDay.push(day)
    this.setState({
      selectaday: day
    });
    const dbRef = firebase.database().ref();
    dbRef.push(day);
  }


  addRecipe(e){
//get information out of the form
//make a copy of the current state by calling Array.from(this.state[selectaday])
//call this.setState({
//   [this.state.selectaday]: newinfo
// })
    e.preventDefault();
    console.log('submitted');
    console.log(this);
    const recipe = {
      name: this.recipeName.value,
      servings: this.recipeServings.value,
      ingredients: this.recipeIngredients.value,
      directions: this.recipeDirections.value
    };
    // console.log(recipe);
    const newRecipes = Array.from(this.state.recipes);
    newRecipes.push(recipe);
    this.setState({
      recipes: newRecipes
    });
    // console.log(newRecipes);
    // const newTuesdayRecipes = Array.from(this.state.tuesday);
    // newTuesdayRecipes.push(recipe);
    // this.setState({
    //   tuesday: newTuesdayRecipes
    // });
    this.recipeName.value = "";
    this.recipeServings.value = "";
    this.recipeIngredients.value ="";
    this.recipeDirections.value ="";

    const dbRef = firebase.database().ref();
    dbRef.push(newRecipes);
  }
    render() {
      return (
        <div>
          <header>
            <h1>Weekly Meal Plan</h1>
          </header>
          <section>
            <form action="" >
            <p>choose a day</p>
              <select ref={ref => this.recipeDay = ref} onChange={this.showDay} name="" id="">
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </form>
          </section>
          <section>
            <form action="" onSubmit={this.addRecipe}>
              <h3>{this.state.selectaday}</h3>
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
            {this.state.selectaday}
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


ReactDOM.render(<App />, document.getElementById('app'));
