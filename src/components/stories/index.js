import React, { Fragment } from "react";

function Stories({ stories, sendToMachine }) {
  return (
    <div className="">
      {stories.map((storyItem, index) => {
        return (
          <Fragment key={"story_" + storyItem.id}>
            <div className="story-item-container">
              <h4>{storyItem.title}</h4>
              <h5>
                Comments: {storyItem.comments_count}
                <b style={{ marginLeft: "100px" }}>By: {storyItem.user}</b>
              </h5>
            </div>
            <hr />
          </Fragment>
        );
      })}
    </div>
  );
}

export default Stories;
