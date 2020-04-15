import React from "react";
import PaginationComponent from "./pagination.component";
import FormatDate from "../utils/formatDate";
import Statistics from "../utils/statistics";

import Export from "../utils/exportCSV";

class ResultTableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.downloadCSV = this.downloadCSV.bind(this);
    this.state = { word: "", tweets: [], pages: [], currentPage: [], repeated: [], areRT: "", };
  }

  render() {
    return (this.state.pages.length > 0) ? 
      <div className="ResultTable">
        <p>{this.state.tweets.length} result(s) of limit defined as 50.</p>
        {this.state.repeated.map((element, i) => {
          return (<div key={i} >{element}</div>)
        })}
        <p>{this.state.areRT}</p>
        <h1>{this.state.word}</h1>
        <PaginationComponent pages={this.state.pages.length} currentIndex={this.state.currentIndex} changePageParent={this.changePageParent} />
        <table id="dtBasicExample" className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
          <thead><TH /></thead>
          <tbody>
            {this.state.currentPage.length > 0 ? this.state.currentPage.map((tweet, i) => {
              return (
                <tr key={i} >
                  <td><img alt="photo_profile" src={tweet.profile_image} /></td>
                  <td>{tweet.user}</td>
                  <td>{tweet.location ? tweet.location : " - "}</td>
                  <td>{new FormatDate(new Date(tweet.created_at)).getMonthNameShort()}</td>
                  <td>{tweet.text}</td>
                </tr>
              )
            }) : null}
          </tbody>
          <tfoot><TH /></tfoot>
        </table>
        <button type="button" class="btn btn-primary" onClick={this.downloadCSV}>download result as CSV</button>
        <PaginationComponent pages={this.state.pages.length} currentIndex={this.state.currentIndex} changePageParent={this.changePageParent} />
      </div >
     : null;
  }

  downloadCSV() {
    try {
      Export.export(this.state.pages);
    } catch (error) {
      console.error(error)
    }
  }

  changePageParent = (n) => {
    if (n > -1 && n < this.state.pages.length)
      this.setState({ currentPage: this.state.pages[n], currentIndex: n });
    this.forceUpdate();
  }

  loadData(tweets, pages) {
    this.setState({ tweets: tweets, pages: pages, currentPage: pages[0], currentIndex: 0 });
    var createdDates = [];
    this.state.tweets.forEach(element => {
      createdDates.push(new FormatDate(new Date(element.created_at)).getMonthNameShort())
    });
    this.statsByDate(createdDates);
    this.statsByRT(this.state.tweets);
    this.forceUpdate();
  }

  statsByRT(array_elements) { this.setState({ areRT: Statistics.percentageOfRT(array_elements) }); }
  statsByDate(array_elements) { this.setState({ repeated: Statistics.countByDate(array_elements) }); }

}

const TH = () => {
  return (
    <tr>
      <th className="th-sm">profile</th>
      <th className="th-sm">user</th>
      <th className="th-sm">location</th>
      <th className="th-sm">created</th>
      <th className="th-sm">tweet</th>
    </tr>
  );
}

export default ResultTableComponent;
