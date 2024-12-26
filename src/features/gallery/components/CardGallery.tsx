import { FC, useState } from "react";
import { useGalleryObjects } from "../gallery-objects";
import { GalleryObject } from "./GalleryObject";
import { generateDummyImageUrl } from "../../../utils/generateDummyImage";

const BOARD_ASPECT_RATIO = 3 / 2;

export const CardGallery: FC = () => {
  const { objects, updateObject, addCardImage } = useGalleryObjects();
  const [container, setContainer] = useState<HTMLElement | null>(null);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div>
        <button
          onClick={() =>
            addCardImage(
              generateDummyImageUrl(
                { width: 100, height: 150 },
                { bgColor: "lightblue", textColor: "black" },
              ),
            )
          }
        >
          Add Card Image
        </button>
      </div>
      <div
        ref={setContainer}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: `${BOARD_ASPECT_RATIO}`,
          border: "1px solid red",
          backgroundColor: "lightgray",
          overflow: "hidden",
        }}
      >
        {objects.map((object) => (
          <GalleryObject
            key={object.id}
            object={object}
            onChange={updateObject}
            container={container}
          />
        ))}
      </div>
    </div>
  );
};
