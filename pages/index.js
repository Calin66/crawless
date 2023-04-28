import { Roboto } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const buttonsUpSlider = [
  { title: "Code editor", icon: "/icons/icons8-source-code-64" },
  { title: "Browser", icon: "/icons/icons8-dollar-64" },
  { title: "Visual CSS selectors", icon: "/icons/dotted-square" },
  { title: "Queue", icon: "/icons/icons8-play-100" },
  { title: "Logs", icon: "/icons/icons8-file-104" },
  { title: "Storage", icon: "/icons/icons8-grid-64" },
];

const sliderElements = [
  {
    title:
      "Revolutionising workflow development with a powerful JavaScript code editor",
    desc: "Our editor is designed to simplify data automation and web scraping workflows development. With a high-level SDK, developers can control and interact with any web page, API, or database, making automation and data scraping fast and easy. ",
    img: "/img/leftImage.png",
  },
  {
    title: "Build powerful automation workflows with ad-free headless Chrome",
    desc: "Our headless Chrome browser with integrated ad-blocking makes it easy for developers to build automation workflows in one place. With distraction-free browsing, developers can test and debug automation workflows directly within the app. Perfect for web scraping or browser automation projects.",
    img: "/img/leftImage-1.png",
  },
  {
    title: "Simplify workflow development with CSS selector feature",
    desc: "Our CSS selector feature simplifies web automation and web scraping workflows by making it easier for developers to find DOM elements on a web page. With this tool, developers can easily and quickly target specific elements, reducing the time and effort needed for development. Whether you're building a web scraper or automating a repetitive task, our CSS selector feature is a must-have tool for any developer.",
    img: "/img/vcss_img.png",
  },
  {
    title:
      "Enhance your web automation with a visual and filterable task queue",
    desc: "Supercharge your web automation workflow with our visual and filterable task queue. Get all the essential details you need, including task status, creation date, arguments, and more - all available in table and JSON formats. Say goodbye to slow and cumbersome processes and get your tasks completed with lightning speed.",
    img: "/img/leftImage-2.png",
  },
  {
    title:
      "Optimise web automation with advanced log filtering for efficient debugging",
    desc: "Our log filtering feature is a must-have for efficient web automation and web scraping workflows. With the ability to quickly filter logs by log level, date, task name, and log message, developers can easily debug, test, and troubleshoot their workflows. This streamlined approach saves time and effort while ensuring high-quality results. Upgrade your workflow with our log filtering feature today.",
    img: "/img/leftImage-3.png",
  },
  {
    title:
      "Maximise web automation efficiency with easy data storage and management",
    desc: "Boost your web automation workflow with easy data storage and management. This feature supports popular databases like MongoDB, PostgreSQL, MySQL, Elasticsearch, Redis, as well as file storage systems like , CSV, S3, and more. Efficiently store and organise your data using advanced sorting and filtering options to view it in table or JSON format.",
    img: "/img/leftImage-4.png",
  },
];

function useInterval(callback, delay, index) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, index]);
}

export default function Home() {
  const [index, setIndex] = useState(0);
  const [indexPrc, setIndexPrc] = useState(0);
  const [slide, setSlide] = useState(0);

  const handleArrow = (nr) => {
    if (index === 0 && nr < index) {
      setIndex(5);
    } else if (index === 5 && nr > index) {
      setIndex(0);
    } else setIndex(nr);
    setIndexPrc(index);
    setSlide(0);
  };

  useInterval(
    () => {
      if (slide < 100) setSlide(slide + 1);
      else if (slide === 100) handleArrow(index + 1);
    },
    50,
    index
  );

  // console.log(slide);

  return (
    <main
      className={
        `flex min-h-screen flex-col items-center bg-c1 text-c2 font-normal overflow-x-hidden py-32 select-none ` +
        roboto.className
      }
    >
      <div className="flex gap-x-3 w-[80vw]">
        {buttonsUpSlider.map((bttn, i) => {
          // console.log(`${bttn.icon}${i === index ? ".png" : " (1).png"}`);
          return (
            <div
              key={i}
              className={
                "flex relative items-center border border-c3 rounded-[4px] p-[14px_16px] h-[56px] justify-center w-fit text-c4 cursor-pointer"
              }
              onClick={() => {
                setSlide(0);
                setIndex(i);
                setIndexPrc(index);
              }}
            >
              <div
                className={
                  i === index ? "h-full bg-c3 absolute top-0 left-0" : "hidden"
                }
                style={{ width: `${slide}%` }}
              ></div>
              {i === 0 || i === 5 ? (
                <img
                  src={`${bttn.icon}${i === index ? ".png" : " (1).png"}`}
                  className=" mr-2 h-[22px] z-20"
                />
              ) : (
                <img
                  src={`${bttn.icon}${i === index ? ".png" : " (1).png"}`}
                  className=" mr-2 h-[18px] z-20"
                />
              )}
              <p className={i === index ? "text-white z-20" : "text-c4 z-20"}>
                {bttn.title}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center my-10 w-[95vw] h-[550px] relative">
        <img
          src="/icons/lefta.png"
          className="mr-14 cursor-pointer absolute top-[40%] left-4"
          onClick={() => handleArrow(index - 1)}
        />
        {sliderElements.map((se, i) => {
          if (i !== index) return <div key={i}></div>;
          return (
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
              key={i}
              className={
                index === i
                  ? "grid grid-cols-[1fr_2fr] w-[80%]  h-full gap-x-[3vw]"
                  : "hidden"
              }
            >
              <motion.div className="w-[352px] h-full flex flex-col container1">
                <h2 className=" text-[30px] mb-5 leading-[36px]">{se.title}</h2>
                <p className="text-[18px] text-[#A3A3B1] leading-[26px]">
                  {se.desc}
                </p>
                <p className="text-[#71717E] mt-2">Replaces:</p>

                <div className="flex gap-x-3 mb-4 mt-4">
                  <img src="/grey/g3.png" />
                  <img src="/grey/g2.png" />

                  <img src="/grey/g1.png" />
                </div>
                <button className="border border-c4 py-3 w-fit px-[4vw] flex justify-center items-center rounded-[4px] font-bold text-c4">
                  Explore IDE features{" "}
                  <i className="fa-sharp fa-solid fa-chevron-right ml-1 text-xs "></i>
                </button>
              </motion.div>
              <motion.div className="w-full h-full flex items-center justify-center shadow-[0_80px_150px_#00000080] container2">
                <img src={se.img} className="" />
              </motion.div>
            </motion.div>
          );
        })}
        <img
          src="/icons/righta.png"
          className="ml-14 cursor-pointer absolute top-[40%] right-4"
          onClick={() => handleArrow(index + 1)}
        />
      </div>
    </main>
  );
}
