import React from 'react';
import { Label } from './label';
import { Input } from './input';
import LabelInputContainer from './label-input-container';

interface Course {
    name: string;
    description: string;
    category: number;
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

type QuestionAccordionProps = {
    toggleQuestionAccordion: (sectionNumber: number) => void;
    openQuestionAccordion: number | null;
    questionTitle: string;
    numberQuestion: number;
    htmlForQuestion: string;
    htmlIdQuestion: string;
    placeholderQuestion: string;
    htmlForCorrectAnswer: string;
    htmlIdCorrectAnswer: string;
    placeholderCorrectAnswer: string;
    htmlForAnswerOptions1: string;
    htmlIdAnswerOptions1: string;
    placeholderAnswerOptions1: string;
    placeholderAnswerOptions2: string;
    placeholderAnswerOptions3: string;
    placeholderAnswerOptions4: string;
    course: Course;
    updateCourse: (updatedFields: Partial<Course>) => void;
};

const QuestionAccordion: React.FC<QuestionAccordionProps> = ({
    toggleQuestionAccordion,
    openQuestionAccordion,
    questionTitle,
    numberQuestion,
    htmlForQuestion,
    htmlIdQuestion,
    placeholderQuestion,
    htmlForCorrectAnswer,
    htmlIdCorrectAnswer,
    placeholderCorrectAnswer,
    htmlForAnswerOptions1,
    htmlIdAnswerOptions1,
    placeholderAnswerOptions1,
    placeholderAnswerOptions2,
    placeholderAnswerOptions3,
    placeholderAnswerOptions4,
    course,
    updateCourse,
}) => {

    const questionIndex = numberQuestion - 1;

    const handleAnswerOptionChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedOptions = (numberQuestion === 1 ? course.first_answer_options :
            numberQuestion === 2 ? course.second_answer_options :
                course.third_answer_options).map((option, i) =>
                    i === index ? e.target.value : option
                ) as [string, string, string, string];

        updateCourse({
            ...(numberQuestion === 1 && { first_answer_options: updatedOptions }),
            ...(numberQuestion === 2 && { second_answer_options: updatedOptions }),
            ...(numberQuestion === 3 && { third_answer_options: updatedOptions }),
        });
    };

    return (
        <>
            <h2 id={`question-accordion-heading-${numberQuestion}`}>
                <button
                    type="button"
                    onClick={() => toggleQuestionAccordion(numberQuestion)}
                    className={openQuestionAccordion === numberQuestion ? "flex items-center justify-between w-full py-5 font-bold rtl:text-right text-gray-900 border-b border-gray-200 gap-3" : "flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 gap-3"}
                    aria-expanded={openQuestionAccordion === numberQuestion}
                    aria-controls={`question-accordion-body-${numberQuestion}`}
                >
                    <span>{questionTitle}</span>
                    <svg data-accordion-icon className={`w-3 h-3 ${openQuestionAccordion === numberQuestion ? 'rotate-180' : ''} shrink-0`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                    </svg>
                </button>
            </h2>
            <div
                id={`question-accordion-body-${numberQuestion}`}
                className={openQuestionAccordion === numberQuestion ? 'py-5 border-b border-gray-200' : 'hidden'}
                aria-labelledby={`question-accordion-heading-${numberQuestion}`}
            >
                <div className="w-full flex flex-col space-y-6">
                    <LabelInputContainer>
                        <Label htmlFor={htmlForQuestion}>Question</Label>
                        <Input
                            id={htmlIdQuestion}
                            placeholder={placeholderQuestion}
                            type="text"
                            value={course.question_list[questionIndex]}
                            onChange={(e) =>
                                updateCourse({
                                    question_list: course.question_list.map((question, index) =>
                                        index === questionIndex ? e.target.value : question
                                    ) as [string, string, string],
                                })
                            }
                        />
                    </LabelInputContainer>
                    {Array.from({ length: 4 }, (_, index) => (
                        <LabelInputContainer key={index}>
                            <Label htmlFor={`${htmlForAnswerOptions1}-${index}`}>Answer Option {index + 1}</Label>
                            <Input
                                id={`${htmlIdAnswerOptions1}-${index}`}
                                placeholder={index === 0 ? placeholderAnswerOptions1 : index === 1 ? placeholderAnswerOptions2 : index === 2 ? placeholderAnswerOptions3 : placeholderAnswerOptions4}
                                type="text"
                                value={
                                    (numberQuestion === 1 ? course.first_answer_options :
                                        numberQuestion === 2 ? course.second_answer_options :
                                            course.third_answer_options)[index]
                                }
                                onChange={handleAnswerOptionChange(index)}
                            />
                        </LabelInputContainer>
                    ))}
                    <LabelInputContainer>
                        <Label htmlFor={htmlForCorrectAnswer}>Correct Answer</Label>
                        <Input
                            id={htmlIdCorrectAnswer}
                            placeholder={placeholderCorrectAnswer}
                            type="text"
                            value={course.answer_list[questionIndex]}
                            onChange={(e) =>
                                updateCourse({
                                    answer_list: course.answer_list.map((correctAnswer, index) =>
                                        index === questionIndex ? e.target.value : correctAnswer
                                    ) as [string, string, string],
                                })
                            }
                        />
                    </LabelInputContainer>
                </div>
            </div>
        </>
    );
}

export default QuestionAccordion;