import React, { Component } from "react";
import RecipeList from "../components/RecipeList";
import Search from "../components/Search";
import { recipeData } from "../data/tempList";

export default class Recipes extends Component {
  
  state = {
    recipes: recipeData,
    search: ""
  };

  url = "https://api.edamam.com/search";
  lastSearch = "";

  transformData(data){
    return data.hits.map(hit => ({
      publisher: hit.recipe.source,
      title: hit.recipe.label,
      source_url: hit.recipe.url,
      recipe_id: hit.recipe.uri.match(/recipe_.*/g),
      image_url: hit.recipe.image
    }));
  }

  handleChange = event => {
    this.setState({
      search: event.target.value
    });
  };
  
  handleSubmit = async (event) => {
    event.preventDefault();
    let url = this.url + `?q="${this.state.search}"&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`;
    if(url !== this.lastSearch){
      this.lastSearch = url;
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        this.setState({
          recipes: this.transformData(data)
        });
      } catch (error) {
        console.log(error);
      }
    }

  };
  
  render() {
    return (
      <React.Fragment>
        <Search
          search={this.state.search}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <RecipeList recipes={this.state.recipes} />
      </React.Fragment>
    );
  }
}
