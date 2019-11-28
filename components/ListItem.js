import React from "react";

class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  hovered = event => {
    console.log("nha");
  };
  removeItem = event => {
    console.log("nha");
  };
  render() {
    return (
      <li
        className="d-flex justify-content-between w-100"
        onMouseEnter={e => this.hovered()}
      >
        {this.props.item}
        <a href="" onClick={e => this.removeItem()}>
          Remove
        </a>
      </li>
    );
  }
}

export default ListItem;
