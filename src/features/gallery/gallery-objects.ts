import { useCallback } from "react";
import { useLocalStorage } from "../../utils/useLocalStorage";

type Style = {
  width?: string;
  height?: string;
  transform?: string;
};
export type GalleryObject =
  | {
      type: "card-image";
      imageSrc: string;
      id: string;
      style: Style;
    }
  | {
      type: "text";
      text: string;
      id: string;
      style: Style;
    }
  | {
      type: "square";
      id: string;
      style: Style;
    };

export type ObjectType = GalleryObject["type"];

type GalleryObjectsState = {
  objects: GalleryObject[];
};

const initialState: GalleryObjectsState = {
  objects: [],
};

export const useGalleryObjects = () => {
  const { value, setValue, removeValue } = useLocalStorage<GalleryObjectsState>(
    { key: "gallery-objects" },
  );
  const state = value || initialState;

  const addCardImage = useCallback(
    (src: string) => {
      const newObject: GalleryObject = {
        type: "card-image",
        imageSrc: src,
        id: `${Date.now()}`,
        style: {
          width: "100px",
          height: "150px",
          transform: undefined,
        },
      };
      setValue({
        objects: [...state.objects, newObject],
      });
    },
    [state, setValue],
  );

  const addText = useCallback(
    (text: string) => {
      const newObject: GalleryObject = {
        type: "text",
        text,
        id: `${Date.now()}`,
        style: {
          width: "100px",
          height: "50px",
          transform: undefined,
        },
      };
      setValue({
        objects: [...state.objects, newObject],
      });
    },
    [state, setValue],
  );

  const addSquare = useCallback(() => {
    const newObject: GalleryObject = {
      type: "square",
      id: `${Date.now()}`,
      style: {
        width: "100px",
        transform: undefined,
      },
    };
    setValue({
      objects: [...state.objects, newObject],
    });
  }, [state, setValue]);

  const updateObject = useCallback(
    (id: string, style: Style) => {
      setValue({
        objects: state.objects.map((object) => {
          if (object.id === id) {
            return {
              ...object,
              style: {
                ...style,
              },
            };
          }
          return object;
        }),
      });
    },
    [setValue, state.objects],
  );

  const removeObject = useCallback(
    (id: string) => {
      setValue({
        objects: state.objects.filter((object) => object.id !== id),
      });
    },
    [state.objects, setValue],
  );

  const clearObjects = useCallback(() => {
    removeValue();
  }, [removeValue]);

  return {
    objects: state.objects,
    addCardImage,
    addText,
    addSquare,
    updateObject,
    removeObject,
    clearObjects,
  };
};
