import React, { Component } from "react";
import uniqid from "uniqid";

class SkillsField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editingMode: props.editingMode,
      editingName: "",
      savedName: "",
      editingYears: "",
      savedYears: "",
    };
    this.textInput = React.createRef();
  }

  componentDidMount() {
    if (this.state.editingMode) this.textInput.focus();
  }

  componentDidUpdate() {
    if (this.state.editingMode) this.textInput.focus();
  }

  handleSkillInputChange = (e) => {
    this.setState({ editingName: e.target.value });
  };

  handleYearsInputChange = (e) => {
    this.setState({ editingYears: e.target.value });
  };

  handleToggleEditingClick = () => {
    this.setState({ editingMode: !this.state.editingMode });
  };

  handleSaveClick = () => {
    this.handleToggleEditingClick();
    this.setState({
      savedName: this.state.editingName,
      savedYears: this.state.editingYears,
    });
  };

  handleCancelClick = () => {
    this.handleToggleEditingClick();
    this.setState({
      editingName: this.state.savedName,
      editingYears: this.state.savedYears,
    });
  };

  render() {
    const {
      editingMode,
      editingName,
      savedName,
      editingYears,
      savedYears,
    } = this.state;
    const { handleDeleteClick, id } = this.props;

    return (
      <div>
        {editingMode ? (
          <div className="form-group">
            <div className="row">
              <div className="col-7">
                <label htmlFor="name">Skill</label>
                <input
                  type="text"
                  id="name"
                  name="username"
                  className="form-control"
                  value={editingName}
                  onChange={this.handleSkillInputChange}
                  ref={(input) => (this.textInput = input)}
                />
              </div>
              <div className="col-5">
                <label htmlFor="years">Years of Experience</label>
                <select
                  name="years"
                  id="years"
                  className="form-control"
                  value={editingYears}
                  onChange={this.handleYearsInputChange}
                >
                  <option value="">-----</option>
                  <option value="1 year">1 year</option>
                  <option value="2 years">2 years</option>
                  <option value="3 years">3 years</option>
                  <option value="4 years">4 years</option>
                  <option value="5 years">5+ years</option>
                </select>
              </div>
            </div>
            {/* SAVE BTN */}
            <button
              onClick={this.handleSaveClick}
              className="btn btn-primary"
              disabled={!editingName && !editingYears}
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
            {/* DELETE BTN */}
            <button
              className="btn btn-outline-danger delete-icon"
              onClick={() => handleDeleteClick(id)}
            >
              <span>&times;</span>
            </button>
          </div>
        ) : (
          <p
            className="name container-skills"
            onClick={this.handleToggleEditingClick}
          >
            {savedName ? (
              savedYears ? (
                savedName + " - " + savedYears
              ) : (
                <span>
                  {savedName} - <mark>Years of Experience</mark>
                </span>
              )
            ) : savedYears ? (
              <span>
                <mark>Skill</mark> - {savedYears}
              </span>
            ) : (
              <span>
                <mark>Skill</mark>
              </span>
            )}
          </p>
        )}
      </div>
    );
  }
}

export default class Skills extends Component {
  constructor() {
    super();
    this.state = {
      names: [],
    };
  }

  componentDidMount() {
    this.setState({
      names: [{ id: uniqid() }],
    });
  }

  handleAddNameClick = () => {
    this.setState({
      names: [...this.state.names, { id: uniqid() }],
    });
  };

  handleDeleteClick = (id) => {
    this.setState((prevState) => ({
      names: prevState.names.map((name) => {
        if (name.id === id) name.id = "";
        return name;
      }),
    }));
  };

  render() {
    const { names } = this.state;

    return (
      <div>
        <h4 className="section-title">Skills</h4>
        <hr />

        {names.map((name, index) => {
          if (!name.id) return null;
          if (index === 0) {
            return (
              <SkillsField
                id={name.id}
                key={name.id}
                editingMode={false}
                handleDeleteClick={this.handleDeleteClick}
              />
            );
          }
          return (
            <SkillsField
              id={name.id}
              key={name.id}
              editingMode={true}
              handleDeleteClick={this.handleDeleteClick}
            />
          );
        })}

        <p onClick={this.handleAddNameClick} className="add-name">
          &#43; Add Skills
        </p>
      </div>
    );
  }
}
