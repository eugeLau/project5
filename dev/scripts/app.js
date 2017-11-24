import React from 'react';
import ReactDOM from 'react-dom';
import IndRecipe from './recipe';

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
    // const newDay = day
    // newDay.push(day)
    
    this.setState({
      selectaday: day
    });
    // const dbRef = firebase.database().ref(this.state.selectaday);
    // dbRef.push(day);
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

    const dbRef = firebase.database().ref(this.state.selectaday);
    dbRef.push(recipe);
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
              <h2>{this.state.selectaday}</h2>
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
          <ul>
            {/* {this.state.selectaday} */}
            <li>
              <h3>Friday</h3>
                {this.state.recipes.map((item, index) =>{
                  return(
                  <IndRecipe data={item} key={index}/>
                    // <li key={index}>
                    //   {item}
                    // </li>
                  )
                })}
            </li>
            {/* <li>
              <h3>Tuesday</h3>
                {this.state.recipes.map((item, index) => {
                  return (
                    <IndRecipe data={item} key={index} />
                    // <li key={index}>
                    //   {item}
                    // </li>
                  )
                })}
            </li> */}
          </ul>
          </section>
        </div>
      )
    }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {
      console.log(response.val());
      const newState = [];
      const data = response.val();

      //pus an object with the key as the days of the week and push the data
      for (let key in data) {
        console.log(key)
        // newState.push({
        //   [key]: data[key]
        // });
        const newRecipe = data[key];

        let newObject = {
          key: key,
          recipe: newRecipe
        };
        console.log(newObject.recipe);

        const filterRecipe = newObject.recipe

        for (let randomKey in filterRecipe) {
          // console.log(randomKey);
          const recipeObject = filterRecipe[randomKey];
          // const recipeObject = Object.values(filterRecipe)
          console.log(recipeObject)
          
          newObject = {
            day: key,
            recipeObject
          }
          
        }

        console.log(newObject)
        newState.push(newObject)
        this.setState({
          recipes: newState
        })


        // {
        //   Friday: {
        //     -kdfadsjlfa: {},
        //     -fjlksjdfl: {}
        //   }
        // }

        
        // {
        //   day: Friday:
        //   recipe: []
        // }



        // const newKey = Object.keys(data[key]);
        // console.log(data[key]);
        // console.log(data[key]);
        // 


        // const mealDay = key;
        // console.log(mealDay);
        // if (mealDay === this.state.selectaday) {
        //   return (
        //     this.setState({
        //     recipes: newState
        //     })
        //   )
        // }
        
      }
      // console.log(this.state)
      // newState.push(response.val());

      // console.log(newState);

      // this.setState({
      //   recipes: newState
      // })
      // console.log(recipes);
    });
  }
}



ReactDOM.render(<App />, document.getElementById('app'));
