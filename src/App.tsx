import {FC, useEffect, useState} from 'react';
import "./App.css";

interface Item {
    grade: number;
    weight: number;
}

const App: FC = () => {

    const [sum, setSum] = useState<number>(0);
    const [passGrade, setPassGrade] = useState<number>(40);

    const [items, setItems] = useState<Item[]>([
        {
            grade: 0,
            weight: 0
        },
        {
            grade: 0,
            weight: 0
        },
        {
            grade: 0,
            weight: 0
        },
    ]);

    const addItem = () => {
        setItems(prevState => [...prevState, {
            index: items.length,
            grade: 0,
            weight: 0
        }]);
    };

    const removeItem = (index: number) => {
        const updatedItems = items.filter((_, idx) => idx !== index);
        setItems(updatedItems);
    }

    const handleGradeChange = (index: number, value: string) => {
        const updatedItems = [...items];
        updatedItems[index].grade = parseInt(value);
        setItems(updatedItems);
    }

    const handleWeightChange = (index: number, value: string) => {
        const updatedItems = [...items];
        updatedItems[index].weight = parseInt(value);
        setItems(updatedItems);
    }

    const calculate = () => {
        let sum: number = 0;
        items.forEach(item => {
            sum += item.grade * (item.weight / 100);
        });
        setSum(parseFloat(sum.toFixed(2)));

    };

    useEffect(() => {

        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                calculate();
            }
        };

        window.addEventListener("keypress", handleKeyPress);

        return () => {
            window.removeEventListener("keypress", handleKeyPress);
        };

    }, []);

    return (
        <div className={"app"}>
            <header>
                <h1>Did I Pass?</h1>
                <h2>Check if you passed a module already!</h2>
                <h2>The design is very human!</h2>
            </header>
            <main>
                <div className="input-wrapper">
                    <label htmlFor={"pass-grade"}>Pass %:</label>
                    <input type={"number"} id={"pass-grade"} value={passGrade}
                           onChange={e => setPassGrade(parseInt(e.target.value))}/>
                </div>
                <div className="form-wrapper">
                    <div className="input-wrapper">
                        <span>Achieved Grade %</span>
                        <span>Item Weight %</span>
                        <span></span>
                    </div>
                    {
                        items.map((item, index) => {
                            return (
                                <div className={"input-wrapper"}>
                                    {/*achieved grade*/}
                                    <input type={"number"} value={item.grade}
                                           onChange={(e) => handleGradeChange(index, e.target.value)}/>
                                    {/*weighting*/}
                                    <input type={"number"} value={item.weight}
                                           onChange={(e) => handleWeightChange(index, e.target.value)}/>
                                    <button className={"remove-button"} onClick={() => {
                                        removeItem(index)
                                    }}>-
                                    </button>
                                </div>
                            );
                        })
                    }
                    <button className={"add-button"} onClick={addItem}>Add item</button>
                </div>

                <button className={"calculate-button"} onClick={calculate}>Calculate</button>
                <div className="bottom-line">
                    <h3>Achieved {sum} % / {passGrade} %</h3>
                    <div>
                        {
                            sum < passGrade ?
                                <span className={"fail"}>Failed - {(passGrade - sum).toFixed(2)} % needed!</span>
                                :
                                <span className={"pass"}>Passed!</span>
                        }
                    </div>
                </div>
            </main>
            <footer>
                Mark Kiss {new Date().getFullYear()}
            </footer>
        </div>
    );
};

export default App;