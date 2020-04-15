import React from "react";
import axios from "axios";
import HeaderComponent from "../src/components/header.component";
import InputSearchComponent from "../src/components/input.search.component";
import ResultTableComponent from "../src/components/result.table.component";
import "./App.css";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleInputSearch = this.handleInputSearch.bind(this);
    this.resultsRef = React.createRef();
    this.state = { keyword: "", tweets: [], pages: [] };
  }

  handleInputSearch = (e) => {
    this.setState({ keyword: e })
  };
  doSearchClick = () => {
    if (this.state.keyword) {
      this.setState({ tweets: [] });
      this.getTweets(this.state.keyword);
    }
  }

  render() {
    return (
      <div>
        <div className="App container">
          <HeaderComponent
            title="Mockup for TwitterAPI"
            description="ReactJS + ExpressJS + NodeJS + TwitterAPI"
          />
          <InputSearchComponent onInputChange={this.handleInputSearch} doSearchClick={this.doSearchClick} />
        </div>
        <div className="resultArea">
          <div className="container">
            <ResultTableComponent ref={this.resultsRef} />
          </div>
        </div>
      </div>
    )
  }

  async getTweets(keyword) {
    const limit = 50;
    if (keyword.length > 0)
      try {
        var pages = [];
        var page = [];
        var index = 0;

        (await axios.get("http://localhost:4000/q=" + keyword + "&count=" + limit)).data.forEach(element => {
          if (index > 0 && index % 10 === 0) {
            pages.push(page);
            page = [];
          }
          index++;
          page.push(element);
        });
        pages.push(page);
        this.setState({ pages: pages });
        this.setState({ tweets: pages[0] });
        this.resultsRef.current.loadData(this.state.tweets, this.state.pages);
      } catch (error) {
        console.error(error);
      }
  }

}
