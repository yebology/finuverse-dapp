"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { TextArea } from "../components/ui/textarea";
import { BottomGradient } from "../components/ui/bottom-gradient";
import { FileUpload } from "../components/ui/file-upload";
import LoadingScreen from "../components/ui/loading-screen";
import SectionAccordion from "../components/ui/accordion-section";
import QuestionAccordion from "../components/ui/accordion-question";
import LabelInputContainer from "../components/ui/label-input-container";
import Swal from 'sweetalert2'
import { PinataSDK } from "pinata-web3";
import { createCourse } from "../services/course";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { getCourse } from "../services/course";

export function CourseForm() {

  interface Course {
    name: string;
    description: string;
    price: number;
    thumbnail: File | null;
    section_title: [string, string, string];
    section_description: [string, string, string];
    section_duration: [number, number, number];
    section_video: [File | null, File | null, File | null];
    question_list: [string, string, string];
    answer_list: [string, string, string];
    first_answer_options: [string, string, string, string];
    second_answer_options: [string, string, string, string];
    third_answer_options: [string, string, string, string];
  }

  const [course, setCourse] = useState<Course>({
    name: 'Introduction to Web Development',
    description: 'A comprehensive course designed to teach you the basics.',
    price: 5,
    thumbnail: null,
    section_title: ['Getting Started', 'HTML & CSS Basics', 'JavaScript Fundamentals'],
    section_description: [
      'Introduction to the tools and setup required.',
      'Learn the foundational structure and styling.',
      'Understand JavaScript fundamentals.'
    ],
    section_duration: [30, 45, 60],
    section_video: [null, null, null],
    question_list: ['What is HTML?', 'How do you style a webpage?', 'What is a function in JavaScript?'],
    answer_list: ['HTML is a markup language.', 'You style a webpage using CSS.', 'A function is a block of code designed.'],
    first_answer_options: ['HTML', 'CSS', 'JavaScript', 'Python'],
    second_answer_options: ['CSS', 'Bootstrap', 'JavaScript', 'PHP'],
    third_answer_options: ['Function', 'Variable', 'Array', 'Object'],
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Updated course:", course);
  }, [course]);

  const updateCourse = (updatedCourse: Partial<Course>) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      ...updatedCourse,
    }));
  };

  const pinata = new PinataSDK({
    pinataJwt: `${import.meta.env.VITE_JWT}`,
    pinataGateway: `${import.meta.env.VITE_DOMAIN_PINATA}`,
  });

  const handleUploadThumbnailToPinata = async () => {
    try {
      if (course.thumbnail) {
        const upload = await pinata.upload.file(course.thumbnail);
        return upload.IpfsHash;
      } else {
        console.log("Thumbnail not provided");
        return ""
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleUploadVideo1ToPinata = async () => {
    try {
      if (course.section_video[0]) {
        const upload = await pinata.upload.file(course.section_video[0]);
        return upload.IpfsHash;
      } else {
        console.log("Video 1 not provided");
        return "";
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleUploadVideo2ToPinata = async () => {
    try {
      if (course.section_video[1]) {
        const upload = await pinata.upload.file(course.section_video[1]);
        return upload.IpfsHash;
      } else {
        console.log("Video 2 not provided");
        return "";
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleUploadVideo3ToPinata = async () => {
    try {
      if (course.section_video[2]) {
        const upload = await pinata.upload.file(course.section_video[2]);
        return upload.IpfsHash;
      } else {
        console.log("Video 3 not provided");
        return "";
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleFileUpload = (file: File) => {
    updateCourse({
      thumbnail: file,
    });
  };

  const successAlert = () => {
    Swal.fire({
      text: "You've successfully created a new course!",
      icon: 'success',
      confirmButtonText: 'Done',
      confirmButtonColor: '#1f6feb',
      customClass: {
        confirmButton: 'w-full'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/course');
      }
    });
  };

  const failedAlert = () => {
    Swal.fire({
      text: "Oops... There's something wrong while creating the course. Please try again!",
      icon: 'error',
      confirmButtonText: 'Done',
      confirmButtonColor: '#cc0029'
    });
  };

  const reset = () => {
    setCourse({
      name: '',
      description: '',
      price: 0,
      thumbnail: null,
      section_title: ['', '', ''],
      section_description: ['', '', ''],
      section_duration: [0, 0, 0],
      section_video: [null, null, null],
      question_list: ['', '', ''],
      answer_list: ['', '', ''],
      first_answer_options: ['', '', '', ''],
      second_answer_options: ['', '', '', ''],
      third_answer_options: ['', '', '', ''],
    });
  };

  const wallet = useAnchorWallet();

  const handleSubmit = () => {
    setIsLoading(true);

    Promise.all([
      handleUploadThumbnailToPinata(),
      handleUploadVideo1ToPinata(),
      handleUploadVideo2ToPinata(),
      handleUploadVideo3ToPinata(),
    ])
      .then(([thumbnail_cid, video_1, video_2, video_3]) => {

        if (thumbnail_cid && video_1 && video_2 && video_3) {
          const sectionVideoCID: string[] = [video_1, video_2, video_3];

          return createCourse(
            wallet,
            course.name,
            course.description,
            course.price,
            thumbnail_cid,
            course.section_title,
            course.section_description,
            course.section_duration,
            sectionVideoCID,
            course.question_list,
            course.answer_list,
            course.first_answer_options,
            course.second_answer_options,
            course.third_answer_options
          );
        } else {
          console.log("One or more files failed to upload.");
        }
      })
      .then(() => {
        setIsLoading(false);
        successAlert();
        reset();
        getCourse(wallet);
        console.log("Form submitted");
      })
      .catch((error) => {
        setIsLoading(false);
        failedAlert();
        reset();
        console.error("Error during submission:", error);
      });
  };

  const [openSectionAccordion, setOpenSectionAccordion] = useState<number | null>(null);
  const toggleSectionAccordion = (index: number) => {
    setOpenSectionAccordion(openSectionAccordion === index ? null : index);
  };

  const [openQuestionAccordion, setOpenQuestionAccordion] = useState<number | null>(null);
  const toggleQuestionAccordion = (index: number) => {
    setOpenQuestionAccordion(openQuestionAccordion === index ? null : index);
  };

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="w-full h-full mx-auto p-4 md:p-6 shadow-input bg-gray-100 flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="500"
        className="bg-white w-full lg:w-1/2 p-8 rounded-md shadow-input">
        <h2 className="font-bold text-xl text-neutral-800">
          Create Your Course
        </h2>
        <p className="text-neutral-600 text-base w-full mt-2 mb-8">
          Fill in the course details accurately to help learners understand its value. Complete all required fields before submitting.
        </p>
        <div className="w-full flex flex-col space-y-4">
          <LabelInputContainer>
            <Label
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
              htmlFor="course_name">Course Name</Label>
            <Input
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
              id="course_name"
              placeholder="Ex: Advanced Blockchain Programming with Solidity"
              type="text"
              value={course.name}
              onChange={(e) =>
                updateCourse({
                  name: e.target.value
                })
              }
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
              htmlFor="description">Description</Label>
            <TextArea
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
              rows={5}
              cols={30}
              id="description"
              placeholder="Ex: Dive into blockchain development and learn how to create secure and scalable applications"
              value={course.description}
              onChange={(e) =>
                updateCourse({
                  description: e.target.value
                })
              }
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
              htmlFor="price">Price</Label>
            <Input
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
              min="1"
              step="1"
              id="price"
              placeholder="Ex: 20 SOL"
              type="number"
              value={course.price}
              onChange={(e) =>
                updateCourse({
                  price: parseInt(e.target.value)
                })
              }
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
              htmlFor="thumbnail">Thumbnail</Label>
            <FileUpload
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
              updateCourse={handleFileUpload} fileType={"Thumbnail"} />
          </LabelInputContainer>
          <button
            onClick={() => handleSubmit()}
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="500"
            className="bg-gradient-to-br relative group/btn from-blue-600 to-blue-400 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
            type="submit"
          >
            Create
            <BottomGradient />
          </button>
        </div>
      </div>
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="500"
        className="bg-white w-full lg:w-1/2 p-8 rounded-md shadow-input flex flex-col space-y-12">
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="500"
          id="section-accordion-flush" data-accordion="collapse" data-active-classes="bg-white text-gray-900" data-inactive-classes="text-gray-500">
          <h2
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="500"
            className="font-bold text-xl text-neutral-800">
            Course Sections Overview
          </h2>
          <p
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="500"
            className="text-neutral-600 text-base w-full mt-2 mb-4">
            In this section, outline the topics included in your course. This will help students understand the course structure and what to expect.
          </p>
          <SectionAccordion
            toggleSectionAccordion={() => toggleSectionAccordion(1)}
            openSectionAccordion={openSectionAccordion}
            sectionTitle={"1st Section"}
            numberSection={1}
            htmlForTitle={"section1_title"}
            htmlIdTitle={"section1_title"}
            placeholderTitle={"What Will You Teach?"}
            htmlForDescription={"section1_description"}
            htmlIdDescription={"section1_description"}
            placeholderDescription={"Provide a brief description of this section, highlighting key concepts and objectives that will be covered."}
            htmlForDuration={"section1_duration"}
            htmlIdDuration={"section1_duration"}
            placeholderDuration={"How long is the duration of this course? (in minutes)"}
            course={course}
            updateCourse={updateCourse}
          />
          <SectionAccordion
            toggleSectionAccordion={() => toggleSectionAccordion(2)}
            openSectionAccordion={openSectionAccordion}
            sectionTitle={"2nd Section"}
            numberSection={2}
            htmlForTitle={"section2_title"}
            htmlIdTitle={"section2_title"}
            placeholderTitle={"What Will You Teach?"}
            htmlForDescription={"section2_description"}
            htmlIdDescription={"section2_description"}
            placeholderDescription={"Provide a brief description of this section, highlighting key concepts and objectives that will be covered."}
            htmlForDuration={"section2_duration"}
            htmlIdDuration={"section2_duration"}
            placeholderDuration={"How long is the duration of this course? (in minutes)"}
            course={course}
            updateCourse={updateCourse}
          />
          <SectionAccordion
            toggleSectionAccordion={() => toggleSectionAccordion(3)}
            openSectionAccordion={openSectionAccordion}
            sectionTitle={"3rd Section"}
            numberSection={3}
            htmlForTitle={"section3_title"}
            htmlIdTitle={"section3_title"}
            placeholderTitle={"What Will You Teach?"}
            htmlForDescription={"section3_description"}
            htmlIdDescription={"section3_description"}
            placeholderDescription={"Provide a brief description of this section, highlighting key concepts and objectives that will be covered."}
            htmlForDuration={"section3_duration"}
            htmlIdDuration={"section3_duration"}
            placeholderDuration={"How long is the duration of this course? (in minutes)"}
            course={course}
            updateCourse={updateCourse}
          />
        </div>
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="500"
          id="question-accordion-flush" data-accordion="collapse" data-active-classes="bg-white text-gray-900" data-inactive-classes="text-gray-500">
          <h2
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="500"
            className="font-bold text-xl text-neutral-800">
            Quiz Questions Section
          </h2>
          <p
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="500"
            className="text-neutral-600 text-base w-full mt-2 mb-4">
            In this section, you can add quiz questions to assess your students' understanding. This will enhance the learning experience and help track progress.
          </p>
          <QuestionAccordion
            toggleQuestionAccordion={() => toggleQuestionAccordion(1)}
            openQuestionAccordion={openQuestionAccordion}
            questionTitle={"1st Question"}
            numberQuestion={1}
            htmlForQuestion={"question1_question"}
            htmlIdQuestion={"question1_question"}
            placeholderQuestion={"Enter the quiz question here..."}
            htmlForCorrectAnswer={"question1_correctAnswer"}
            htmlIdCorrectAnswer={"question1_correctAnswer"}
            placeholderCorrectAnswer={"Enter the correct answer..."}
            htmlForAnswerOptions1={"question1_options1"}
            htmlIdAnswerOptions1={"question1_options1"}
            placeholderAnswerOptions1={"Enter first answer option..."}
            placeholderAnswerOptions2={"Enter second answer option..."}
            placeholderAnswerOptions3={"Enter third answer option..."}
            placeholderAnswerOptions4={"Enter fourth answer option..."}
            course={course}
            updateCourse={updateCourse}
          />
          <QuestionAccordion
            toggleQuestionAccordion={() => toggleQuestionAccordion(2)}
            openQuestionAccordion={openQuestionAccordion}
            questionTitle={"2nd Question"}
            numberQuestion={2}
            htmlForQuestion={"question2_question"}
            htmlIdQuestion={"question2_question"}
            placeholderQuestion={"Enter the quiz question here..."}
            htmlForCorrectAnswer={"question2_correctAnswer"}
            htmlIdCorrectAnswer={"question2_correctAnswer"}
            placeholderCorrectAnswer={"Enter the correct answer..."}
            htmlForAnswerOptions1={"question2_options1"}
            htmlIdAnswerOptions1={"question2_options1"}
            placeholderAnswerOptions1={"Enter first answer option..."}
            placeholderAnswerOptions2={"Enter second answer option..."}
            placeholderAnswerOptions3={"Enter third answer option..."}
            placeholderAnswerOptions4={"Enter fourth answer option..."}
            course={course}
            updateCourse={updateCourse}
          />
          <QuestionAccordion
            toggleQuestionAccordion={() => toggleQuestionAccordion(3)}
            openQuestionAccordion={openQuestionAccordion}
            questionTitle={"3rd Question"}
            numberQuestion={3}
            htmlForQuestion={"question3_question"}
            htmlIdQuestion={"question3_question"}
            placeholderQuestion={"Enter the quiz question here..."}
            htmlForCorrectAnswer={"question3_correctAnswer"}
            htmlIdCorrectAnswer={"question3_correctAnswer"}
            placeholderCorrectAnswer={"Enter the correct answer..."}
            htmlForAnswerOptions1={"question3_options1"}
            htmlIdAnswerOptions1={"question3_options1"}
            placeholderAnswerOptions1={"Enter first answer option..."}
            placeholderAnswerOptions2={"Enter second answer option..."}
            placeholderAnswerOptions3={"Enter third answer option..."}
            placeholderAnswerOptions4={"Enter fourth answer option..."}
            course={course}
            updateCourse={updateCourse}
          />
        </div>
      </div>
    </div>
  );
}