import { create } from "zustand";

/**
 * Counter Slice
 * In a real product, this would be in its own file: counterSlice.js
 */
const createCounterSlice = (set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
});

/**
 * Posts Slice
 * Handles asynchronous data fetching for posts.
 */
const createPostsSlice = (set) => ({
  posts: [],
  isLoading: false,
  error: null,
  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      set({ posts: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
});

/**
 * The Bound Store
 * This is the single source of truth for the entire application.
 * We combine all slices here.
 */
export const useCounterStore = create((...a) => ({
  ...createCounterSlice(...a),
  ...createPostsSlice(...a),
  // As the AI app grows, you simply add more slices here:
  // ...createChatSlice(...a),
  // ...createAuthSlice(...a),
}));

