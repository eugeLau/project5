import React from 'react';

//2.this is one way to make a component -- must have a render
//props are like arguments -- it can be accessed somewhere else
class Donut extends React.Component{
    render() {
        return(
            <h2>{this.props.donutName}</h2>
        )
    }
}

//3.export this Donut component, once enter export this turns from Donut component into a module file
//default it's the only thing we are exporting 
//only one default per module but can export more 
export default Donut;