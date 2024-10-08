import checked from "../../assets/checked.png";
import { IoMdCheckmark } from "react-icons/io";
import { FcCancel } from "react-icons/fc";
import React from "react";

type CompleteModalProps = {
  answerList: [string, string, string];
  userAnswer: { [key: string]: string };
  onClose: () => void;
};

export const CompleteModal: React.FC<CompleteModalProps> = ({
  answerList,
  userAnswer,
  onClose,
}) => {
  return (
    <div
      style={{ zIndex: "10000" }}
      className={`fixed font-poppins flex items-center justify-center inset-0 bg-black bg-opacity-50 duration-300`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex justify-center items-center mt-5">
          <img src={checked} alt="" className="size-48" />
        </div>
        <div className="mt-2">
          <h1 className="text-center font-bold text-2xl">Congratulations!</h1>
          <h2 className="text-center font-semibold text-lg">
            You've completed the course!
          </h2>
          <h3 className="text-center font-normal text-md">
            Here are your results:
          </h3>
          <div className="text-center">
            {answerList.map((answer, index) => (
              <div
                key={index}
                className="mt-2 flex flex-row items-center justify-center space-x-1"
              >
                <p className="font-semibold">Question {index + 1} :</p>
                <p>{userAnswer[index.toString()]}</p>{" "}
                <p>
                  {answer == userAnswer[index.toString()] ? (
                    <IoMdCheckmark color="green" />
                  ) : (
                    <FcCancel />
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            backgroundColor: "#1f6feb",
          }}
          className="inline-block w-full px-6 py-2.5 mt-5 text-white font-medium rounded-lg hover:scale-105 duration-200 shadow-md"
        >
          Close Popup
        </button>
      </div>
    </div>
  );
};
