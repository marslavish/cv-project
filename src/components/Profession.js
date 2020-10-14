import React, { Component } from "react";

export default class NameField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingMode: false,
      editingName: "",
      savedName: "",
    };
    this.textInput = React.createRef();
  }

  componentDidUpdate() {
    if (this.state.editingMode) this.textInput.focus();
  }

  handleInputChange = (e) => {
    this.setState({ editingName: e.target.value });
  };

  handleToggleEditingClick = () => {
    this.setState({ editingMode: !this.state.editingMode });
  };

  handleSaveClick = () => {
    this.handleToggleEditingClick();
    this.setState({ savedName: this.state.editingName });
  };

  handleCancelClick = () => {
    this.handleToggleEditingClick();
    this.setState({ editingName: this.state.savedName });
  };

  render() {
    const { editingMode, editingName, savedName } = this.state;

    return (
      <div>
        {editingMode ? (
          <div className="form-group">
            <label htmlFor="name">Profession</label>
            <input
              type="text"
              id="name"
              name="username"
              className="form-control"
              value={editingName}
              onChange={this.handleInputChange}
              autoComplete="false"
              ref={(input) => (this.textInput = input)}
            />
            {/* SAVE BTN */}
            <button
              onClick={this.handleSaveClick}
              className="btn btn-primary"
              disabled={!editingName}
            >
              Save
            </button>
            {/* CANCEL BTN */}
            <button
              onClick={this.handleCancelClick}
              className="btn btn-outline-primary"
            >
              Cancel
            </button>
          </div>
        ) : (
          <p
            className="name text-uppercase font-weight-light"
            onClick={this.handleToggleEditingClick}
          >
            {savedName ? (
              savedName
            ) : (
              <mark className="text-capitalize font-weight-normal">
                Profession
              </mark>
            )}
          </p>
        )}
      </div>
    );
  }
}
