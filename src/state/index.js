import { createContext } from "react";
import { assign, Machine } from "xstate";

export const MachineContext = createContext();

const storiesUrl = "https://api.hnpwa.com/v0/news.json?page=1";

const fetchStories = async () => {
  const stories = await fetch(storiesUrl).then((r) => r.json());
  return stories;
};

export const appMachine = Machine({
  id: "app",
  initial: "init",
  context: {
    user: undefined,
    error: undefined,
    stories: [],
    selectedStory: undefined,
  },
  states: {
    init: {},

    list: {
      states: {
        loading: {
          invoke: {
            id: "fetchStories",
            src: fetchStories,
            onDone: {
              target: "success",
              actions: assign({ stories: (context, event) => event.data }),
            },
            onError: {
              target: "fail",
              actions: assign({ error: (context, event) => event.data }),
            },
          },
        },
        success: {},
        fail: {},
      },
    },
  },
  on: {
    LOAD_STORIES: {
      target: "list.loading",
    },
  },
});
