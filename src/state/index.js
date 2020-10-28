import { createContext } from "react";
import { assign, Machine } from "xstate";

export const MachineContext = createContext();

const storiesUrl = "https://api.hnpwa.com/v0/news.json?page=1";
const getCommentsUrl = (id) =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

const fetchStories = async () => {
  const stories = await fetch(storiesUrl).then((r) => r.json());
  return stories;
};

const fetchComments = async (id) => {
  const data = await fetch(getCommentsUrl(id)).then((r) => r.json());
  const { kids } = data;
  const comments = await Promise.all(
    kids
      .map((id) => getCommentsUrl(id))
      .map((url) => fetch(url).then((r) => r.json()))
  );
  return { story: data, comments };
};

export const appMachine = Machine({
  id: "app",
  initial: "init",
  context: {
    story: undefined,
    stories: [],
    comments: [],
    error: undefined,
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
    comments: {
      states: {
        loading: {
          invoke: {
            id: "fetchComments",
            src: (context, event) => fetchComments(event.storyId),
            onDone: {
              target: "success",
              actions: assign({
                story: (context, event) => event.data.story,
                comments: (context, event) => event.data.comments,
              }),
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
    LOAD_COMMENTS: {
      target: "comments.loading",
    },
  },
});
