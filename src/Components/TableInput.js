function TableInput(props) {
    return (
        <>
            <input className="form-control mb-2" onChange={(e) => props.test(e.target.value)} value={props.inputValue} />
        </>
    )
}


export default TableInput;