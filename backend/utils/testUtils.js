const getDummyTask = () => {
    var deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + 30);

    let taskDetails = {
        taskTitle: 'Task 1',
        taskDeadline: deadlineDate,
        taskDescription: 'Dummy description',
    }
    return taskDetails;
}

module.exports = {
    getDummyTask
}