import React from 'react';
import { AnswerObject } from '../App'
import '../App.css';

type Props = {
    questionNumber: number,
    totalQuestions: number,
    question: string,
    answers: string[],
    userAnswer: AnswerObject | undefined,
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const QuestionCard: React.FC<Props> = ({ questionNumber, totalQuestions, question, answers, userAnswer, callback }) => {
    return (
        <div className="questionCard">
            <p className="questionCounter">
                Question: {questionNumber} of {totalQuestions}
            </p>
            <p className="question" dangerouslySetInnerHTML={{ __html: question }} />
            <div>
                {answers.map(answer => (
                    <div key={answer}>
                        <button
                            disabled={userAnswer ? true : false}
                            value={answer}
                            className=
                            {
                                !userAnswer
                                    ? "answer"
                                    : userAnswer.correctAnswer === answer
                                        ? "correctAnswer"
                                        : userAnswer.answer === answer
                                            ? "wrongAnswer"
                                            : "disabledAnswer"
                            }
                            onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuestionCard;