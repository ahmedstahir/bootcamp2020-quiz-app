import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        fontFamily: 'Red Rose',
        background: 'linear-gradient(45deg, #2196F3 30%, #00CBF3 90%)',
        border: 0,
        fontSize: 30,
        borderRadius: 30,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
        height: '10vh',
        width: '35vw',
        marginTop: '5vh',
        cursor: 'pointer'
    },
    startOver: {
        fontFamily: 'Red Rose',
        background: 'linear-gradient(45deg, #2196F3 30%, #00CBF3 90%)',
        border: 0,
        fontSize: 24,
        borderRadius: 30,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
        height: '7vh',
        width: '25vw',
        marginTop: '5vh',
        cursor: 'pointer'
    },}));

type Props = {
    startAgain: boolean,
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const StartButton: React.FC<Props> = ({ startAgain, callback }) => {
    const classes = useStyles();

    return (
        <div>
            <ThemeProvider theme={(theme) => ({...theme})}>
                <button
                    type="button"
                    className={startAgain ? classes.startOver : classes.root}
                    onClick={callback}
                >
                    {startAgain ? 'Start over!' : 'Let the fun begin!'}
                </button>
            </ThemeProvider>
        </div>
    );
}

export default StartButton;