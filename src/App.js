import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddRecipe from "./components/add-recipe.component";
import Recipe from "./components/recipe.component";
import RecipeList from "./components/recipe-list.component";
class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/recipes" className="navbar-brand">
            Recipe Platform
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/recipes"} className="nav-link">
                Recipe List
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Recipe
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/recipes"]} component={RecipeList} />
            <Route exact path="/add" component={AddRecipe} />
            <Route path="/recipes/:id" component={Recipe} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;