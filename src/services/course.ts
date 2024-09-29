/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { getProvider, getProviderWithoutLogin } from "../utils/helper";
import { web3, Program } from "@project-serum/anchor";
import { BN } from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL, SystemProgram } from "@solana/web3.js";
import { programId, programInterface } from "../utils/constant";
import { Buffer } from "buffer";

export async function createCourse(
  wallet: AnchorWallet | undefined,
  name: string,
  description: string,
  price: number,
  thumbnail_cid: string,
  section_title: [string, string, string],
  section_description: [string, string, string],
  section_duration: [number, number, number],
  section_video_cid: string[],
  question_list: [string, string, string],
  answer_list: [string, string, string],
  first_answer_options: [string, string, string, string],
  second_answer_options: [string, string, string, string],
  third_answer_options: [string, string, string, string]
) {
  const provider = getProvider(wallet!);
  if (!provider) {
    console.log("Provider isn't available!");
    return;
  }
  const idConverted = new BN(Math.floor(new Date().getTime() / 1000));
  const price_converted = new BN(price * LAMPORTS_PER_SOL);
  const section_duration_converted = section_duration.map(
    (duration: number) => {
      return new BN(duration);
    }
  );

  const program = new Program(programInterface, programId, provider);
  const systemProgramId = SystemProgram.programId;
  const courseId = idConverted.toArrayLike(Buffer, "le", 8);
  const [coursePda] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from("course"), provider.wallet.publicKey.toBuffer(), courseId],
    program.programId
  );

  await program.methods
    .createCourse(
      idConverted,
      name,
      description,
      price_converted,
      thumbnail_cid,
      section_title,
      section_description,
      section_duration_converted,
      section_video_cid,
      question_list,
      answer_list,
      first_answer_options,
      second_answer_options,
      third_answer_options
    )
    .accounts({
      course: coursePda,
      creator: provider.wallet.publicKey,
      systemProgram: systemProgramId,
    })
    .rpc();
}

export function getCourse() {
  return loadAllCourse();
}

async function loadAllCourse() {
  try {
    const provider = getProviderWithoutLogin();
    if (!provider) {
      console.log("Provider isn't available!");
      return;
    }
    const program = new Program(programInterface, programId, provider);
    const allCourse = await program.account.course.all();
    const courseList = structuredCourse(allCourse);
    console.log(courseList);
  } catch (error) {
    console.log(error);
  }
}

function structuredCourse(allCourse: any) {
  const answerList = allCourse.map((course: any) => ({
    id: course.account.id.toNumber(),
    name: course.account.name.toString(),
    creator: course.account.creator.toString(),
    description: course.account.description.toString(),
    price: course.account.price.toNumber(),
    buyer: course.account.buyer.toNumber(),
    thumbnail: course.account.thumbnail.toString(),
    sectionTitle: course.account.sectionTitle,
    sectionDescription: course.account.sectionDescription,
    sectionDuration: course.account.sectionDuration.map((duration: any) =>
      duration.toNumber()
    ),
    sectionVideo: course.account.sectionVideo,
    questionList: course.account.questionList,
    answerList: course.account.answerList,
    firstAnswerOptions: course.account.firstAnswerOptions,
    secondAnswerOptions: course.account.secondAnswerOptions,
    thirdAnswerOptions: course.account.thirdAnswerOptions,
  }));
  return answerList;
}

export async function buyCourse(
  wallet: AnchorWallet | undefined,
  courseId: number
) {
  const provider = getProvider(wallet!);
  if (!provider) {
    console.log("Provider isn't available!");
    return;
  }
  const idConverted = new BN(courseId);

  const program = new Program(programInterface, programId, provider);
  const systemProgramId = SystemProgram.programId;

  const id = idConverted.toArrayLike(Buffer, "le", 8);
  const [buyPda] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from("buy"), provider.wallet.publicKey.toBuffer(), id],
    program.programId
  );
  const [coursePda] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from("course"), " " ,id],
    program.programId
  );

  await program.methods
    .buyCourse(idConverted)
    .accounts({
      buy: buyPda,
      course: coursePda,
      buyer: provider.wallet.publicKey,
      to: "",
      systemProgram: systemProgramId,
    })
    .rpc();
}

export async function rateCourse(
  wallet: AnchorWallet | undefined,
  courseId: number,
  rating: number
) {
  const provider = getProvider(wallet!);
  if (!provider) {
    console.log("Provider isn't available!");
    return;
  }
  const idConverted = new BN(courseId);
  const ratingConverted = new BN(rating);

  const program = new Program(programInterface, programId, provider);
  const systemProgramId = SystemProgram.programId;

  const id = idConverted.toArrayLike(Buffer, "le", 8);
  const [ratePda] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from("rate"), provider.wallet.publicKey.toBuffer(), id],
    program.programId
  );

  await program.methods
    .rateCourse(idConverted, ratingConverted)
    .accounts({
      rate: ratePda,
      user: provider.wallet.publicKey,
      systemProgram: systemProgramId,
    })
    .rpc();
}

export async function getCourseRating(courseId: number) {
  return await loadCourseRating(courseId);
}

async function loadCourseRating(courseId: number) {
  const provider = getProviderWithoutLogin();
  if (!provider) {
    console.log("Provider isn't available!");
    return;
  }

  try {
    const program = new Program(programInterface, programId, provider);
    const allRating = await program.account.rate.all();
    console.log(allRating);
    const convertedAllRating = structuredRating(allRating, courseId);
    console.log(convertedAllRating);
  } catch (error) {
    console.log(error);
    return [];
  }
}

function structuredRating(data: any, courseId: number) {
  const ratingList = data.map((rate: any) => ({
    courseId: rate.account.courseId.toNumber(),
    rating: rate.account.rating.toNumber(),
  }));
  const filteredRating = ratingList.filter(
    (data: any) => data.courseId === courseId
  );
  const accumulateRating = filteredRating.reduce(
    (acc: any, current: any) => acc + current.rating,
    0
  );
  const currentRatingTotal = filteredRating.length;
  return accumulateRating / currentRatingTotal;
}

export async function completeCourse(
  wallet: AnchorWallet | undefined,
  courseId: number,
  correctAnswer: number
) {
  
}
