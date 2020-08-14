
let radioVal='init'


function doAll(){
    getRadioValues()
    console.log('RESULTS', getValue())

}
function getRadioValues() {
    console.log('********')
    let element = document.getElementsByName('sort')
    console.log('ELEMENT', element)

    for (let index = 0; index < element.length; index++) {
        if (element[index].checked) {
            radioVal = element[index].value
            let isChecked = element[index].checked
            console.log('RESULT', radioVal)
            console.log('isChecked', isChecked)
        }

    }
}

function getValue(){
    return radioVal;
}