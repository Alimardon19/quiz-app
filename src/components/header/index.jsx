import React from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@mui/material";
import {updateModal} from "../../redux/Quiz";

// style
import "./style.css";


const Header = () => {
    const {quiz, count, modal} = useSelector(state => state.Quiz);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = () => {
        dispatch(updateModal(!modal));
    }

    return(
        <div className={"header"}>
            <span onClick={() => navigate('/')} style={{cursor: 'pointer'}}>FinalExam</span>
            { quiz.length === 0 ? "" : <span style={{fontSize: "24px"}}> {count}/{quiz.length} </span>}
            { quiz.length === 0 ? "" : <Button onClick={onFinish} color={'warning'} variant={'contained'}> Finish </Button>}
        </div>
    )
}


export default Header;