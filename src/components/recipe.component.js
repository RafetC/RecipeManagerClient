import React, { Component } from "react";
import RecipeDataService from "../services/recipe.service";
export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeDishName = this.onChangeDishName.bind(this);
    this.onChangeInstruction = this.onChangeInstruction.bind(this);
    this.onChangeDishType = this.onChangeDishType.bind(this);
    this.onChangePortionSize = this.onChangePortionSize.bind(this);

    this.getTutorial = this.getTutorial.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);
    this.state = {
      currentTutorial: {
        id: null,
      cookingInstructions: "",
      dishType: "", 
      ingredients:null,
      portionSize:0,
      dishName:"",
        published: false
      },
      message: ""
    };
  }
  componentDidMount() {
    this.getTutorial(this.props.match.params.id);
  }
  onChangeDishName(e) {
    const dishName = e.target.value;
    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          dishName: dishName
        }
      };
    });
  }
  onChangeInstruction(e) {
    const cookingInstructions = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        cookingInstructions: cookingInstructions
      }
    }));
  }
  onChangeDishType(e) {
    const dishType = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        dishType: dishType
      }
    }));
  }
  onChangePortionSize(e) {
    const portionSize = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        portionSize: portionSize
      }
    }));
  }
  getTutorial(id) {
    RecipeDataService.get(id)
      .then(response => {
        this.setState({
          currentTutorial: response.data[0]
        });
      
      })
      .catch(e => {
        console.log(e);
      });
  }
  updatePublished(status) {
    var data = {
      id: this.state.currentTutorial.id,
      dishName: this.state.currentTutorial.dishName,
      cookingInstructions: this.state.currentTutorial.cookingInstructions,
      createDate: this.state.currentTutorial.createDate,
      dishType: this.state.currentTutorial.dishType,
      ingredients: this.state.currentTutorial.ingredients,
      portionSize: this.state.currentTutorial.portionSize,
      published: status
 


    };
    RecipeDataService.update(this.state.currentTutorial.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status
          }
        }));
        
        console.log(response.data);
      })
      .catch(e => {
        alert(e.response.data.message);
        console.log(e);
      });
  }
  updateTutorial() {
    RecipeDataService.update(
      this.state.currentTutorial
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The tutorial was updated successfully!"
        });
      })
      .catch(e => {
        alert(e.response.data.message);
        console.log(e);
      });
  }
  deleteTutorial() {    
    RecipeDataService.delete(this.state.currentTutorial.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/recipes')
      })
      .catch(e => {
        alert(e.response.data.message);
        console.log(e);
      });
  }
  render() {
    const { currentTutorial } = this.state;
    return (
      <div>
        {currentTutorial ? (
          <div className="edit-form">
            <h4>Recipe</h4>
            <form>
              <div className="form-group">
                <label htmlFor="dishname">Dish Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTutorial.dishName}
                  onChange={this.onChangeDishName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cookingInstructions">Cooking Instructions</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTutorial.cookingInstructions}
                  onChange={this.onChangeInstruction}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dishtype">Dish Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTutorial.dishType}
                  onChange={this.onChangeDishType}
                />
              </div>
              <div className="form-group">
                <label htmlFor="portionsize">Portion Size</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTutorial.portionSize}
                  onChange={this.onChangePortionSize}
                />
              </div>
          
            </form>
 
            <button
              className="badge alert-danger mr-2"
              onClick={this.deleteTutorial}
            >
              Delete
            </button>
            <button
              type="submit"
              className="badge alert-success"
              onClick={this.updateTutorial}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Recipe...</p>
          </div>
        )}
      </div>
    );
  }
}