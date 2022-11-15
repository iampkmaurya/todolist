function DeleteAction(props) {
    function confirmDelete() {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure ?'))
            props.deleteListRow(props.item)
    }

    return (
        <>
            <button className='btn btn-danger' onClick={(e) => confirmDelete()}>Delete</button>
        </>
    )
}


export default DeleteAction;