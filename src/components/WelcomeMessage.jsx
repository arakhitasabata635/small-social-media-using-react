

const WelcomeMessage = ({onGetPostClicked}) => {

  return (
    <center className="Welcome-message">
      <h1>There are no posts</h1>
      <button
        type="button"
        onClick={onGetPostClicked}
        className="btn btn-primary"
      >
        Get Post From Server
      </button>
    </center>
  );
};

export default WelcomeMessage;
