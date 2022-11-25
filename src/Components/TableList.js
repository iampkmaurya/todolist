
import { useEffect, useRef, useState } from "react";
import DeleteAction from "./DeleteAction";


function TableList(props) {
    // const [searchTodo, setSearchTodo] = useState(''); // search value


    function updateTodoStatusApi(item) {
        item.isCompleted = !item.isCompleted;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(item);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/todo/" + item.id, requestOptions)
            .then(response => response.text())
            .then(result => props.getApiTodo())
            .catch(error => console.log('error', error));
    }
    // const didMountRef = useRef(false);
    // useEffect(() => {
    //     if (didMountRef.current) {
    //         searchTodoApi(searchTodo)
    //     }
    //     didMountRef.current = true;
    // }, [searchTodo]
    // )
    function searchTodoApi(searchTodo) {
        // if (!searchTodo.length) {
        //     return;
        // }
        // setSearchTodo(searchTodo);  // used this line because of value is not appearinig in the input
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:3001/todo/?taskName_like=" + searchTodo, requestOptions)
            .then(response => response.json())
            .then(result => props.setToDoListFiltered(result))
            .catch(error => console.log('error', error));
    }



    return (
        <>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search" onChange={(e) => searchTodoApi(e.target.value)} />
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
                        props.toDoListFiltered.map((item, index) =>
                            <tr key={item.taskName + index}>
                                <td>
                                    <input type='checkbox' checked={item.isCompleted} onChange={(e) => updateTodoStatusApi(item)}></input>
                                </td>
                                {item.isCompleted && <td><strike>{item.taskName}</strike></td>}
                                {!item.isCompleted && <td>{item.taskName}</td>}
                                <td>
                                    <button className='btn btn-secondary me-2' disabled={item.isCompleted} onClick={(e) => props.editListRow(item.id)} >Edit</button>
                                    {/* <button className='btn btn-danger' onClick={(e) => props.deleteListRow(item)}>Delete</button> */}
                                    <DeleteAction deleteListRow={props.deleteListRow} item={item} />
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}


export default TableList;