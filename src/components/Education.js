import React, { Component } from "react";
import uniqid from "uniqid";

export default class Education extends Component {
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
        <h4 className="section-title">Education</h4>
        <hr />

        {names.map((name, index) => {
          if (!name.id) return null;
          if (index === 0) {
            return (
              <EducationField
                id={name.id}
                key={name.id}
                editingMode={false}
                handleDeleteClick={this.handleDeleteClick}
              />
            );
          }
          return (
            <EducationField
              id={name.id}
              key={name.id}
              editingMode={true}
              handleDeleteClick={this.handleDeleteClick}
            />
          );
        })}

        <p onClick={this.handleAddNameClick} className="add-name">
          &#43; Add Education
        </p>
      </div>
    );
  }
}

class EducationField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editingMode: props.editingMode,
      editingSchool: "",
      savedSchool: "",
      editingStartDate: "",
      savedStartDate: "",
      editingEndDate: "",
      savedEndDate: "",
      editingDegree: "",
      savedDegree: "",
      editingFieldOfStudy: "",
      savedFieldOfStudy: "",
    };
  }

  handleSchoolInputChange = (e) => {
    this.setState({ editingSchool: e.target.value });
  };

  handleStartDateInputChange = (e) => {
    this.setState({ editingStartDate: e.target.value });
  };

  handleEndDateInputChange = (e) => {
    this.setState({ editingEndDate: e.target.value });
  };

  handleDegreeInputChange = (e) => {
    this.setState({ editingDegree: e.target.value });
  };

  handleFieldOfStudyInputChange = (e) => {
    this.setState({ editingFieldOfStudy: e.target.value });
  };

  handleToggleEditingClick = () => {
    this.setState({ editingMode: !this.state.editingMode });
  };

  handleSaveClick = () => {
    this.handleToggleEditingClick();
    this.setState({
      savedSchool: this.state.editingSchool,
      savedDegree: this.state.editingDegree,
      savedFieldOfStudy: this.state.editingFieldOfStudy,
      savedStartDate: this.state.editingStartDate,
      savedEndDate: this.state.editingEndDate,
    });
  };

  handleCancelClick = () => {
    this.handleToggleEditingClick();
    this.setState({
      editingSchool: this.state.savedSchool,
      editingDegree: this.state.savedDegree,
      editingFieldOfStudy: this.state.savedFieldOfStudy,
      editingStartDate: this.state.savedStartDate,
      editingEndDate: this.state.savedEndDate,
    });
  };

  render() {
    const {
      editingMode,
      editingSchool,
      savedSchool,
      editingStartDate,
      savedStartDate,
      editingEndDate,
      savedEndDate,
      editingDegree,
      savedDegree,
      editingFieldOfStudy,
      savedFieldOfStudy,
    } = this.state;

    const { handleDeleteClick, id } = this.props;

    return (
      <div>
        {editingMode ? (
          <div className="form-group">
            <School
              editingSchool={editingSchool}
              handleInputChange={this.handleSchoolInputChange}
            />
            <Date
              editingStartDate={editingStartDate}
              handleStartDateChange={this.handleStartDateInputChange}
              editingEndDate={editingEndDate}
              handleEndDateChange={this.handleEndDateInputChange}
            />
            <Degree
              editingDegree={editingDegree}
              handleInputChange={this.handleDegreeInputChange}
            />
            <FieldOfStudy
              editingFieldOfStudy={editingFieldOfStudy}
              handleInputChange={this.handleFieldOfStudyInputChange}
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
            {/* DELETE BTN */}
            <button
              className="btn btn-outline-danger delete-icon"
              onClick={() => handleDeleteClick(id)}
            >
              <span>&times;</span>
            </button>
          </div>
        ) : (
          <div className="container-education">
            <div className="job-title">
              <p
                className="name job font-weight-bold"
                onClick={this.handleToggleEditingClick}
              >
                {savedSchool ? (
                  savedSchool
                ) : (
                  <mark className="font-weight-normal">School</mark>
                )}
              </p>
              <small className="name" onClick={this.handleToggleEditingClick}>
                {savedStartDate || savedEndDate
                  ? savedStartDate && savedEndDate
                    ? savedStartDate + " to " + savedEndDate
                    : savedStartDate || savedEndDate
                  : null}
              </small>
            </div>
            <p className="name" onClick={this.handleToggleEditingClick}>
              {savedDegree ? savedDegree : <mark>Degree</mark>}
            </p>
            <p className="name" onClick={this.handleToggleEditingClick}>
              {savedFieldOfStudy ? (
                savedFieldOfStudy
              ) : (
                <mark>Field of Study</mark>
              )}
            </p>
          </div>
        )}
      </div>
    );
  }
}

class School extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focus();
  }

  render() {
    const { editingSchool, handleInputChange } = this.props;
    return (
      <div>
        <label htmlFor="school">School</label>
        <input
          type="text"
          id="school"
          name="school"
          className="form-control"
          value={editingSchool}
          onChange={handleInputChange}
          ref={this.textInput}
        />
      </div>
    );
  }
}

const Date = ({
  editingStartDate,
  handleStartDateChange,
  editingEndDate,
  handleEndDateChange,
}) => {
  return (
    <div className="row">
      <div className="col">
        {/* START DATE */}
        <label htmlFor="start">Start Date:</label>
        <input
          type="month"
          id="start"
          name="start"
          className="form-control"
          min="2000-01"
          max="2020-12"
          value={editingStartDate}
          onChange={handleStartDateChange}
        />
      </div>
      <div className="col">
        {/* END DATE */}
        <label htmlFor="end">End Date:</label>
        <input
          type="month"
          id="end"
          name="end"
          className="form-control"
          min="2000-01"
          max="2020-12"
          value={editingEndDate}
          onChange={handleEndDateChange}
        />
      </div>
    </div>
  );
};

const Degree = ({ editingDegree, handleInputChange }) => {
  return (
    <div>
      <label htmlFor="degree">Degree</label>
      <input
        type="text"
        list="degree-options"
        id="degree"
        name="degree"
        className="form-control"
        value={editingDegree}
        onChange={handleInputChange}
      />
      <datalist id="degree-options">
        <option value="High School">High School</option>
        <option value="Bachelor's">Bachelor's</option>
        <option value="Master's">Master's</option>
        <option value="Doctorate">Doctorate</option>
        <option value="Other">Other</option>
      </datalist>
    </div>
  );
};

const FieldOfStudy = ({ editingFieldOfStudy, handleInputChange }) => {
  return (
    <div>
      <label htmlFor="fieldOfStudy">Field of Study</label>
      <input
        type="text"
        id="fieldOfStudy"
        name="fieldOfStudy"
        className="form-control"
        value={editingFieldOfStudy}
        onChange={handleInputChange}
      />
    </div>
  );
};
