import React from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {FormControl, InputLabel, Select, MenuItem, Button} from "@mui/material";
import {getQuiz, startGetQuiz} from "../../redux/Quiz";


const Home = () => {
    const [amount, setAmount] = React.useState(10);
    const [category, setCategory] = React.useState(10);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangeAmount = e => setAmount(e.target.value);
    const handleChangeCategory = e => setCategory(e.target.value);

    const startTest = () => {
        dispatch(startGetQuiz(false));
        dispatch(getQuiz(amount, category));
        navigate('/quiz');
    }

    const handleTest = () => {
        console.log('clicked')
    }

    return(
        <div>
            <FormControl fullWidth>
                <InputLabel id="question">Number Of Questions:</InputLabel>
                <Select
                    labelId="question"
                    value={amount}
                    label="Number Of Questions:"
                    onChange={handleChangeAmount}
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={35}>35</MenuItem>
                </Select>
            </FormControl>
            <br/><br/>
            <FormControl fullWidth>
                <InputLabel id="category">Select Category:</InputLabel>
                <Select
                    labelId="category"
                    value={category}
                    label="Select Category"
                    onChange={handleChangeCategory}
                >
                    <MenuItem value={10}>Books</MenuItem>
                    <MenuItem value={23}>History</MenuItem>
                    <MenuItem value={21}>Sports</MenuItem>
                </Select>
            </FormControl>
            <br/> <br/>
            <Button onClick={startTest} variant={'contained'} color={'success'} fullWidth size={'large'}> START </Button> <br/> <br/>
            <Button onClick={handleTest} variant={'contained'} color={'primary'} fullWidth size={'large'}> TESTS </Button>
        </div>
    )
}


export default Home;