import { FC, memo, useState } from "react";
import { type GalleryObject as GalleryObjectType } from "../gallery-objects";
import Moveable from "react-moveable";

type Props = {
  object: GalleryObjectType;
  onChange: (id: string, style: GalleryObjectType["style"]) => void;
  container: HTMLElement | null;
};
export const GalleryObject: FC<Props> = memo(({ object, onChange }) => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [isSelected, setIsSelected] = useState(true);

  switch (object.type) {
    case "card-image":
      return (
        <>
          <div
            ref={setElement}
            style={{
              position: "absolute",
              ...object.style,
            }}
            tabIndex={0}
            onFocus={() => setIsSelected(true)}
            onBlur={() => setIsSelected(false)}
          >
            <img
              src={object.imageSrc}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>
          <Moveable
            // Memo: 各インジケーター等の表示制御。例えばオブジェクトがフォーカスされてるときだけ isSelected === true にして表示する、とかできる
            // ただし preventDefault === false にしないとオブジェクトのクリックイベントが発火しなくなり、 preventDefault === true にするとオブジェクトのドラッグ時に背景等が動いてしまうので何か対策必要
            //   preventDefault={false}
            // hideChildMoveableDefaultLines={!isSelected}
            // hideDefaultLines={!isSelected}
            // hideThrottleDragRotateLine={!isSelected}
            // renderDirections={isSelected ? undefined : []}

            target={element}
            draggable
            resizable
            rotatable={isSelected}
            keepRatio
            edge
            origin={false}
            onDrag={(e) => {
              e.target.style.transform = e.transform;
            }}
            onDragEnd={(e) => {
              onChange(object.id, {
                ...object.style,
                transform: e.target.style.transform,
              });
            }}
            onRotate={(e) => {
              e.target.style.transform = e.transform;
            }}
            onRotateEnd={(e) => {
              onChange(object.id, {
                ...object.style,
                transform: e.target.style.transform,
              });
            }}
            onResize={(e) => {
              e.target.style.width = `${e.width}px`;
              e.target.style.height = `${e.height}px`;
              e.target.style.transform = e.drag.transform;
            }}
            onResizeEnd={(e) => {
              onChange(object.id, {
                ...object.style,
                width: e.target.style.width,
                height: e.target.style.height,
                transform: e.target.style.transform,
              });
            }}
          />
        </>
      );
    case "text":
      return (
        <>
          <div
            ref={setElement}
            style={{
              position: "absolute",
              textAlign: "center",
              ...object.style,
            }}
          >
            {object.text}
          </div>
          <Moveable
            draggable
            resizable
            rotatable
            target={element}
            onDrag={(e) => {
              e.target.style.transform = e.transform;
            }}
            onDragEnd={(e) => {
              onChange(object.id, {
                ...object.style,
                transform: e.target.style.transform,
              });
            }}
            onRotate={(e) => {
              e.target.style.transform = e.transform;
            }}
            onRotateEnd={(e) => {
              onChange(object.id, {
                ...object.style,
                transform: e.target.style.transform,
              });
            }}
            onResize={(e) => {
              e.target.style.width = `${e.width}px`;
              e.target.style.height = `${e.height}px`;
              e.target.style.transform = e.drag.transform;
            }}
            onResizeEnd={(e) => {
              onChange(object.id, {
                ...object.style,
                width: e.target.style.width,
                height: e.target.style.height,
                transform: e.target.style.transform,
              });
            }}
          />
        </>
      );
    case "square":
      return (
        <>
          <div
            ref={setElement}
            style={{
              position: "absolute",
              backgroundColor: "blue",
              ...object.style,
            }}
          />
          <Moveable
            draggable
            resizable
            rotatable
            target={element}
            onDrag={(e) => {
              e.target.style.transform = e.transform;
            }}
            onDragEnd={(e) => {
              onChange(object.id, {
                ...object.style,
                transform: e.target.style.transform,
              });
            }}
            onRotate={(e) => {
              e.target.style.transform = e.transform;
            }}
            onRotateEnd={(e) => {
              onChange(object.id, {
                ...object.style,
                transform: e.target.style.transform,
              });
            }}
            onResize={(e) => {
              e.target.style.width = `${e.width}px`;
              e.target.style.height = `${e.height}px`;
            }}
            onResizeEnd={(e) => {
              onChange(object.id, {
                ...object.style,
                width: e.target.style.width,
                height: e.target.style.height,
                transform: e.target.style.transform,
              });
            }}
          />
        </>
      );
    default: {
      throw new Error("Invalid object type");
    }
  }
});
