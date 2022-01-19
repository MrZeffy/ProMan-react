const isEmptyInput = (...inputs) => {

    for (let entry of inputs) {
        if (!entry || entry === '') {
            console.log('Saying missing for ', entry);
            return true;
        }
    }

    return false;
}


const getDateTimeString = (date) => {
    let parsedData = date.toISOString().split('T');
    let dateString = parsedData[0];
    let timeString = parsedData[1].slice(0, 8);

    return `${dateString} ${timeString}`;
}

module.exports = {
    isEmptyInput,
    getDateTimeString
}