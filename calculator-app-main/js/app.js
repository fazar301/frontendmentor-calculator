const form = document.querySelector('form.calc');
const input = document.querySelector('input[type="text"]')
const buttons = document.querySelectorAll('.key button')

const ball = document.querySelector('.ball')
const btnToggle = document.querySelectorAll('.formtoggle button');

form.addEventListener('submit',e => e.preventDefault());

// delete function
const popStr = (str) => str.substr(0, str.length -1);
// calc function
const result = (value) => {
    value = value.replace(/,/g,'');
    if(eval(value) === undefined) return '';
    if(eval(value) % 1 !== 0){
        return eval(value).toFixed(2);
    }
    if(eval(value) >= 1000){
        return numberWithCommas(eval(value));
    }
    return eval(value);
};
// thousand separator function
const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// key button
buttons.forEach(e => {
    e.addEventListener('click', () => {
        switch(e.value){
            case 'del':
                input.value = popStr(input.value);
                break;
            case 'reset':
                input.value = '';
                break;
            case '=':
                input.value = result(input.value);
                break;
            default:
                input.value += e.value;
        }
    })
})

// click effect
buttons.forEach(e => {
    e.addEventListener('mousedown', (el) => {
        el.target.classList.add('clicked')
    })
    e.addEventListener('mouseup', (el) => {
        el.target.classList.remove('clicked')
    })
})

// toggle button

btnToggle.forEach(e => e.addEventListener('click', () => {
    const coor = (e.getBoundingClientRect().left - e.parentElement.parentElement.getBoundingClientRect().left) - 4
    ball.style.transform = `translateX(${Math.floor(coor) < 5 ? 0 : Math.floor(coor)}px)`
    document.body.removeAttribute('class');
    if(e.textContent === '2'){
        document.body.classList.add('theme2')
    }else if(e.textContent === '3'){
        document.body.classList.add('theme3')
    }
}))