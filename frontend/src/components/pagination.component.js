import React from "react";

class PaginationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }
  previous() {this.props.changePageParent(this.props.currentIndex - 1);}
  next() {this.props.changePageParent(this.props.currentIndex + 1);}

  render() {
    return (
      <div className="PaginationComponent d-flex flex-row-reverse">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item"><button type="button" className="page-link" onClick={this.previous}> Previous </button></li>
            {this.createTable(this.props.pages, this.props.currentIndex)}
            <li className="page-item"><button type="button" className="page-link" onClick={this.next}> Next </button></li>
          </ul>
        </nav>
      </div>
    );
  }

  createTable = (number, currentIndex) => {
    let table = [];
    for (let i = 0; i < number; i++) {
      table.push(<li key={i} className={(currentIndex === i) ? "paginate_button page-item active" : "paginate_button page-item"}><button type="button" className="page-link" > {(i + 1)} </button></li>);
    }
    return table
  }

}

export default PaginationComponent;
