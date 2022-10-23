import { useState } from "react";



function ToDo(props) {
    const [toDo, setTodo] = useState('');
    const [toDoList, setToDoList] = useState([]);

    function addToDo() {
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

        //Set Value to the input field
    }

    function updateListRow(index) {
        // Get the value at index

        //Set Value to the input field
    }

    return (
        <>
            <input className="form-control" value={toDo} onInput={(e) => setTodo(e.target.value)}></input>
            <button className="btn btn-primary" onClick={(e) => addToDo()}>Add</button>
            <p>{toDo}</p>
            <table className="table table-dark">
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
                                    <button className='btn btn-secondary mr-3' onClick={(e) => editListRow(index)} >Edit</button>
                                    <button className='btn btn-danger' onClick={(e) => deleteListRow(index)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                    {/* <tr>
                        <td>
                            <input type='checkbox'></input>
                        </td>
                        <td>
                            List
                        </td>
                        <td>
                            <button className='btn btn-secondary mr-3'>Edit</button>
                            <button className='btn btn-danger'>Delete</button>

                        </td>
                    </tr> */}
                </tbody>
            </table>
        </>

    )

}

// class TaskListModel{
//     index=1;
//     task='';
//     isDone=false;

// }


export default ToDo;