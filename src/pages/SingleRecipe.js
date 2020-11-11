import React, { Component } from 'react'

export default class SingleRecipe extends Component {

    url = "https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23";
    isThereData = false;

    constructor(props){
        super(props);
        this.state = {
            url: '',
            imageUrl: '',
            ingredients: [],
            publisher: '',
            sourceUrl: '',
            title: '',
            calories: '',
            isThereData: false
        }
    }

    componentDidMount(){
        let url = this.url + `${this.props.match.params.id}&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`;
        this.callApi(url);
    }

    callApi = async (url) => {    
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            return data.map(item => {
                this.setState ({
                    url: item.shareAs,
                    imageUrl: item.image,
                    ingredients: item.ingredientLines,
                    publisher: item.source,
                    sourceUrl: item.url,
                    title: item.label,
                    calories: item.calories,
                    isThereData: true
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {

        if(!this.state.isThereData){
            return (
                <div className="container d-flex py-5 justify-content-center align-items-center">
                    <div className="loader"></div>  
                </div>
            )
        } else {
            const ingredients = this.state.ingredients.map(
                item => <li key={item}>{item}</li>
            );
            return (
                <div className="container d-flex flex-column py-5 align-items-center">
                    <h2 className="text-slanted">{this.state.title}</h2>
                    <img src={this.state.imageUrl} 
                    className="my-5"
                    style={{ display: "block", 
                             boxShadow: "3px 3px 10px black",
                             borderRadius: "3px" }} 
                    alt="food">

                    </img>
                    <div>
                        <p>Publisher : {this.state.publisher} </p>
                    </div>
                    <div className="d-flex flex-column">
                        <a href={this.state.url}>Go to Edamam article</a>
                        <a href={this.state.sourceUrl}>Source</a>
                    </div>
                    <div className="mt-3">
                        <p>Calories : {this.state.calories}</p>
                    </div>
                    <div className="">
                        <h4>Ingredients</h4>
                        <ul>
                            {ingredients}
                        </ul>
                    </div>
                </div>
            )
        }
    }
}
