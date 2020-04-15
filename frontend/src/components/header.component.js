import React from "react";

class HeaderComponent extends React.Component {
  render() {
    const title = this.props.title;
    const description = this.props.description;
    return (
      <div className="HeaderComponent">
        <header>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>
      </div>
    );
  }
}

export default HeaderComponent;
