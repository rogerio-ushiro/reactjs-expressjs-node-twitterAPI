import React from "react";

class InputSearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.updateKeyword = this.updateKeyword.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.state = { disabledToSearch: false };
  }

  updateKeyword(e) {
    this.props.onInputChange(this.inputRef.current.value);
    this.setState({ disabledToSearch: false });
  }

  doSearch(e) {
    this.props.doSearchClick(this.inputRef.current.value);
    this.setState({ disabledToSearch: true });
  }

  render() {
    return (
      <div className="InputSearchComponent form-inline">
        <div className="md-form form-lg">
          <input
            type="text"
            id="inputSearch"
            autoComplete="off"
            className="form-control form-control-lg"
            ref={this.inputRef}
            onChange={this.updateKeyword}
          />
          <label htmlFor="inputSearch">Search</label>
        </div>
        <button type="button" onClick={this.doSearch} ref={this.buttonRef} disabled={this.state.disabledToSearch} className="btn btn-primary btn-md mt-0">
          Search
          </button>
      </div>
    );
  }
}

export default InputSearchComponent;
