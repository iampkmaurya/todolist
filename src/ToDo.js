import { useState } from "react";



function ToDo() {
    const [toDo, setTodo] = useState(''); // input value
    const [toDoList, setToDoList] = useState([]); //list of todo
    const [editIndex, setEditIndex] = useState(-1);// updating index


    // get varName(){}   
    // set varName(value){}

    const addToDo = () => {
        setToDoList([...toDoList, toDo]); //Appending toDO to the list
        setTodo(''); // clearning the toDo for the input

    }

    function deleteListRow(index) {
        // Remove item at index
        let list = toDoList;
        list = list.filter((x, i) => i !== index);

        //Update the TODO list
        setToDoList(list);
    }


    function editListRow(index) {
        const item = toDoList[index];
        setTodo(item);
        // Get the value at index
        setEditIndex(index);
        //Set Value to the input field
    }

    function inserAndUpdate() {

        // Get the value at index
        if (editIndex >= 0) {
            // UPdating the index 
            toDoList[editIndex] = toDo;
            setToDoList(toDoList);
            setEditIndex(-1)
        } else {
            // Insert the value
            addToDo();
        }
        setTodo('');
        //Set Value to the input field
    }

    return (
        <div className="container dark card p-5">

            <div className="card p-3 mb-4 ">
                <input className="form-control mb-2" value={toDo} onInput={(e) => setTodo(e.target.value)}></input>
                <button className="btn btn-primary" onClick={(e) => inserAndUpdate()}>Add</button>
                <div className="alert alert-primary mt-3" role="alert">
                    {toDo}
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>ToDo List</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        toDoList.map((item, index) =>
                            <tr key={item + index}>
                                <td>
                                    <input type='checkbox'></input>
                                </td>
                                <td>{item}</td>
                                <td>
                                    <button className='btn btn-secondary me-2' onClick={(e) => editListRow(index)} >Edit</button>
                                    <button className='btn btn-danger' onClick={(e) => deleteListRow(index)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div >

    )

}

export default ToDo;