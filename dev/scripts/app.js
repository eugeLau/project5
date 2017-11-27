import React from 'react';
import ReactDOM from 'react-dom';
import IndRecipe from './recipe';
import SummaryRecipe from './summaryRecipe';

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
    this.addRecipe = this.addRecipe.bind(this);
    this.removeRecipe = this.removeRecipe.bind(this);
  }
  showDay(e) {
    //get value of selectaday
    e.preventDefault();
    console.log('hi');
    console.log(e.target.value);
    var day = e.target.value;
    const newDay = this.recipeDay.value;
    console.log(newDay);
    
    this.setState({
      selectaday: day
    });
    // const dbRef = firebase.database().ref(this.state.selectaday);
    // dbRef.push(day);
  }


  addRecipe(e){
//get information out of the form
//Create recipe object
// push the recipes into state
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
    // clear the value of the labels
    this.recipeName.value = "";
    this.recipeServings.value = "";
    this.recipeIngredients.value ="";
    this.recipeDirections.value ="";

    //push values onto Firebase
    const dbRef = firebase.database().ref(this.state.selectaday);
    dbRef.push(recipe);
  }
  removeRecipe(itemToRemove) {
    console.log("removing recipe");

    //have selectaday match with firebase key and delet from firebase

      const dbRefM = firebase.database().ref(`Monday/${itemToRemove}`);
      const dbRefTu = firebase.database().ref(`Tuesday/${itemToRemove}`);
      const dbRefW = firebase.database().ref(`Wednesday/${itemToRemove}`);
      const dbRefTh = firebase.database().ref(`Thursday/${itemToRemove}`);
      const dbRefF = firebase.database().ref(`Friday/${itemToRemove}`);
      const dbRefSa = firebase.database().ref(`Saturday/${itemToRemove}`);
      const dbRefSu = firebase.database().ref(`Sunday/${itemToRemove}`);
      dbRefM.remove();
      dbRefTu.remove();
      dbRefW.remove();
      dbRefTh.remove();
      dbRefF.remove();
      dbRefSa.remove();
      dbRefSu.remove();

    // console.log(itemToRemove);
  }

    render() {
      return (
        <div>
          <header className="wrapper">
          <div className="title">
            <h1>Weekly Meal Plan</h1>
          </div>
          </header>
          <section className="wrapper">
            <form action="" className="dayForm">
            <p className="chooseADay">Create your Weekly Meal Plan</p>
              <select ref={ref => this.recipeDay = ref} onChange={this.showDay} name="" id="">
                <option value="">Select a Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </form>
          
            <form className="recipeForm" action="" onSubmit={this.addRecipe}>
              <h2>{this.state.selectaday}</h2>
              <label htmlFor="recipeName">Title</label>
              <input type="text" name="recipeName" ref={ref => this.recipeName = ref}/>
              <label htmlFor="recipeServing">Servings</label>
              <input type="recipeServing" ref={ref => this.recipeServings = ref}/>
              <label htmlFor="recipeIngredients">Ingredients</label>
              <textarea name="recipeIngredients" ref={ref => this.recipeIngredients = ref}></textarea>
              <label htmlFor="recipeDirections">Directions</label>
              <textarea name="recipeDirections" ref={ref => this.recipeDirections = ref}></textarea>
                <input className="submit" type="submit" value="Add New Recipe" />
            </form>
          </section>
          <section className="recipes">
            <div className="wrapper">
              <div className="title">
                <h1>Summary</h1>
              </div>
            </div>
            <div>
              <ul className="summarySection">
                {this.state.recipes.map((item, index) => {
                  return (
                    <SummaryRecipe data={item} key={item.key} remove={this.removeRecipe}/>
                  )
                })}
                
              </ul>
            </div>
            <ul className="indRecipeSection">
              {this.state.recipes.map((item, index) =>{
                return(
                <IndRecipe data={item} key={item.key} remove={this.removeRecipe}/>
                
                )
              })}
            </ul>
          </section>
          <footer>
            <a className="credits" href="https://www.freepik.com/free-vector/sketchy-food-background_772953.htm">Background Designed by Freepik</a>
          </footer>
        </div>
      )
    }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {
      // console.log(response.val());
      const newState = [];
      const data = response.val();

      // console.log(`key`, dataArray);
      //push an object with the key as the days of the week and push the data
      for (let itemkey in data) {
        // console.log(itemkey)
        // console.log(data[itemkey])
        
        const newRecipe = data[itemkey];

        let newObject = {
          key: itemkey,
          recipe: newRecipe
        };
        // console.log(newObject.recipe);

        const filterRecipe = newObject.recipe

        for (let randomKey in filterRecipe) {
          console.log(randomKey);
          const recipeObject = filterRecipe[randomKey];
          // console.log(recipeObject)
          
          newObject = {
            key: randomKey,
            day: itemkey,
            recipeObject
          }
        }

        // console.log(newObject)
        newState.push(newObject)
        // console.log(newState)
        this.setState({
          recipes: newState
        })
      }
    });
  }
}



ReactDOM.render(<App />, document.getElementById('app'));
