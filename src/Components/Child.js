function Child(props) {

    return (
        <>
            <h1 onClick={(e) => props.fromChild(1231)}> From Child</h1>



        </>

    )

}


export default Child;