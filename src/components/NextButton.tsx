import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
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
    },
}));

type Props = {
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const NextButton: React.FC<Props> = ({ callback }) => {
    const classes = useStyles();

    return (
        <div>
            <ThemeProvider theme={(theme) => ({...theme})}>
                <button
                    type="button"
                    className={classes.root}
                    onClick={callback}
                >
                    Show me next!
                </button>
            </ThemeProvider>
        </div>
    );
}

export default NextButton;