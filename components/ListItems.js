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
      <ul className="pl-2">
        {this.props.items.map((song, i) => (
          <li
            className="d-flex justify-content-between w-100"
            onMouseEnter={e => this.hovered()}
            key={i}
          >
            {song}
            <a href="" onClick={e => this.removeItem()}>
              Remove
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

export default ListItem;
