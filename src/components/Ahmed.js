import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        
        primary: {
            main: '#ff0000',
        },
        secondary: {
            main: '#00ff00',
        },
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
        backgroundColor: 'yellow'
    },
}));

export default function Ahmed() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
        <div className={classes.root}>
            <ButtonGroup size="small" aria-label="small outlined button group">
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
                </ButtonGroup>
                <Button color="primary" variant="outlined" style={{ fontWeight:'bold', width: '50vw', margin: '10px' }} >One</Button>
                <ButtonGroup orientation="vertical" size="large" color="primary" aria-label="large outlined primary button group">
                    <Button variant="outlined" style={{ margin: '10px' }} >One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
            </ButtonGroup>
            </div>
        </ThemeProvider>
    );
}
