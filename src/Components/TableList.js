import DeleteAction from "./DeleteAction";

function TableList(props) {
    return (
        <>
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
                                    <input type='checkbox' checked={item.isCompleted} onChange={(e) => props.isComplete(index)}></input>
                                </td>
                                {item.isCompleted && <td><strike>{item.taskName}</strike></td>}
                                {!item.isCompleted && <td>{item.taskName}</td>}
                                <td>
                                    <button className='btn btn-secondary me-2' disabled={item.isCompleted} onClick={(e) => props.editListRow(index)} >Edit</button>
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