/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { getProvider, getProviderWithoutLogin } from "../utils/helper";
import { web3, Program } from "@project-serum/anchor";
import { BN } from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js";
import { programId, programInterface } from "../utils/constant";
import { Buffer } from "buffer";

export async function createCourse(
  wallet: AnchorWallet | undefined,
  name: string,
  description: string,
  category: number,
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
  const category_converted = new BN(category);
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
      category_converted,
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

export async function getCourse() {
  return await loadAllCourse();
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
    return courseList;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getUploadedCourse(wallet: AnchorWallet | undefined) {
  return await loadUploadedCourse(wallet);
}

async function loadUploadedCourse(wallet: AnchorWallet | undefined) {
  try {
    const courseList = await getCourse();
    const userPubkey = wallet!.publicKey.toString();
    const filteredCourse = courseList.filter(
      (course: any) => course.creator === userPubkey
    );
    return filteredCourse;
  } catch (error) {
    console.log(error);
    return;
  }
}

function structuredCourse(allCourse: any) {
  const answerList = allCourse.map((course: any) => ({
    id: course.account.id.toNumber(),
    name: course.account.name.toString(),
    creator: course.account.creator.toString(),
    description: course.account.description.toString(),
    category: course.account.category.toNumber(),
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
  const allCourse = await getCourse();

  if (allCourse) {
    const specificCourse = allCourse.find(
      (course: any) => course.id === courseId
    );
    const creator = specificCourse.creator;
    const creatorPubkey = new PublicKey(creator);

    const [buyPda] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("buy"), provider.wallet.publicKey.toBuffer(), id],
      program.programId
    );
    const [coursePda] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("course"), creatorPubkey.toBuffer(), id],
      program.programId
    );

    await program.methods
      .buyCourse(idConverted)
      .accounts({
        buy: buyPda,
        course: coursePda,
        buyer: provider.wallet.publicKey,
        to: creatorPubkey,
        systemProgram: systemProgramId,
      })
      .rpc();
  }
  console.log("done")
}

export async function getCourseBuyers(id : number) {
  return await loadCourseBuyers(id);
}

async function loadCourseBuyers(id : number) {
  try {
    const provider = getProviderWithoutLogin();
    if (!provider) {
      console.log("Provider isn't available.");
      return;
    }
    const program = new Program(programInterface, programId, provider);
    const allCourseBuyers = await program.account.buy.all();
    if (allCourseBuyers) {
      const filteredBuyers = structuredCourseBuyers(allCourseBuyers, id);
      return filteredBuyers;
    }
  }
  catch (error) {
    console.log(error)
    return;
  }
}

function structuredCourseBuyers(allCourseBuyers : any, id : number) {
  const boughtList = allCourseBuyers.map((bought: any) => ({
    courseId: bought.account.courseId.toNumber(),
    buyer: bought.account.buyer.toString(),
  }));
  if (boughtList) {
    const filteredBought = boughtList.filter((bought : any) => bought.courseId === id);
    return filteredBought;
  }
  return;
}

export async function getBoughtCourse(wallet: AnchorWallet | undefined) {
  return await loadBoughtCourse(wallet);
}

async function loadBoughtCourse(wallet: AnchorWallet | undefined) {
  try {
    const provider = getProviderWithoutLogin();
    if (!provider) {
      console.log("Provider isn't available.");
      return;
    }

    const program = new Program(programInterface, programId, provider);
    const allBoughtCourse = await program.account.buy.all();
    if (allBoughtCourse) {
      const filteredCourse = await structuredBoughtCourse(
        allBoughtCourse,
        wallet
      );
      console.log(filteredCourse);
      return filteredCourse;
    }
  } catch (error) {
    console.log(error);
    return;
  }
}

async function structuredBoughtCourse(
  data: any,
  wallet: AnchorWallet | undefined
) {
  const boughtList = data.map((bought: any) => ({
    courseId: bought.account.courseId.toNumber(),
    buyer: bought.account.buyer.toString(),
  }));
  const userPubkey = wallet!.publicKey.toString();
  const filteredBought = boughtList.filter(
    (bought: any) => bought.buyer === userPubkey
  );
  const courseList = await getCourse();
  if (filteredBought) {
    const filteredCourse = filteredBought.map((bought: any) => {
      const filtered = courseList.find(
        (course: any) => course.id === bought.courseId
      );
      if (filtered) {
        return filtered;
      }
    });
    return filteredCourse;
  }
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
    return [null, null];
  }

  try {
    const program = new Program(programInterface, programId, provider);
    const allRating = await program.account.rate.all();
    const [accumulate, total] = structuredRating(allRating, courseId);
    return [accumulate, total];
  } catch (error) {
    console.log(error);
    return [null, null];
  }
}

function structuredRating(data: any, courseId: number) {
  const ratingList = data.map((rate: any) => ({
    courseId: rate.account.courseId.toNumber(),
    rating: rate.account.rating.toNumber(),
  }));
  if (ratingList) {
    const filteredRating = ratingList.filter(
      (data: any) => data.courseId === courseId
    );
    if (filteredRating) {
      const accumulateRating = filteredRating.reduce(
        (acc: any, current: any) => acc + current.rating,
        0
      );
      const currentRatingTotal = filteredRating.length;
      return [accumulateRating, currentRatingTotal];
    }
  }
  return [null, null];
}

export async function completeCourse(
  wallet: AnchorWallet | undefined,
  courseId: number,
  correctAnswer: number
) {
  const provider = getProvider(wallet!);
  if (!provider) {
    console.log("Provider isn't available.");
    return;
  }

  const program = new Program(programInterface, programId, provider);
  const systemProgramId = SystemProgram.programId;

  const idConverted = new BN(courseId);
  const answerConverted = new BN(correctAnswer);

  const id = idConverted.toArrayLike(Buffer, "le", 8);
  const [completePda] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from("complete"), wallet?.publicKey.toBuffer(), id],
    program.programId
  );

  await program.methods
    .completeCourse(idConverted, answerConverted)
    .accounts({
      complete: completePda,
      user: provider.wallet.publicKey,
      systemProgram: systemProgramId
    })
    .rpc();
}

export async function getCompletedCourse(wallet : AnchorWallet | undefined) {
  return await loadCompletedCourse(wallet);
}

async function loadCompletedCourse(wallet : AnchorWallet | undefined) {
  try {
    const provider = getProviderWithoutLogin()
    if (!provider) {
      console.log("Provider isn't available")
      return;
    }

    const program = new Program(programInterface, programId, provider);
    const allCompletedCourse = await program.account.complete.all();
    const convertedAllCompletedCourse = structuredCompletedCourse(allCompletedCourse, wallet)
    console.log(convertedAllCompletedCourse)
    return convertedAllCompletedCourse;
  }
  catch(error) {
    console.log(error)
    return;
  }
}

function structuredCompletedCourse(data : any, wallet : AnchorWallet | undefined) {
  const completedCourseList = data.map((complete : any) => ({
    user: complete.account.user.toString(),
    courseId: complete.account.courseId.toNumber(),
    correctAnswer: complete.account.correctAnswer.toNumber()
  }))
  const userPubkey = wallet?.publicKey.toString();
  const filteredCompletedCourse = completedCourseList.filter(
    (complete : any) => complete.user === userPubkey
  );
  return filteredCompletedCourse;
}