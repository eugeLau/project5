import React from 'react';
import ReactDOM from 'react-dom';

const donuts = ['Sourcream Glazed', 'Honey Dip', 'Boston Cream'];

import Donut from './donut';
//4.import the Donut in order to put it in must do <Donut /> and delete h2 then add a props

//1. assume donuts has many many information ex// store, ingredients, images.. so we can refactor the map in the return .. lets say we want the donuts on the homepaage and also in the building page and other pages. You'll have to take the code and repeat it .. therefore we should create a component
{/* <div>
  {donuts.map(donut => {
    return (
      <h2>{donut}</h2>
    )
  })}
</div> */}
class App extends React.Component {
    render() {
      return (
        <div>
          <header>
            <h1>Donuts</h1>
          </header>
          {donuts.map(donut => {
            return (
              <Donut donutName={donut} />
            )
          })}
          <footer>
            <p>donuts &copy; 2017</p>
          </footer>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
