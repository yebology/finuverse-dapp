import React from 'react';
import { Label } from './label';
import { Input } from './input';
import { TextArea } from './textarea';
import { FileUpload } from './file-upload';
import LabelInputContainer from './label-input-container';

interface Course {
    id: number;
    name: string;
    creator: string;
    description: string;
    price: number;
    buyer: number;
    thumbnail: string;
    section_title: [string, string, string];
    section_description: [string, string, string];
    section_duration: [number, number, number];
    section_video: [string, string, string];
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
    course,
    updateCourse,
}) => {
    const sectionIndex = numberSection - 1;

    const handleFileUpload = (fileName: string) => {
        updateCourse({
            section_video: course.section_video.map((video, index) =>
                index === sectionIndex ? fileName : video
            ) as [string, string, string],
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
                <div className="w-full flex flex-col space-y-4">
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