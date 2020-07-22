import React from 'react';
import { AnswerObject } from '../App'

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
        <div>
            <p className="number">
                Question: {questionNumber} of {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            <div>
                {answers.map(answer => (
                    <div key={answer}>
                        <button
                            disabled={userAnswer ? true : false}
                            value={answer}
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