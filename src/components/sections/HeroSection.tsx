import finance from "../../assets/finance.png";

export const HeroSection = () => {
  return (
    <div className="font-poppins py-8 m-auto px-6 md:px-12">
      <div className="absolute inset-0 my-auto w-96 h-44 bg-gradient-to-r from-[#1f6feb] via-[#22d1ee] to-[#f8f9fa] blur-3xl opacity-40 dark:opacity-20"></div>
      <div className="relative lg:flex lg:items-center lg:gap-36">
        <div className="text-center lg:text-left md:mt-12 lg:mt-0 sm:w-10/12 md:w-2/3 sm:mx-auto lg:mr-auto lg:w-6/12">
          <h1 className="text-n-1 font-bold text-4xl md:text-6xl lg:text-5xl xl:text-6xl">
            Unlock{" "}
            <span
              style={{
                background: "linear-gradient(45deg, #1f6feb, #22d1ee, #f8f9fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Digital
            </span>
            <span
              style={{
                background: "linear-gradient(45deg, #1f6feb, #22d1ee, #f8f9fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {" "}
              Finance{" "}
            </span>
            <span
              style={{
                background: "linear-gradient(45deg, #1f6feb, #22d1ee, #f8f9fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {" "}
              Education.{" "}
            </span>
          </h1>
          <p className="my-5 text-n-2 dark:text-gray-300 text-md">
            Learn from experts or become an instructor to share your knowledge.
            Buy, sell, and access courses in a Web3 environment designed for
            digital finance education. Start learning today!
          </p>
          <button
            style={{ backgroundColor: "#1f6feb" }}
            className="px-4 py-3 hover:scale-105 cursor-pointer duration-200 rounded-xl drop-shadow-lg"
          >
            <h1 className="text-white text-lg font-semibold">Start Learn</h1>
          </button>
        </div>
        <div className="overflow-hidden hidden w-full lg:flex lg:w-7/12 xl:w-5/12">
          <img
            className="cursor-pointer hover:scale-105 duration-200"
            src={finance}
            alt="finance"
          />
        </div>
      </div>
    </div>
  );
};
