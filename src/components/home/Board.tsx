"use client";
import { FC, useEffect, useRef, useState } from "react";
import AboutMeBox from "./AboutMeBox";
import BookMeBox from "./BookMeBox";
import FeaturedProjectBox from "./FeaturedProjectBox";
import UnusedBox1 from "./UnusedBox1";
import UnusedBox2 from "./UnusedBox2";
import ArticlesBox from "./ArticlesBox";
import UnusedBox3 from "./UnusedBox3";
import { createContext } from "react";
import { clsx } from "clsx";

// Bunch of types and constants
const screenSizes = ["tiny", "small", "medium", "large"] as const;
type ScreenSize = (typeof screenSizes)[number];
type Media = {
  name: ScreenSize;
  breakpoint: number;
  cols: number;
  rows: number;
  gap: number;
  colSize: number[];
  rowSize: number[];
};
type Medias = {
  [key in ScreenSize]: Media;
};

// Define a set of values use to size the board and its boxes depending on a given width breakpoint.
const _medias: Partial<Medias> = {};
_medias.large = {
  name: "large",
  breakpoint: 0, // Disabled, default media
  cols: 4,
  rows: 3,
  gap: 30,
  colSize: [250, 300],
  rowSize: [200, 250],
};
_medias.medium = {
  name: "medium",
  breakpoint:
    _medias.large.colSize[0] * _medias.large.cols +
    _medias.large.gap * (_medias.large.cols + 1),
  cols: 3,
  rows: 4,
  gap: 30,
  colSize: [250, 300],
  rowSize: [250, 250],
};
_medias.small = {
  name: "small",
  breakpoint:
    _medias.medium.colSize[0] * _medias.medium.cols +
    _medias.medium.gap * (_medias.medium.cols + 1),
  cols: 2,
  rows: 5,
  gap: 30,
  colSize: [250, 300],
  rowSize: [250, 250],
};
_medias.tiny = {
  name: "tiny",
  breakpoint:
    _medias.small.colSize[0] * _medias.small.cols +
    _medias.small.gap * (_medias.small.cols + 1),
  cols: 1,
  rows: 7,
  gap: 30,
  colSize: [250, 300],
  rowSize: [250, 250],
};
const medias: Medias = _medias as Medias;

export const MediaContext = createContext<Media>(medias.large);

export const Board: FC = () => {
  // Retrieve board element
  const board = useRef<HTMLDivElement | null>(null);

  // Retrieve the current screen size in a state and calculate board sizes
  const [screenSize, setScreenSize] = useState<ScreenSize>("large");
  const [minBoardWidth, setMinBoardWidth] = useState("");
  const [maxBoardWidth, setMaxBoardWidth] = useState("");
  const [boardHeight, setBoardHeight] = useState("");
  const transitionTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const handleScreenSizeChange = () => {
    // Disable all transitions animations for children containers
    // (This prevents weird animations when the window is resized)
    while (transitionTimeouts.current!.length)
      clearTimeout(transitionTimeouts.current!.pop());
    Array.from(board.current!.children).forEach((child) => {
      const container = child.firstElementChild! as HTMLDivElement;
      container.style.transition = "none";
      transitionTimeouts.current!.push(
        setTimeout(() => (container.style.transition = ""), 500)
      );
    });

    // Retrieve and set the new screen size
    let newScreenSize: ScreenSize = "large";
    for (const name of screenSizes) {
      if (window.innerWidth < medias[name].breakpoint) {
        newScreenSize = name;
        break;
      }
    }
    setScreenSize(newScreenSize);

    // Retrieve media infos
    const m = medias[newScreenSize];

    // Calculate new board min and max widths
    setMinBoardWidth(`${m.colSize[0] * m.cols + m.gap * (m.cols + 1)}px`);
    setMaxBoardWidth(`${m.colSize[1] * m.cols + m.gap * (m.cols + 1)}px`);

    // Calculate new board height
    const minBoardHeight = m.rowSize[0] * m.rows + m.gap * (m.rows + 1);
    const maxBoardHeight = m.rowSize[1] * m.rows + m.gap * (m.rows + 1);
    const parent = board.current?.parentElement!;
    if (parent.offsetHeight < minBoardHeight)
      setBoardHeight(`${minBoardHeight}px`);
    else if (parent.offsetHeight > maxBoardHeight)
      setBoardHeight(`${maxBoardHeight}px`);
    else setBoardHeight(`${parent.offsetHeight}px`);
  };
  useEffect(() => {
    handleScreenSizeChange();
    window.addEventListener("resize", handleScreenSizeChange);
    return () => {
      window.removeEventListener("resize", handleScreenSizeChange);
    };
  });

  return (
    <section
      style={{
        minWidth: screenSize === "large" ? minBoardWidth : "100vw",
        maxWidth: screenSize === "large" ? maxBoardWidth : "100vw",
        height: boardHeight,
        gridColumn: medias[screenSize].cols,
        gridRow: medias[screenSize].rows,
        gap: medias[screenSize].gap + "px",
        padding: medias[screenSize].gap + "px",
      }}
      ref={board}
      className={clsx("grid w-[3000px]")}
      // Below medium screen size, the boxes are
      // ["large", "medium"].includes(screenSize) && "relative")}
    >
      <MediaContext.Provider value={medias[screenSize]}>
        {screenSize === "large" && (
          <>
            <AboutMeBox position="col-start-1 col-end-4" />
            <BookMeBox position="col-start-1 row-start-2 row-end-4" />
            <FeaturedProjectBox />
            <UnusedBox1 />
            <UnusedBox2 position="col-start-2 col-end-4" />
            <ArticlesBox position="col-start-4 row-start-1 row-end-3" />
            <UnusedBox3 position="col-start-4" />
          </>
        )}
        {screenSize === "medium" && (
          <>
            <AboutMeBox position="row-start-1 col-start-1 col-end-4" />
            <BookMeBox position="col-start-1 row-start-2 row-end-4" />
            <FeaturedProjectBox position="col-start-2" />
            <UnusedBox1 position="" />
            <UnusedBox2 position="col-start-2 col-end-4" />
            <ArticlesBox position="row-start-4 col-start-1 col-end-3" />
            <UnusedBox3 position="col-start-3" />
          </>
        )}
        {screenSize === "small" && (
          <>
            <AboutMeBox position="row-start-1 col-start-1 col-end-3" />
            <BookMeBox position="col-start-1 row-start-2 row-end-3" />
            <FeaturedProjectBox position="col-start-2" />
            <UnusedBox2 position="row-start-3 col-start-1 col-end-3" />
            <UnusedBox1 position="row-start-4" />
            <UnusedBox3 position="row-start-4" />
            <ArticlesBox position="row-start-5 col-start-1 col-end-3" />
          </>
        )}
        {screenSize === "tiny" && (
          <>
            <AboutMeBox />
            <BookMeBox />
            <FeaturedProjectBox />
            <UnusedBox2 />
            <UnusedBox1 />
            <UnusedBox3 />
            <ArticlesBox />
          </>
        )}
      </MediaContext.Provider>
    </section>
  );
};
export default Board;
