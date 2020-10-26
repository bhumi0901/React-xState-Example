import Stories from "components/stories";
import React, { useContext, useEffect } from "react";
import { MachineContext } from "state";

function Home() {
  const [machine, sendToMachine] = useContext(MachineContext);

  const { error, stories } = machine.context;

  useEffect(() => {
    sendToMachine("LOAD_STORIES");
  }, []);
  console.log(stories);
  return (
    <div className="">
      {machine.matches("list.loading") && <h2>Loading...</h2>}
      {machine.matches("list.fail") && (
        <div style={{ color: "red" }}>
          Error loading stories: {error.toString()}
        </div>
      )}
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          {stories && stories.length > 0 && (
            <Stories stories={stories} sendToMachine={sendToMachine} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
