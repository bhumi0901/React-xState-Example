import React, { useContext, useEffect, Fragment } from "react";
import { MachineContext } from "state";
import { NavLink } from "react-router-dom";

function Home() {
  const [machine, sendToMachine] = useContext(MachineContext);

  const { error, stories } = machine.context;

  useEffect(() => {
    sendToMachine("LOAD_STORIES");
  }, []);

  return (
    <div style={{ padding: 20 }}>
      {machine.matches("list.loading") && <h2>Loading...</h2>}
      {machine.matches("list.fail") && (
        <div style={{ color: "red" }}>
          Error loading stories: {error.toString()}
        </div>
      )}
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          {stories && stories.length > 0 && (
            <div className="">
              {stories.map((storyItem, index) => {
                return (
                  <Fragment key={"story_" + storyItem.id}>
                    <div className="story-item-container">
                      <NavLink to={"/comments/" + storyItem.id}>
                        <h4>{storyItem.title}</h4>
                      </NavLink>
                      <h5>
                        Comments: {storyItem.comments_count}
                        <b style={{ marginLeft: "100px" }}>
                          By: {storyItem.user}
                        </b>
                      </h5>
                    </div>
                    <hr />
                  </Fragment>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
