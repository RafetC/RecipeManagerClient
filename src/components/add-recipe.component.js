import React, { Component } from "react";
import RecipeDataService from "../services/recipe.service";
export default class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.onCookingInstruction = this.onCookingInstruction.bind(this);
    this.onDishType = this.onDishType.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.onIngredients=this.onIngredients.bind(this);
    this.onPortionSize=this.onPortionSize.bind(this);
      this.onDishName=this.onDishName.bind(this);
 
    this.newRecipe = this.newRecipe.bind(this);
    this.state = {
      id: null,
      cookingInstructions: "",
      dishType: "", 
      ingredients:null,
      portionSize:0,
      dishName:"",
      published: false,
      submitted: false
      
    };

     
  }
  onCookingInstruction(e) {
    this.setState({
        cookingInstructions: e.target.value
    });
  }
  onDishType(e) {
    this.setState({
        dishType: e.target.value
    });
    
  }

  onDishName(e) {
    this.setState({
        dishName: e.target.value
    });
  }
  onIngredients(e) {
    this.setState({
         
        ingredients: e.target.value.split(',')
    });
  }
  onPortionSize(e) {
    this.setState({
        portionSize: e.target.value
    });
  }

 
  
  saveRecipe() {
    var data = {
        cookingInstructions: this.state.cookingInstructions,
        dishType: this.state.dishType,
        ingredients: this.state.ingredients,
        portionSize: this.state.portionSize,
        dishName:this.state.dishName

    };
    RecipeDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          cookingInstructions: response.data.cookingInstructions,
          createDate: response.data.createDate,
          dishType: response.data.dishType,
          ingredients: response.data.ingredients,
          portionSize: response.data.portionSize,
          dishName: response.data.dishName,

          submitted: true
        });
        console.log(response.data);
      }
      
      )
      .catch(e => {
           console.log(e);
        alert(e.response.data.message);
      });
  }
  newRecipe() {
    this.setState({
        id: null,
          cookingInstructions: "",
          createDate: "",
          dishType: "",
          dishName: "",
          ingredients: "",
          portionSize: "",
      published: false,
      submitted: false
    });
  }
  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newRecipe}>
                Add
              </button>
            </div>
          ) : (
            <div>
                   <div className="form-group">
                <label htmlFor="dishName">Dish Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="dishname"
                  required
                 value={this.state.dishName}
                  onChange={this.onDishName}
                  name="dishname"
                />
              </div>
              <div className="form-group">
                <label htmlFor="cookinstruction">Cooking Instruction</label>
                <input
                  type="text"
                  className="form-control"
                  id="cookinstruction"
                  required
                 value={this.state.cookingInstructions}
                 onChange={this.onCookingInstruction}
                  name="cookinstruction"
                />
              </div>
              <div className="form-group">
                <label htmlFor="dishtype">Dish Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="dishtype"
                  required
                  value={this.state.dishType}
                  onChange={this.onDishType}
                  name="dishtype"
                />
              </div>
              <div className="form-group">
                <label htmlFor="ingredients">Ingredients</label>
                <input
                  type="text"
                  className="form-control"
                  id="ingredients"
                  required
                  value={this.state.ingredients}
                  onChange={this.onIngredients}
                  name="ingredients"
                />
              </div>
           
              <div className="form-group">
                <label htmlFor="portionsize">Portion Size</label>
                <input
                  type="text"
                  className="form-control"
                  id="portionsize"
                  required
                  value={this.state.portionSize}
                  onChange={this.onPortionSize}
                  name="portionsize"
                />
              </div>
            
           
              <button onClick={this.saveRecipe} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
  }
}
