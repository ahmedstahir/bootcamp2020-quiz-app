export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export type Question = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
}

// create one more type that will have all answers (correct and incorrect) in one array called "answers"
export type QuestionState = Question & { answers: string[] };

export const fetchQuestions = async (quantity: number, difficulty: Difficulty) => {
    const apiUrl = `https://opentdb.com/api.php?amount=${quantity}&difficulty=${difficulty}&type=multiple`;
    const apiResponse = await fetch(apiUrl);
    const data = await apiResponse.json();
    return data.results.map((question: Question) => ({
        ...question,
        answers: ([...question.incorrect_answers, question.correct_answer]).sort()
    }));
}