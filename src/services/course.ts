/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { getProvider } from "../utils/helper";
import { web3, Program } from "@project-serum/anchor"
import { BN } from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL, SystemProgram } from "@solana/web3.js";
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
    third_answer_options: [string, string, string, string],
) {

    const provider = getProvider(wallet!);
    if (!provider) {
        console.log("Provider isn't available!");
        return;
    }
    const idConverted = new BN(Math.floor(new Date().getTime() / 1000));
    const price_converted = new BN(price * LAMPORTS_PER_SOL);
    const section_duration_converted = section_duration.map((duration: number) => {
        return new BN(duration);
    });

    const program = new Program(programInterface, programId, provider);
    const systemProgramId = SystemProgram.programId;
    const courseId = idConverted.toArrayLike(Buffer, "le", 8);
    const [coursePda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("course"), provider.wallet.publicKey.toBuffer(), courseId],
        program.programId
    );

    await program.methods.createCourse(
        idConverted,
        name,
        description,
        category,
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
        third_answer_options,
    ).accounts({
        course: coursePda,
        creator: provider.wallet.publicKey,
        systemProgram: systemProgramId,
    })
        .rpc();
}

export function getCourse(
    wallet: AnchorWallet | undefined,
) {
    return loadAllCourse(wallet);
}

async function loadAllCourse(wallet: AnchorWallet | undefined) {
    try {
        const provider = getProvider(wallet!);
        if (!provider) {
            console.log("Provider isn't available!");
            return;
        }
        const program = new Program(programInterface, programId, provider);
        const allCourse = await program.account.course.all();
        const test = structuredCourse(allCourse);
        console.log(test);
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
        category: course.account.category.toNumber(),
        price: course.account.price.toNumber(),
        buyer: course.account.buyer.toNumber(),
        thumbnail: course.account.thumbnail.toString(),
        sectionTitle: course.account.sectionTitle,
        sectionDescription: course.account.sectionDescription,
        sectionDuration: course.account.sectionDuration.map((duration: any) => duration.toNumber()),
        sectionVideo: course.account.sectionVideo,
        questionList: course.account.questionList,
        answerList: course.account.answerList,
        firstAnswerOptions: course.account.firstAnswerOptions,
        secondAnswerOptions: course.account.secondAnswerOptions,
        thirdAnswerOptions: course.account.thirdAnswerOptions,
    }));
    return answerList;
}  