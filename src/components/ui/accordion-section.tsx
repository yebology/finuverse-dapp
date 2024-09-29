import React from 'react';
import { Label } from './label';
import { Input } from './input';
import { TextArea } from './textarea';
import { FileUpload } from './file-upload';
import LabelInputContainer from './label-input-container';

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

type SectionAccordionProps = {
    toggleSectionAccordion: (sectionNumber: number) => void;
    openSectionAccordion: number | null;
    sectionTitle: string;
    numberSection: number;
    htmlForTitle: string;
    htmlIdTitle: string;
    placeholderTitle: string;
    htmlForDescription: string;
    htmlIdDescription: string;
    placeholderDescription: string;
    htmlForDuration: string,
    htmlIdDuration: string,
    placeholderDuration: string,
    course: Course;
    updateCourse: (updatedFields: Partial<Course>) => void;
};

const SectionAccordion: React.FC<SectionAccordionProps> = ({
    toggleSectionAccordion,
    openSectionAccordion,
    sectionTitle,
    numberSection,
    htmlForTitle,
    htmlIdTitle,
    placeholderTitle,
    htmlForDescription,
    htmlIdDescription,
    placeholderDescription,
    htmlForDuration,
    htmlIdDuration,
    placeholderDuration,
    course,
    updateCourse,
}) => {
    const sectionIndex = numberSection - 1;

    const handleFileUpload = (file: File) => {
        updateCourse({
            section_video: course.section_video.map((video, index) =>
                index === sectionIndex ? file : video
            ) as [File | null, File | null, File | null],
        });
    };

    return (
        <>
            <h2 id={`section-accordion-heading-${numberSection}`}>
                <button
                    type="button"
                    onClick={() => toggleSectionAccordion(numberSection)}
                    className={
                        openSectionAccordion === numberSection
                            ? 'flex items-center justify-between w-full py-5 font-bold rtl:text-right text-gray-900 border-b border-gray-200 gap-3'
                            : 'flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 gap-3'
                    }
                    aria-expanded={openSectionAccordion === numberSection}
                    aria-controls={`section-accordion-body-${numberSection}`}
                >
                    <span>{sectionTitle}</span>
                    <svg
                        data-accordion-icon
                        className={`w-3 h-3 ${openSectionAccordion === numberSection ? 'rotate-180' : ''} shrink-0`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5 5 1 1 5"
                        />
                    </svg>
                </button>
            </h2>
            <div
                id={`section-accordion-body-${numberSection}`}
                className={openSectionAccordion === numberSection ? 'py-5 border-b border-gray-200' : 'hidden'}
                aria-labelledby={`section-accordion-heading-${numberSection}`}
            >
                <div className="w-full flex flex-col space-y-6">
                    <LabelInputContainer>
                        <Label htmlFor={htmlForTitle}>Title</Label>
                        <Input
                            id={htmlIdTitle}
                            placeholder={placeholderTitle}
                            type="text"
                            value={course.section_title[sectionIndex]}
                            onChange={(e) =>
                                updateCourse({
                                    section_title: course.section_title.map((title, index) =>
                                        index === sectionIndex ? e.target.value : title
                                    ) as [string, string, string],
                                })
                            }
                        />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor={htmlForDescription}>Description</Label>
                        <TextArea
                            rows={5}
                            cols={30}
                            id={htmlIdDescription}
                            placeholder={placeholderDescription}
                            value={course.section_description[sectionIndex]}
                            onChange={(e) =>
                                updateCourse({
                                    section_description: course.section_description.map((desc, index) =>
                                        index === sectionIndex ? e.target.value : desc
                                    ) as [string, string, string],
                                })
                            }
                        />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor={htmlForDuration}>Duration</Label>
                        <Input
                            type="number"
                            step="1"
                            min="1"
                            id={htmlIdDuration}
                            placeholder={placeholderDuration}
                            value={course.section_duration[sectionIndex]}
                            onChange={(e) =>
                                updateCourse({
                                    section_duration: course.section_duration.map((duration, index) =>
                                        index === sectionIndex ? e.target.value : duration
                                    ) as [number, number, number],
                                })
                            }
                        />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label>Video Course</Label>
                        <FileUpload
                            fileType="video"
                            updateCourse={handleFileUpload}
                        />
                    </LabelInputContainer>
                </div>
            </div>
        </>
    );
};

export default SectionAccordion;