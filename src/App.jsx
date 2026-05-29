import { useEffect } from "react";
import { useCounterStore } from "./store/CounterStore";
import { useCounterStore } from "./store/CounterStore"; // Corrected import

function App() {

  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  // Subscribing to the Posts Slice via Selectors
  const posts = useCounterStore((state) => state.posts);
  const isLoading = useCounterStore((state) => state.isLoading);
  const error = useCounterStore((state) => state.error);
  const fetchPosts = useCounterStore((state) => state.fetchPosts);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "50px",
      fontFamily: "sans-serif"
    }}>
      <h1>Zustand Counter</h1>
      <div style={{ fontSize: "3rem", fontWeight: "bold", margin: "20px" }}>
        {count}
      </div>
      <div style={{ marginBottom: "40px" }}>
        <button onClick={decrement} style={{ padding: "10px 20px", cursor: "pointer" }}>Decrement</button>
        <button onClick={reset} style={{ padding: "10px 20px", margin: "0 10px", cursor: "pointer" }}>Reset</button>
        <button onClick={increment} style={{ padding: "10px 20px", cursor: "pointer" }}>Increment</button>
      </div>

      <hr style={{ width: "100%", border: "1px solid #eee" }} />

      <h2>Latest Posts (Async API)</h2>
      
      {isLoading && <p>Loading posts...</p>}
      
      {error && (
        <div style={{ color: "red", textAlign: "center" }}>
          <p>Error: {error}</p>
          <button onClick={fetchPosts}>Retry Fetch</button>
        </div>
      )}

      <ul style={{ textAlign: "left", maxWidth: "600px" }}>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: "15px" }}>
            <strong>{post.title}</strong>
            <p style={{ margin: "5px 0", color: "#666" }}>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;