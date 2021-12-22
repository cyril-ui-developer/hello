question submit

  handleSubmit = (e) => {
    e.preventDefault();
    const { authedUser } = this.props;
    const question = {
      optionOneText:  this.state.optionOne,
      optionTwoText:  this.state.optionTwo,
      author: authedUser.user,
    };
    this.props.dispatch(
      handleSaveQuestion(
        question
      )
    );
  };

question action
export function handleSaveQuestion(question) {
  console.log("question", question)
  return (dispatch) => {
    _saveQuestion(question).then((question) => dispatch(saveQuestion(question)));
  };
}

question reducer 
      case SAVE_QUESTION:
          const { question } = action;
          return { ...state, [question.id]: question };

