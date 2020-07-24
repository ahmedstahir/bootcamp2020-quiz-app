import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import StartButton from './components/StartButton';
import NextButton from './components/NextButton';
import Loader from './components/Loader';
import { fetchQuestions, Difficulty, QuestionState } from './API';
import TitleImage from './images/trivia.png'
import './App.css';

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
    question: string,
    answer: string,
    isCorrect: boolean,
    correctAnswer: string
};

function App() {
    const [loading, SetLoading] = useState<boolean>(false);
    const [questions, SetQuestions] = useState<QuestionState[]>([]);
    const [questionNo, SetQuestionNo] = useState<number>(0);
    const [userAnswers, SetUserAnswers] = useState<AnswerObject[]>([]);
    const [score, SetScore] = useState<number>(0);
    const [triviaFinished, SetTriviaFinished] = useState<boolean>(true);

    const beginQuiz = async () => {
        SetLoading(true);
        SetTriviaFinished(false);

        const fetchedQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
        SetQuestions(fetchedQuestions);

        SetQuestionNo(0);
        SetUserAnswers([]);
        SetScore(0);

        SetLoading(false);
    }

    const verifyAnswer = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!triviaFinished) {
            const userAnswer = e.currentTarget.value;
            const correct = questions[questionNo].correct_answer === userAnswer;
            if (correct) {
                SetScore((prev) => prev + 1);
            }

            const latestAnswer = {
                question: questions[questionNo].question,
                answer: userAnswer,
                isCorrect: correct,
                correctAnswer: questions[questionNo].correct_answer
            };
            SetUserAnswers((prev) => [...prev, latestAnswer]);
        }
    }

    const nextQuestion = async () => {
        const nextQuest = questionNo + 1;
        if (nextQuest === TOTAL_QUESTIONS) {
            SetTriviaFinished(true);
        } else {
            SetQuestionNo(nextQuest);
        }
    }

    const topMargin = userAnswers.length === 0 && triviaFinished ? '30vh' : '1vh';
    const imgWidth = userAnswers.length === 0 && triviaFinished ? '80vw' : '50vw';

    return (
        <div className="wrapper">
            <div className="wrapperCover">
                <img
                    style={{ marginTop: `${topMargin}`, width: `${imgWidth}` }}
                    src={TitleImage}
                    alt="Fun Trivia"
                />
                {!triviaFinished && !loading &&
                    <p className="score">Score: {score} / {TOTAL_QUESTIONS}</p>
                }
                <Loader open={loading} />
                {!loading && !triviaFinished &&
                    <QuestionCard
                    questionNumber={questionNo + 1}
                    totalQuestions={TOTAL_QUESTIONS}
                    question={questions[questionNo].question}
                    answers={questions[questionNo].answers}
                    userAnswer={userAnswers ? userAnswers[questionNo] : undefined}
                    callback={verifyAnswer}
                    />
                }
                {!loading && !triviaFinished && questionNo !== TOTAL_QUESTIONS - 1 && userAnswers.length > questionNo &&
                    <NextButton callback={nextQuestion} />
                }
                {(!loading && (triviaFinished || (userAnswers && userAnswers.length === TOTAL_QUESTIONS))) &&
                    <StartButton callback={beginQuiz} startAgain={userAnswers && userAnswers.length === TOTAL_QUESTIONS} />
                }
            </div>
    </div>
  );
}

export default App;
