import React from "react";
import { addGenre, addSong, addArtist, deleteGenre, deleteSong, deleteArtist } from "../store/actions/preferenceActions";
class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  hovered = e => {
    e.preventDefault();
    console.log("nha");
  };
  removeItem = e => {
    e.preventDefault();
    console.log("nha");
  };
  render() {
    return (
        <ul className="list-items pl-2">
          {this.props.items.map((item) => (
            <li
              className="d-flex py-1 justify-content-between w-100 item"
              onMouseEnter={e => this.hovered(e)}
              key={item.artist ? item.artist : item}
            >
              {item}
              <a href="" onClick={e => this.removeItem(e)}>
              <i className="fas fa-trash-alt"></i> Remove
              </a>
            </li>
          ))} 
        </ul>
    );
  }
}

export default ListItem;
