import * as React from 'react';
import {useNavigate} from "react-router-dom";
import {Backdrop, Box, Modal, Fade, Button, Typography} from '@mui/material';
import {useDispatch} from "react-redux";
import {updateModal} from "../../redux/Quiz";
import {useEffect, useState} from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: "10px",
    boxShadow: 24,
    p: 3,
};

const TransitionsModal = ({modal, score, quiz, setFinish, finish}) => {
    const [allScore, setAllScore] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        let a = score.filter(e => e).length;
        setAllScore(a * 100 / quiz.length)

        return() => {
            setFinish(true)
        }
    }, [modal]);


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={finish ? false : modal}
                onClose={() => dispatch(updateModal(!modal))}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{timeout: 500}}
            >
                <Fade in={modal}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Your results
                        </Typography>
                        <Typography id="transition-modal-description" sx={{mt: 2}}>
                            <span className={"quiz-result-style"}>
                                {score.filter(e => e).length} / {quiz.length} <br/> <span>or</span> <br/> {parseInt(allScore)} %
                                <span className={'quiz-result-action'}>
                                    <Button onClick={() => dispatch(updateModal(!modal))} variant={'outlined'}> OK </Button>
                                    <Button onClick={() => navigate('/')} variant={'outlined'} color={'error'}> GO HOME </Button>
                                </span>
                            </span>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}


export default TransitionsModal;