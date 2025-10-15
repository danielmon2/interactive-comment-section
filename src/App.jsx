import { createRoot } from "react-dom/client";
import CommentSection from "./CommentSection";

const App = () => {
  return <CommentSection />;
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
