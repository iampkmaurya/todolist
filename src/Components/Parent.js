import Child from "./Child";

function Parent() {
    function fromChild(test) {
        console.log(test, 'from Child function')
    }
    return (
        <>
            <h1> From Parent</h1>
            <Child maz={341234} fromChild={fromChild} />
        </>

    )

}


export default Parent;