const nextTickAsync = async (count) => {
    for (let index = 0; index < count; index++){
        console.log("Am at index "+index)
    }
}


nextTickAsync(1000);
console.log("Hellllloooo")