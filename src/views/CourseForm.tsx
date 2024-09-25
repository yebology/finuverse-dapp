/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { TextArea } from "../components/ui/textarea";
import { FileUpload } from "../components/ui/file-upload";
import { cn } from "../lib/utils";

export function CourseForm() {

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const [sectionTitle_1, setSectionTitle_1] = useState<string>("");
  const [sectionTitle_2, setSectionTitle_2] = useState<string>("");
  const [sectionTitle_3, setSectionTitle_3] = useState<string>("");


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  
  const handleFileUpload = (thumbnail: File | null) => {
    setThumbnail(thumbnail);
    console.log(thumbnail);
  };

  const [openSectionAccordion, setOpenSectionAccordion] = useState<number | null>(null);
  const toggleSectionAccordion = (index: number) => {
    setOpenSectionAccordion(openSectionAccordion === index ? null : index);
  };

  const [openQuestionAccordion, setOpenQuestionAccordion] = useState<number | null>(null);
  const toggleQuestionAccordion = (index: number) => {
    setOpenQuestionAccordion(openQuestionAccordion === index ? null : index);
  };

  return (
    <form className="w-full h-full mx-auto p-4 md:p-6 shadow-input bg-gray-100 flex flex-row space-x-4" onSubmit={handleSubmit}>
      <div className="bg-white w-1/2 p-8 rounded-md shadow-input">
        <h2 className="font-bold text-xl text-neutral-800">
          Create Your Course
        </h2>
        <p className="text-neutral-600 text-base w-full mt-2 mb-8">
          Fill in the course details accurately to help learners understand its value. Complete all required fields before submitting.
        </p>
        <div className="w-full flex flex-col space-y-4">
          <LabelInputContainer>
            <Label htmlFor="course_name">Course Name</Label>
            <Input id="course_name" placeholder="Ex: Advanced Blockchain Programming with Solidity" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="description">Description</Label>
            <TextArea rows={5} cols={30} id="description" placeholder="Ex: Dive into blockchain development and learn how to create secure and scalable applications" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="price">Price</Label>
            <Input id="price" placeholder="Ex: 20 SOL" type="number" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="duration">Duration</Label>
            <Input id="duration" placeholder="2 hours" type="number" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="thumbnail">Thumbnail</Label>
            <FileUpload onChange={handleFileUpload} fileType={"Thumbnail"} />
          </LabelInputContainer>
          <button
            className="bg-gradient-to-br relative group/btn from-black to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
            type="submit"
          >
            Create
            <BottomGradient />
          </button>
        </div>
      </div>
      <div className="bg-white w-1/2 p-8 rounded-md shadow-input flex flex-col space-y-12">
        <div id="section-accordion-flush" data-accordion="collapse" data-active-classes="bg-white text-gray-900" data-inactive-classes="text-gray-500">
          <h2 className="font-bold text-xl text-neutral-800">
            Course Sections Overview
          </h2>
          <p className="text-neutral-600 text-base w-full mt-2 mb-4">
            In this section, outline the topics included in your course. This will help students understand the course structure and what to expect.        
          </p>
          <h2 id="section-accordion-flush-heading-1">
            <button
              type="button"
              onClick={() => toggleSectionAccordion(1)}
              className={openSectionAccordion === 1 ? "flex items-center justify-between w-full py-5 font-bold rtl:text-right text-gray-900 border-b border-gray-200 gap-3" : "flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 gap-3"}
              aria-expanded={openSectionAccordion === 1}
              aria-controls="section-accordion-flush-body-1"
            >
              <span>1st Section</span>
              <svg data-accordion-icon className={`w-3 h-3 ${openSectionAccordion === 1 ? 'rotate-180' : ''} shrink-0`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div
            id="section-accordion-flush-body-1"
            className={openSectionAccordion === 1 ? 'py-5 border-b border-gray-200' : 'hidden'}
            aria-labelledby="section-accordion-flush-heading-1"
          >
            <div className="w-full flex flex-col space-y-4">
              <LabelInputContainer>
                <Label htmlFor="section1_title">Title</Label>
                <Input id="section1_title" placeholder="What Will You Teach?" type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="section1_description">Description</Label>
                <TextArea rows={5} cols={30} id="section1_description" placeholder="Provide a brief description of this section, highlighting key concepts and objectives that will be covered." />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="section1_video">Video</Label>
                <FileUpload onChange={handleFileUpload} fileType={"Video"} />
              </LabelInputContainer>
            </div>
          </div>
          <h2 id="section-accordion-flush-heading-2">
            <button
              type="button"
              onClick={() => toggleSectionAccordion(2)}
              className={openSectionAccordion === 2 ? "flex items-center justify-between w-full py-5 font-bold rtl:text-right text-gray-900 border-b border-gray-200 gap-3" : "flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 gap-3"}
              aria-expanded={openSectionAccordion === 2}
              aria-controls="section-accordion-flush-body-2"
            >
              <span>2nd Section</span>
              <svg data-accordion-icon className={`w-3 h-3 ${openSectionAccordion === 2 ? 'rotate-180' : ''} shrink-0`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div
            id="section-accordion-flush-body-2"
            className={openSectionAccordion === 2 ? 'py-5 border-b border-gray-200' : 'hidden'}
            aria-labelledby="section-accordion-flush-heading-2"
          >
            <div className="w-full flex flex-col space-y-4">
              <LabelInputContainer>
                <Label htmlFor="section2_title">Title</Label>
                <Input id="section2_title" placeholder="What Will You Teach?" type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="section2_description">Description</Label>
                <TextArea rows={5} cols={30} id="section2_description" placeholder="Provide a brief description of this section, highlighting key concepts and objectives that will be covered." />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="section2_video">Video</Label>
                <FileUpload onChange={handleFileUpload} fileType={"Video"} />
              </LabelInputContainer>
            </div>
          </div>
          <h2 id="section-accordion-flush-heading-3">
            <button
              type="button"
              onClick={() => toggleSectionAccordion(3)}
              className={openSectionAccordion === 3 ? "flex items-center justify-between w-full py-5 font-bold rtl:text-right text-gray-900 border-b border-gray-200 gap-3" : "flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 gap-3"}
              aria-expanded={openSectionAccordion === 3}
              aria-controls="section-accordion-flush-body-3"
            >
              <span>3rd Section</span>
              <svg data-accordion-icon className={`w-3 h-3 ${openSectionAccordion === 3 ? 'rotate-180' : ''} shrink-0`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div
            id="section-accordion-flush-body-3"
            className={openSectionAccordion === 3 ? 'py-5 border-b border-gray-200' : 'hidden'}
            aria-labelledby="section-accordion-flush-heading-3"
          >
            <div className="w-full flex flex-col space-y-4">
              <LabelInputContainer>
                <Label htmlFor="section3_title">Title</Label>
                <Input id="section3_title" placeholder="What Will You Teach?" type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="section3_description">Description</Label>
                <TextArea rows={5} cols={30} id="section3_description" placeholder="Provide a brief description of this section, highlighting key concepts and objectives that will be covered." />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="section3_video">Video</Label>
                <FileUpload onChange={handleFileUpload} fileType={"Video"} />
              </LabelInputContainer>
            </div>
          </div>
        </div>
        <div id="question-accordion-flush" data-accordion="collapse" data-active-classes="bg-white text-gray-900" data-inactive-classes="text-gray-500">
        <h2 className="font-bold text-xl text-neutral-800">
            Quiz Questions Section
          </h2>
          <p className="text-neutral-600 text-base w-full mt-2 mb-4">
          In this section, you can add quiz questions to assess your students' understanding. This will enhance the learning experience and help track progress.
          </p>
          <h2 id="question-accordion-flush-heading-1">
            <button
              type="button"
              onClick={() => toggleQuestionAccordion(1)}
              className={openQuestionAccordion === 1 ? "flex items-center justify-between w-full py-5 font-bold rtl:text-right text-gray-900 border-b border-gray-200 gap-3" : "flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 gap-3"}
              aria-expanded={openQuestionAccordion === 1}
              aria-controls="question-accordion-flush-body-1"
            >
              <span>1st Question</span>
              <svg data-accordion-icon className={`w-3 h-3 ${openQuestionAccordion === 1 ? 'rotate-180' : ''} shrink-0`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div
            id="question-accordion-flush-body-1"
            className={openQuestionAccordion === 1 ? 'py-5 border-b border-gray-200' : 'hidden'}
            aria-labelledby="question-accordion-flush-heading-1"
          >
            <div className="w-full flex flex-col space-y-4">
              <LabelInputContainer>
                <Label htmlFor="question1_title">Question</Label>
                <Input id="question1_title" placeholder="Enter the quiz question here..." type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="question1_answer">Answer</Label>
                <TextArea rows={5} cols={30} id="question1_answer" placeholder="Enter the correct answer..." />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="question1_options1">1st Answer Option</Label>
                <Input id="question1_options1" placeholder="Enter first answer option..." type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="question1_options2">2nd Answer Option</Label>
                <Input id="question1_options2" placeholder="Enter second answer option..." type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="question1_options3">3rd Answer Option</Label>
                <Input id="question1_options3" placeholder="Enter third answer option..." type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="question1_options4">4th Answer Option</Label>
                <Input id="question1_options4" placeholder="Enter fourth answer option..." type="text" />
              </LabelInputContainer>
            </div>
          </div>
          <h2 id="question-accordion-flush-heading-2">
            <button
              type="button"
              onClick={() => toggleQuestionAccordion(2)}
              className={openQuestionAccordion === 2 ? "flex items-center justify-between w-full py-5 font-bold rtl:text-right text-gray-900 border-b border-gray-200 gap-3" : "flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 gap-3"}
              aria-expanded={openQuestionAccordion === 2}
              aria-controls="question-accordion-flush-body-2"
            >
              <span>2nd Question</span>
              <svg data-accordion-icon className={`w-3 h-3 ${openQuestionAccordion === 2 ? 'rotate-180' : ''} shrink-0`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div
            id="question-accordion-flush-body-2"
            className={openQuestionAccordion === 2 ? 'py-5 border-b border-gray-200' : 'hidden'}
            aria-labelledby="question-accordion-flush-heading-2"
          >
             <div className="w-full flex flex-col space-y-4">
              <LabelInputContainer>
                <Label htmlFor="question1_title">Question</Label>
                <Input id="question1_title" placeholder="Enter the quiz question here..." type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="question1_answer">Answer</Label>
                <TextArea rows={5} cols={30} id="question1_answer" placeholder="Enter the correct answer..." />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="question1_options1">1st Answer Option</Label>
                <Input id="question1_options1" placeholder="Enter first answer option..." type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="question1_options2">2nd Answer Option</Label>
                <Input id="question1_options2" placeholder="Enter second answer option..." type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="question1_options3">3rd Answer Option</Label>
                <Input id="question1_options3" placeholder="Enter third answer option..." type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="question1_options4">4th Answer Option</Label>
                <Input id="question1_options4" placeholder="Enter fourth answer option..." type="text" />
              </LabelInputContainer>
            </div>
          </div>
          <h2 id="question-accordion-flush-heading-3">
            <button
              type="button"
              onClick={() => toggleQuestionAccordion(3)}
              className={openQuestionAccordion === 3 ? "flex items-center justify-between w-full py-5 font-bold rtl:text-right text-gray-900 border-b border-gray-200 gap-3" : "flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 gap-3"}
              aria-expanded={openQuestionAccordion === 3}
              aria-controls="question-accordion-flush-body-3"
            >
              <span>3rd Question</span>
              <svg data-accordion-icon className={`w-3 h-3 ${openQuestionAccordion === 3 ? 'rotate-180' : ''} shrink-0`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div
            id="question-accordion-flush-body-3"
            className={openQuestionAccordion === 3 ? 'py-5 border-b border-gray-200' : 'hidden'}
            aria-labelledby="question-accordion-flush-heading-3"
          >
             <div className="w-full flex flex-col space-y-4">
              <LabelInputContainer>
                <Label htmlFor="question1_title">Question</Label>
                <Input id="question1_title" placeholder="Enter the quiz question here..." type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="question1_answer">Answer</Label>
                <TextArea rows={5} cols={30} id="question1_answer" placeholder="Enter the correct answer..." />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="question1_options1">1st Answer Option</Label>
                <Input id="question1_options1" placeholder="Enter first answer option..." type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="question1_options2">2nd Answer Option</Label>
                <Input id="question1_options2" placeholder="Enter second answer option..." type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="question1_options3">3rd Answer Option</Label>
                <Input id="question1_options3" placeholder="Enter third answer option..." type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="question1_options4">4th Answer Option</Label>
                <Input id="question1_options4" placeholder="Enter fourth answer option..." type="text" />
              </LabelInputContainer>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};