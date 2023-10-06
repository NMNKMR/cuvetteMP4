const expression = document.querySelector('.screen');
const deleteButton = document.getElementById('delete');
const resetButton = document.getElementById('reset');
const calculate = document.getElementById('calculate');
let resultFlag = false;

function enableDecimal() {
    document.getElementsByClassName('gray-keys')[11].classList.remove('disabled')
}

resetButton.onclick = () => {
    expression.textContent = '0';
    enableDecimal();
}

document.querySelector('.num-pad').onclick = function (e) {
    if (e.target.className === 'gray-keys') {
        
        let keyText = e.target.textContent;
        let key = Number(keyText);
        const isNumber = !isNaN(key);
    
        if(isNumber && (expression.textContent === "0" || resultFlag)) {
            expression.textContent = keyText
        }
        else if (isNumber || keyText === '.') {
            if(keyText === '.') {
                document.getElementsByClassName('gray-keys')[11].classList.add('disabled')
                if(resultFlag) expression.textContent = '0';
            };
            expression.textContent += keyText;
            
        }
        else {
            let expLen = expression.textContent.length;
            (expression.textContent.charAt(expLen - 1) === " ") ? 
            expression.textContent = expression.textContent.substring(0, expLen - 3) + ` ${keyText} ` : 
            expression.textContent += ` ${keyText} `;
            enableDecimal();
        }

        //checkOverflow();
        if(resultFlag) resultFlag = false; 
    }
}

deleteButton.onclick = function () {
    let expText = expression.textContent;
    let expLen = expText.length;
    if (expLen === 1 || resultFlag) expression.textContent = '0';
    else if(expText.charAt(expLen-1) === " ") {
        expression.textContent = expText.substring(0, expLen - 3)
    }
    else {
        if(expText.charAt(expLen-1) === '.') enableDecimal();
        expression.textContent = expText.substring(0, expLen - 1);
    }
}

calculate.onclick = () => {
    let modifiedExp = expression.textContent.replace(/x/g, '*');
    let answer = eval(modifiedExp);
    expression.textContent = (Number.isInteger(answer))? answer : answer.toFixed(3);
    resultFlag = true;
}

// function checkOverflow() {
//     if(expression.clientWidth < expression.scrollWidth) {
//         console.log("Overflows");
//         expression.textContent = "Input Error: Too Long"
//         resultFlag = true;
//     }
// }