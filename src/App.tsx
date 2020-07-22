import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuestions, Difficulty, QuestionState } from './API';
import BackgroundImage from './images/quiz.jpg'

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
        const nextQuestion = questionNo + 1;
        if (nextQuestion === TOTAL_QUESTIONS) {
            SetTriviaFinished(true);
        } else {
            SetQuestionNo(nextQuestion);
        }
    }

    return (
        <div style={{
            width: '100vw', height: '100vh', position: 'absolute', top: '0', left: '0', backgroundImage: `url(${BackgroundImage})`, backgroundSize: '100% 100%'
        }}>
            <h1>React Fun Trivia</h1>
            {triviaFinished &&
                <button className="begin" onClick={beginQuiz}>
                    Let's begin!
                </button>
            }
            {!triviaFinished &&
                <p className="score">Score: {score} / {TOTAL_QUESTIONS}</p>
            }
            {loading &&
                <p>Loading....</p>
            }
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
            {!loading && !triviaFinished && questionNo !== TOTAL_QUESTIONS - 1 &&
                <button
                    className="Next"
                    onClick={nextQuestion}
                    disabled={userAnswers.length <= questionNo}
                >
                    Show me next!
                </button>
            }
    </div>
  );
}

export default App;
