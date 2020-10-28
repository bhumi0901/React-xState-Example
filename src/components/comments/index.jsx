import React, { useContext, useEffect, Fragment } from "react";
import { MachineContext } from "state";

function Comments(props) {
  const [machine, sendToMachine] = useContext(MachineContext);

  const { error, comments, story } = machine.context;

  useEffect(() => {
    sendToMachine("LOAD_COMMENTS", { storyId: props.match.params.storyId });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      {machine.matches("comments.loading") && <h2>Loading...</h2>}
      {machine.matches("comments.fail") && (
        <div style={{ color: "red" }}>
          Error loading stories: {error.toString()}
        </div>
      )}
      {machine.matches("comments.success") && (
        <div className="story-item-container">
          <button onClick={() => props.history.goBack()}>Go Back</button>
          <br />
          <h2>{story.title}</h2>
          <div>
            <h3>Comments:</h3>
            <br />
            {comments.map((comment, index) => {
              return comment.deleted ? (
                ""
              ) : (
                <Fragment key={"comment_" + comment.id}>
                  <div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: comment.text,
                      }}
                    />
                    <b style={{ color: "green" }}>By: {comment.by}</b>
                  </div>
                  <hr />
                </Fragment>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Comments;
