import "./App.css";
import { CardGallery } from "./features/gallery/components/CardGallery";

function App() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        padding: 100,
      }}
    >
      <CardGallery />
    </div>
  );
}

export default App;
