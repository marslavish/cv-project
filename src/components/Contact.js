import React, { Component } from "react";

export default class NameField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingMode: false,
      editingLocation: "",
      savedLocation: "",
      editingPhone: "",
      savedPhone: "",
      editingEmail: "",
      savedEmail: "",
    };
    // this.textInput = React.createRef();
  }

  handleLocationInputChange = (e) => {
    this.setState({ editingLocation: e.target.value });
  };

  handlePhoneInputChange = (e) => {
    this.setState({ editingPhone: e.target.value });
  };

  handleEmailInputChange = (e) => {
    this.setState({ editingEmail: e.target.value });
  };

  handleToggleEditingClick = () => {
    this.setState({ editingMode: !this.state.editingMode });
  };

  handleSaveClick = () => {
    this.handleToggleEditingClick();
    this.setState({
      savedLocation: this.state.editingLocation,
      savedPhone: this.state.editingPhone,
      savedEmail: this.state.editingEmail,
    });
  };

  handleCancelClick = () => {
    this.handleToggleEditingClick();
    this.setState({
      editingLocation: this.state.savedLocation,
      editingPhone: this.state.savedPhone,
      editingEmail: this.state.savedEmail,
    });
  };

  render() {
    const {
      editingMode,
      editingLocation,
      savedLocation,
      editingPhone,
      savedPhone,
      editingEmail,
      savedEmail,
    } = this.state;

    return (
      <div className="container-contact">
        {editingMode ? (
          <div className="form-group">
            <Location
              editingLocation={editingLocation}
              handleInputChange={this.handleLocationInputChange}
            />
            <Phone
              editingPhone={editingPhone}
              handleInputChange={this.handlePhoneInputChange}
            />
            <Email
              editingEmail={editingEmail}
              handleInputChange={this.handleEmailInputChange}
            />
            {/* SAVE BTN */}
            <button onClick={this.handleSaveClick} className="btn btn-primary">
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
          <div>
            <p className="name" onClick={this.handleToggleEditingClick}>
              {savedLocation ? savedLocation : <mark>Location</mark>}
            </p>
            <p className="name" onClick={this.handleToggleEditingClick}>
              {savedPhone ? savedPhone : <mark>Phone number</mark>}
            </p>
            <p className="name" onClick={this.handleToggleEditingClick}>
              {savedEmail ? savedEmail : <mark>Email address</mark>}
            </p>
          </div>
        )}
      </div>
    );
  }
}

class Location extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focus();
  }

  render() {
    const { editingLocation, handleInputChange } = this.props;
    return (
      <div>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          className="form-control"
          value={editingLocation}
          onChange={handleInputChange}
          ref={this.textInput}
        />
      </div>
    );
  }
}

const Phone = ({ editingPhone, handleInputChange }) => {
  return (
    <div>
      <label htmlFor="phone">Phone</label>
      <input
        type="text"
        id="phone"
        name="phone"
        className="form-control"
        value={editingPhone}
        onChange={handleInputChange}
      />
    </div>
  );
};

const Email = ({ editingEmail, handleInputChange }) => {
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        className="form-control"
        value={editingEmail}
        onChange={handleInputChange}
      />
    </div>
  );
};
