import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import TransitionsModal from "../../components/Quiz-result";
import {useSelector, useDispatch} from "react-redux";
import {Button, CircularProgress } from "@mui/material";
import {clearQuizState, updateCount, updateModal} from "../../redux/Quiz";

// style
import "./style.css";


const Quiz = () => {
    const [score, setScore] = useState([]);
    const [select, setSelect] = useState(0);
    const [check, setCheck] = useState([]);
    const [disabledBtn, setDisabledBtn] = useState([]);
    const [finish, setFinish] = useState(false);
    const {quiz, modal, checkGetQuiz} = useSelector(state => state.Quiz);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(updateCount(select + 1));
    }, [select]);

    useEffect(() => {
        if (checkGetQuiz) return navigate('/');
        return () => {
            dispatch(clearQuizState());
            dispatch(updateModal(false));
        }
    }, []);

    const handleSelect = index => setSelect(index);

    const checkQuiz = (key, answer, index) => {
        let obj = {name: 'index' + select, select, key, answer, index}
        check.push(obj)
        check.map((e, index) => {
            if (e.name === obj.name) {
                check.splice(index, 1, obj);
            }
        });
        const removeDuplicateObjects = [...new Map(check.map(v => [v.name, v])).values()];
        setCheck(removeDuplicateObjects);
    }

    const submit = () => {
        const result = check.find(e => e.name === `index${select}`);
        if (quiz[select].correct_answer === result.answer) {
            setScore((prev) => {
                let prevState = [...prev];
                prevState[select] = true;
                return prevState;
            });
        } else {
            setScore((prev) => {
                let prevState = [...prev];
                prevState[select] = false;
                return prevState;
            });
        }

        setDisabledBtn((prev) => {
            let prevState = [...prev];
            prevState[select] = true;
            return prevState;
        })
    }


    return (
        quiz.length === 0 ? <div className={'loader'}><CircularProgress/> </div> :
        <div>
            <div className={'btn-group'}>
                {quiz.map((number, index) => {
                    return(
                        <button
                            key={index}
                            style={{backgroundColor: `${select === index ? "#007BFF" : ""}`}}
                            onClick={() => handleSelect(index)}
                            className={"Button " +
                            `${ finish ? (check.some(e => e.answer === quiz[index].correct_answer) ? "btn-success" : "btn-error") :
                                disabledBtn[index] ? (check.some(e => e.answer === quiz[index].correct_answer) ? "btn-success" : "btn-error") :
                                check.some(e => e.select === index) ? "btn-selected" : ""}`}
                        > {index + 1} </button>
                    )
                })}
            </div>
            {quiz.filter((e, i) => i === select).map((item, index) => <div className={'quiz-card'} key={index}>
                <div className={'quiz-card-header'}>
                    {select + 1}. <span dangerouslySetInnerHTML={{__html: item.question}}/>
                </div>
                <div className={'quiz-card-body'}>
                    {item.incorrect_answers.map((answer, key) =>
                        <div
                            key={key}
                            onClick={() => checkQuiz(key, answer, index)}
                            style={{
                                pointerEvents: `${disabledBtn[select] || finish ? "none" : "auto"}`,
                                backgroundColor: `${answer === quiz[select].correct_answer ? "success" : "error"}`
                            }}
                            className={'quiz-variant ' +
                            `${ finish && answer === quiz[select].correct_answer ? "success" :
                                disabledBtn[select] ? (answer === quiz[select].correct_answer ? "success" : (
                                check.some(k => k.select === select && k.key === key) ? "error" : "")) :
                                check.some(k => k.select === select && k.key === key && finish) ? "error" :
                                check.some(k => k.select === select && k.key === key) ? "selected" : "none"}`}
                            dangerouslySetInnerHTML={{__html: answer}}
                        />)
                    }
                </div>
                <div className={'quiz-card-footer'}>
                    <Button
                        onClick={() => setSelect(prev => prev - 1)}
                        variant={'contained'} color={'primary'}
                        disabled={select === 0}
                    > PREVIOUS </Button>
                    <Button
                        onClick={submit}
                        disabled={disabledBtn[select] || !check.some(k => k.select === select && k.index === index)}
                        variant={'contained'} color={'inherit'}
                    > SUBMIT </Button>
                    <Button
                        onClick={() => setSelect(prev => prev + 1)}
                        variant={'contained'} color={'primary'}
                        disabled={select === quiz.length - 1}
                    > NEXT </Button>
                </div>
            </div>)
            }
            <TransitionsModal
                modal={modal}
                score={score}
                quiz={quiz}
                finish={finish}
                setFinish={setFinish}
            />
        </div>
    )
}
export default Quiz;
