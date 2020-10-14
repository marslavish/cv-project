import React, { Component } from "react";
import uniqid from "uniqid";

export default class WorkExp extends Component {
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
        <h4 className="section-title">Work Experience</h4>
        <hr />

        {names.map((name, index) => {
          if (!name.id) return null;
          if (index === 0) {
            return (
              <WorkExpField
                id={name.id}
                key={name.id}
                editingMode={false}
                handleDeleteClick={this.handleDeleteClick}
              />
            );
          }
          return (
            <WorkExpField
              id={name.id}
              key={name.id}
              editingMode={true}
              handleDeleteClick={this.handleDeleteClick}
            />
          );
        })}

        <p onClick={this.handleAddNameClick} className="add-name">
          &#43; Add Work Experience
        </p>
      </div>
    );
  }
}

class WorkExpField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editingMode: props.editingMode,
      editingJobTitle: "",
      savedJobTitle: "",
      editingStartDate: "",
      savedStartDate: "",
      editingEndDate: "",
      savedEndDate: "",
      editingCompany: "",
      savedCompany: "",
      editingMainTasks: "",
      savedMainTasks: "",
    };
  }

  handleJobTitleInputChange = (e) => {
    this.setState({ editingJobTitle: e.target.value });
  };

  handleStartDateInputChange = (e) => {
    this.setState({ editingStartDate: e.target.value });
  };

  handleEndDateInputChange = (e) => {
    this.setState({ editingEndDate: e.target.value });
  };

  handleCompanyInputChange = (e) => {
    this.setState({ editingCompany: e.target.value });
  };

  handleMainTasksInputChange = (e) => {
    this.setState({ editingMainTasks: e.target.value });
  };

  handleToggleEditingClick = () => {
    this.setState({ editingMode: !this.state.editingMode });
  };

  handleSaveClick = () => {
    this.handleToggleEditingClick();
    this.setState({
      savedJobTitle: this.state.editingJobTitle,
      savedCompany: this.state.editingCompany,
      savedMainTasks: this.state.editingMainTasks,
      savedStartDate: this.state.editingStartDate,
      savedEndDate: this.state.editingEndDate,
    });
  };

  handleCancelClick = () => {
    this.handleToggleEditingClick();
    this.setState({
      editingJobTitle: this.state.savedJobTitle,
      editingCompany: this.state.savedCompany,
      editingMainTasks: this.state.savedMainTasks,
      editingStartDate: this.state.savedStartDate,
      editingEndDate: this.state.savedEndDate,
    });
  };

  render() {
    const {
      editingMode,
      editingJobTitle,
      savedJobTitle,
      editingStartDate,
      savedStartDate,
      editingEndDate,
      savedEndDate,
      editingCompany,
      savedCompany,
      editingMainTasks,
      savedMainTasks,
    } = this.state;

    const { handleDeleteClick, id } = this.props;

    return (
      <div>
        {editingMode ? (
          <div className="form-group">
            <JobTitle
              editingJobTitle={editingJobTitle}
              handleInputChange={this.handleJobTitleInputChange}
            />
            <Date
              editingStartDate={editingStartDate}
              handleStartDateChange={this.handleStartDateInputChange}
              editingEndDate={editingEndDate}
              handleEndDateChange={this.handleEndDateInputChange}
            />
            <Company
              editingCompany={editingCompany}
              handleInputChange={this.handleCompanyInputChange}
            />
            <MainTasks
              editingMainTasks={editingMainTasks}
              handleInputChange={this.handleMainTasksInputChange}
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
          <div className="container-work-exp">
            <div className="job-title">
              <p
                className="name job font-weight-bold"
                onClick={this.handleToggleEditingClick}
              >
                {savedJobTitle ? (
                  savedJobTitle
                ) : (
                  <mark className="font-weight-normal">Job Title</mark>
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
              {savedCompany ? savedCompany : <mark>Company</mark>}
            </p>
            <p className="name" onClick={this.handleToggleEditingClick}>
              {savedMainTasks ? savedMainTasks : <mark>Main Tasks</mark>}
            </p>
          </div>
        )}
      </div>
    );
  }
}

class JobTitle extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focus();
  }

  render() {
    const { editingJobTitle, handleInputChange } = this.props;
    return (
      <div>
        <label htmlFor="jobTitle">Job Title</label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          className="form-control"
          value={editingJobTitle}
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

const Company = ({ editingCompany, handleInputChange }) => {
  return (
    <div>
      <label htmlFor="company">Company</label>
      <input
        type="text"
        id="company"
        name="company"
        className="form-control"
        value={editingCompany}
        onChange={handleInputChange}
      />
    </div>
  );
};

const MainTasks = ({ editingMainTasks, handleInputChange }) => {
  return (
    <div>
      <label htmlFor="mainTasks">Main Tasks</label>
      <input
        type="text"
        id="mainTasks"
        name="mainTasks"
        className="form-control"
        value={editingMainTasks}
        onChange={handleInputChange}
      />
    </div>
  );
};
