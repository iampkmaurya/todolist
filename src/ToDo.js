import { useEffect, useState } from "react";
import TableInput from "./Components/TableInput";
import TableList from "./Components/TableList";



function ToDo() {
    // console.log('re rednoring at', new Date())

    const [toDo, setTodo] = useState(''); // input value


    const [toDoList, setToDoList] = useState(() => {
        const data = localStorage.getItem('list');
        if (data) {
            return JSON.parse(data);
        }
        return [];
    }); //list of todo
    const [toDoListFiltered, setToDoListFiltered] = useState([]); //list of todo
    const [editIndex, setEditIndex] = useState(-1);// updating index
    const [status, setStatus] = useState(1);

    function postApiTodo() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "isCompleted": false,
            "taskName": toDo
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/todo", requestOptions)
            .then(response => response.text())
            .then(result => getApiTodo())
            .catch(error => console.log('error', error));
    }

    function getApiTodo() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // var raw = JSON.stringify({
        //     "title": "json-server2",
        //     "author": "typicode"
        // });

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/todo/", requestOptions)
            .then(response => response.json())
            .then(result => setToDoList(result))
            .catch(error => console.log('error', error));
    }


    function deleteApiTodo(id) {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch("http://localhost:3001/todo/" + id, requestOptions)
            .then(response => response.text())
            .then(result => getApiTodo())
            .catch(error => console.log('error', error));
    }

    function updateApiTodo(id) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const item = toDoList.find(x => x.id === id);
        var raw = JSON.stringify({
            "isCompleted": item.isCompleted,
            "taskName": toDo
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/todo/" + id, requestOptions)
            .then(response => response.text())
            .then(result => getApiTodo())
            .catch(error => console.log('error', error));

    }


    useEffect(() => {
        getApiTodo();
    }, [])



    // Use effect is used to call the function when some action performed
    useEffect(
        () => {
            if (status === 1) {
                setToDoListFiltered([...toDoList]);
                return;
            }
            if (status === 2) {
                setToDoListFiltered([...toDoList.filter(x => !x.isCompleted)]);
            }
            if (status === 3) {
                setToDoListFiltered([...toDoList.filter(x => x.isCompleted)]);
            }
        },
        [status, toDoList]
    )

    useEffect(
        () => {
            setToDoListFiltered([...toDoList]);
        },
        [toDoList]
    )

    useEffect(
        () => {
            localStorage.setItem('list', JSON.stringify(toDoList));
        },
        [toDoList]
    )

    // get varName(){}   
    // set varName(value){}

    const addToDo = () => {
        // toDoList.push({ taskName: toDo, isCompleted: false });
        // setToDoList([...toDoList])
        postApiTodo()
        //  ...toDoList ==> list all the elements 
        //setToDoList([...toDoList, { taskName: toDo, isCompleted: false }]); //Appending toDO to the list
        setTodo(''); // clearning the toDo for the input
        setStatus(1);
    }

    function deleteListRow(item) {
        // Remove item at index
        // let list = toDoList;
        // list = list.filter((x) => x !== item);
        deleteApiTodo(item.id)

        //Update the TODO list
        // setToDoList([...list]);
        setTodo('');
        setEditIndex(-1);
    }


    function editListRow(index) {
        // const item = toDoList[index];
        const item = toDoList.find(x => x.id === index);
        setTodo(item.taskName);
        // Get the value at index
        setEditIndex(index);
        //Set Value to the input field
    }

    function inserAndUpdate() {
        // Get the value at index
        if (editIndex >= 0) {
            // UPdating the index
            // let temp = toDoList[editIndex];
            // temp.taskName = toDo;
            // toDoList[editIndex] = temp;
            // setToDoList([...toDoList]);
            updateApiTodo(editIndex)
            setEditIndex(-1)
        } else {
            // Insert the value
            addToDo();
        }
        setTodo('');
        //Set Value to the input field
    }

    function isComplete(index) {
        //Get the element at index
        let obj = toDoList[index];
        obj.isCompleted = !obj.isCompleted;
        toDoList[index] = obj;
        setToDoList([...toDoList]);
        //Update the isComplete true or false
    }

    return (
        <div className="container dark card p-5">
            <div className="card p-3 mb-4 ">
                <TableInput test={setTodo} inputValue={toDo} />
                {/* <input className="form-control mb-2" value={toDo} onInput={(e) => setTodo(e.target.value)}></input> */}
                <button className="btn btn-primary" onClick={(e) => inserAndUpdate()}>Add</button>
                <div className="alert alert-primary mt-3" role="alert">
                    <b>Preview:</b> {toDo}
                </div>
            </div>
            <div className="filter-buttons mb-5 bg-light p-2">
                <button className="btn btn-primary me-3" onClick={(e) => setStatus(1)}>All</button>
                <button className="btn btn-primary me-3" onClick={(e) => setStatus(2)}>Pending</button>
                <button className="btn btn-primary me-3" onClick={(e) => setStatus(3)}>Completed</button>
                <button className="btn btn-danger">Clear All</button>
            </div>
            <TableList toDoListFiltered={toDoListFiltered} setToDoListFiltered={setToDoListFiltered} getApiTodo={getApiTodo} isComplete={isComplete} editListRow={editListRow} deleteListRow={deleteListRow} />
        </div >

    )

}

export default ToDo;