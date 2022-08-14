import React from "react";
import {Routes, Route} from "react-router-dom";
import Header from "./components/header";
import Home from "./page/Home";
import Quiz from "./page/Quiz";

// style
import "./App.css";


const App = () => {
    return (
        <div>
            <Header/>
            <div className={'app-content'}>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/quiz'} element={<Quiz/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App;
