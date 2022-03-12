import React, { Component } from "react";
import RecipeDataService from "../services/recipe.service";
import { Link } from "react-router-dom";
 
export default class RecipesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveRecipes = this.retrieveRecipes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveRecipe = this.setActiveRecipe.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.state = {
      Recipes: [],
      currentRecipe: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }
  componentDidMount() {
    this.retrieveRecipes();
  }
  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle
    });
  }
  retrieveRecipes() {
    RecipeDataService.getAll()
      .then(response => {
        this.setState({
          Recipes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e.response.data.message);
        console.log(e);
      });
  }
  refreshList() {
    this.retrieveRecipes();
    this.setState({
      currentRecipe: null,
      currentIndex: -1
    });
  }
  setActiveRecipe(Recipe, index) {
    this.setState({
      currentRecipe: Recipe,
      currentIndex: index
    });
  }

  searchTitle() {
    RecipeDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          Recipes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e.response.data.message);
        console.log(e);
      });
  }
  render() {
    const { searchTitle, Recipes, currentRecipe, currentIndex } = this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Cooking Instruction"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Recipe List</h4>
          <ul className="list-group">
            {Recipes &&
              Recipes.map((Recipe, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveRecipe(Recipe, index)}
                  key={index}
                >
                  {Recipe.id} - {Recipe.dishName}
                </li>
              ))}
          </ul>
          
        </div>
        <div className="col-md-6">
          {currentRecipe ? (
            <div>
              <h4>Recipe</h4>
              <div>
                <label>
                  <strong>Recipe ID:</strong>
                </label>{" "}
                {currentRecipe.id}
              </div>
              <div>
                <label>
                  <strong>Dish Name:</strong>
                </label>{" "}
                {currentRecipe.dishName}
              </div>
              <div>
                <label>
                  <strong>Dish Type:</strong>
                </label>{" "}
                {currentRecipe.dishType}
              </div>
              <div>
                <label>
                  <strong>Ingredients :</strong>
                </label>{" "}
                {currentRecipe.ingredients}
              </div>
              <div>
                <label>
                  <strong>Portion Size :</strong>
                </label>{" "}
                {currentRecipe.portionSize}
              </div>
              <div>
                <label>
                  <strong>Cooking Instructions :</strong>
                </label>{" "}
                {currentRecipe.cookingInstructions}
              </div>
              <div>
                <label>
                  <strong>Created Date :</strong>
                </label>{" "}
                {currentRecipe.createDate}
              </div>
              <Link
                to={"/recipes/" + currentRecipe.id}
                className="badge alert-warning">
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Recipe...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}