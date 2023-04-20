const val1 = document.getElementById('val1')
const val2 = document.getElementById('val2')
const val3 = document.getElementById('val3')
const statusDisplay = document.getElementById('statusDisplay')

const numbers = [val1,val2,val3]

const performArithmetics = () => {
    const [firstNum, secondNum, thirdNum] = numbers.map(val => parseInt(val.value))
    
    if (isNaN(firstNum) || isNaN(secondNum) || isNaN(thirdNum)) {
        statusDisplay.innerHTML = 'Please enter valid numbers.'
        return
    }
    
    const sortedNums = [firstNum, secondNum, thirdNum].sort((a, b) => a - b)
    const [low, median, high] = sortedNums
    const average = (sortedNums.reduce((acc, curr) => acc + curr, 0) / sortedNums.length).toFixed(2)
    const range = high - low
    
    updateDisplay(high, low, median, average, range)
}

const updateDisplay = (high, low, median, average, range) => {
    statusDisplay.innerHTML = `
        High: ${high}, 
        Low: ${low}, 
        Median: ${median}, 
        Average: ${average}, 
        Range: ${range}`
}

