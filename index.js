const menu = [
    {
        name: "Espresso",
        volume: 100,
        price: 90
    },
    {
        name: "Latte",
        volume: 250,
        milk: 100,
        price: 130
    },
    {
        name: "Cappuccino",
        volume: 250,
        milk: 80,
        price: 110
    },
    {
        name: "Banana Latte",
        volume: 300,
        milk: 100,
        syrup: "banana",
        price: 150
    },
    {
        name: "Vanilla Cappuccino",
        volume: 300,
        milk: 80,
        syrup: "vanilla",
        price: 150
    },
    {
        name: "Flat White",
        volume: 280,
        milk: 120,
        price: 100
    },
    {
        name: "Milk",
        volume: 50,
        price: 25
    },
    {
        name: "Cherry Syrup",
        volume: 50,
        syrup: "cherry",
        price: 35
    }
];

const volumes = {
    milk: 1000,
    vanilla: 500,
    banana: 500,
    cherry: 500
};

const cups = {
    small: {
        volume: 250,
        quantity: 5
    },
    big: {
        volume: 380,
        quantity: 6
    }
};

//================ TODO:данные выше импортятся из другого файла

/*const doWeHaveIngredients = () => {
    //проверка на наличие молока ^
    //проверка на наличие сиропа для авторских ^
    //проверка на наличие сиропа для эспрессо ^
    //проверка на наличие стаканчика ^
    //проверка на то, что кастомный эспрессо влезет в стакан
    let yesWeHave = true;
    let coffee = menu[clickedElem.id];
    if (volumes.milk - coffee.milk - milkQuantityField.value * menu[6].volume < 0) {
        return yesWeHave = false;
    }
    if ((volumes[coffee.syrup]) && (volumes[coffee.syrup] - coffee.syrup < 0)) {
        return yesWeHave = false;
    }
    if (volumes["cherry"] - syrupQuantityField.value * menu[7].volume < 0) {
        return yesWeHave = false;
    }
    if (currentCup.quantity === 0) {
        return yesWeHave = false;
    }
    return yesWeHave;
};*/


let cards = document.querySelectorAll('.card');
const buttons = document.querySelectorAll(".button");
const beauty = document.querySelector(".beauty");
const beautyFaceBack = document.querySelector(".beauty__face--back");
const coffeeName = document.querySelector("#coffeeName");
const coffeePrice = document.querySelector("#coffeePrice");
const coffeeVolume = document.querySelector("#coffeeVolume");
const coffeeAdditiveSyrup = document.querySelector("#additiveSyrup");
const coffeeAdditiveMilk = document.querySelector("#additiveMilk");
const additiveChangers = document.querySelectorAll(".input-group");
const milkMinusButton = document.querySelector(".button-minus.milk");
const milkPlusButton = document.querySelector(".button-plus.milk");
const milkQuantityField = document.querySelector(".quantity-field.milk");
const syrupMinusButton = document.querySelector(".button-minus.syrup");
const syrupPlusButton = document.querySelector(".button-plus.syrup");
const syrupQuantityField = document.querySelector(".quantity-field.syrup");
const cancelButton = document.querySelector("#cancel");
const cashButton = document.querySelector("#cash");

let cardWasClicked = false;
let buttonWasClicked = false;
let clickedElem;
let currentCup;
cashButton.style.pointerEvents = 'none';

const cardClickHandler = (card) => {
    if (!cardWasClicked) {
        card.classList.toggle('is-flipped');
        cardWasClicked = !cardWasClicked;
        clickedElem = card;
    } else {
        if (clickedElem === card) {
            card.classList.toggle('is-flipped');
            cardWasClicked = !cardWasClicked;
        } else {
            clickedElem.classList.toggle('is-flipped');
            card.classList.toggle('is-flipped');
            clickedElem = card;
        }
    }
};

cards.forEach(card => {
    let handler = () => {
        cardClickHandler(card);
    };
    card.addEventListener('click', handler);
});

buttons.forEach(button => {
    button.addEventListener('click', async function () {
        cashButton.style.pointerEvents = 'auto';
        let id = +clickedElem.id;
        if (menu[id].volume <= 250) {
            currentCup = cups.small;
        }
        if ((menu[id].volume > 250) && (cups.big.quantity === 0) && (cups.small.quantity !== 0)) {
            return alert('Простите, закончились подходящие стаканчики. Выберите что-нибудь другое!')
        }
        if ((cups.small.quantity === 0) && (cups.big.quantity !== 0)) {
            currentCup = cups.big;
        }
        if ((menu[id].volume > 250) && (cups.big.quantity !== 0)) {
            currentCup = cups.big;
        }
        if ((cups.small.quantity === 0) && (cups.big.quantity === 0)) {
            return alert('Простите, закончились все стаканчики. Приходите позднее!')
        }
        button.style.visibility = 'hidden';
        buttonWasClicked = !buttonWasClicked;
        if (buttonWasClicked) {
            coffeeName.innerHTML = `${menu[id].name}`;
            coffeeVolume.innerHTML = `${menu[id].volume}`;
            coffeePrice.innerHTML = `${menu[id].price}`;
            beauty.classList.toggle('is-flipped');
            if (id === 0) { //Заказали эспрессо и можем кастомизировать
                additiveChangers.forEach(changer => changer.style.display = 'block');
                beautyFaceBack.style.justifyContent = 'flex-end';
                beautyFaceBack.firstElementChild.style.marginRight = 'auto';
            }
        }
        await setTimeout(() => {
            button.style.visibility = 'visible'
        }, 800); //Чтобы появление кнопки не вызывало глитчи
        await setTimeout(() => {
            cards.forEach(card => {
                card.classList.toggle('inactive');
                card.firstElementChild.classList.toggle('card__face--front');
                card.firstElementChild.classList.toggle('card__face');
                buttonWasClicked ? card.style.pointerEvents = 'none' : card.style.pointerEvents = 'auto';
            })
        }, 400);
    })
});

const cancelButtonHandler =() => {
    console.log('canceled');
    beauty.classList.toggle('is-flipped');
    buttonWasClicked = false;
    cardWasClicked = false;
    cashButton.style.pointerEvents = 'none';
    cards.forEach(card => {
        card.classList.toggle('inactive');
        card.firstElementChild.classList.toggle('card__face--front');
        card.firstElementChild.classList.toggle('card__face');
        additiveChangers.forEach(changer => changer.style.display = 'none');
        beautyFaceBack.style.justifyContent = 'space-around';
        beautyFaceBack.firstElementChild.style.marginRight = '0';
        milkQuantityField.value = '0';
        syrupQuantityField.value = '0';
        whatWeShouldPrint();
        buttonWasClicked ? card.style.pointerEvents = 'none' : card.style.pointerEvents = 'auto';
    })
};

cancelButton.addEventListener('click', () => {
    cancelButtonHandler();
});

const whatWeShouldPrint = () => {
    if (+milkQuantityField.value !== 0) {
        coffeeAdditiveMilk.innerHTML = (+syrupQuantityField.value === 0 ? ' с молоком' : ' с молоком и ');
    } else {
        coffeeAdditiveMilk.innerHTML = ''
    }
    switch (syrupQuantityField.value) {
        case '1':
            coffeeAdditiveSyrup.innerHTML = ' с одной порцией сиропа';
            break;
        case '2':
            coffeeAdditiveSyrup.innerHTML = ' с двумя порциями сиропа';
            break;
        default:
            coffeeAdditiveSyrup.innerHTML = '';
    }
};

const additiveChangeHandler = (additive, value) => {
    let quantity;
    let whatWeAdd;
    let volume = +coffeeVolume.innerHTML;
    let price = +coffeePrice.innerHTML;
    if (additive === 'milk') {
        quantity = milkQuantityField;
        whatWeAdd = menu[6];
        if ((value === '+') && (volumes.milk <= quantity.value * 50)) {
            milkPlusButton.setAttribute("disabled", "disabled");
            return alert('Не могу добавить еще молока, оно закончилось');
        }
    } else if (additive === 'syrup') {
        quantity = syrupQuantityField;
        whatWeAdd = menu[7];
        if ((value === '+') && (volumes.cherry <= quantity.value * 50)) {
            syrupPlusButton.setAttribute("disabled", "disabled");
            return alert('Не могу добавить еще сиропа, он закончился');
        }
    }
    if ((value === '+') && (quantity.value < quantity.max)) {
        const canWeIncreaseAdditive = () => {
            if ((currentCup.volume === 250) && (volume === 250)) {
                if (cups.big.quantity > 0) {
                    currentCup = cups.big;
                } else {
                    milkPlusButton.setAttribute("disabled", "disabled");
                    syrupPlusButton.setAttribute("disabled", "disabled");
                    alert('Отсутствуют стаканчики большего размера. Оплачивайте или измените заказ!');
                    return false;
                }
            }
            if (volume === 350) {
                milkPlusButton.setAttribute("disabled", "disabled");
                syrupPlusButton.setAttribute("disabled", "disabled");
                alert('Достигнут максимальный объем напитка. Оплачивайте!');
            }
            if ((volume <= 300)) {
                return true;
            }
        };
        if (canWeIncreaseAdditive()) {
            quantity.value = `${++quantity.value}`;
            coffeeVolume.innerHTML = volume + whatWeAdd.volume;
            coffeePrice.innerHTML = `${price + whatWeAdd.price}`;
        }
    }
    if ((value === '-') && (quantity.value > 0)) {
        quantity.value = `${--quantity.value}`;
        coffeeVolume.innerHTML = `${volume - whatWeAdd.volume}`;
        coffeePrice.innerHTML = `${price - whatWeAdd.price}`;
        milkPlusButton.removeAttribute("disabled");
        syrupPlusButton.removeAttribute("disabled");
        if ((volume <= 250) && (cups.small.quantity > 0)) {
            currentCup = cups.small;
        }
    }
    if (quantity.value === quantity.max) {
        syrupPlusButton.setAttribute("disabled", "disabled");
    }
    whatWeShouldPrint();
};

milkPlusButton.addEventListener('click',
    () => additiveChangeHandler('milk', milkPlusButton.value));

milkMinusButton.addEventListener('click',
    () => additiveChangeHandler('milk', milkMinusButton.value));

syrupPlusButton.addEventListener('click',
    () => additiveChangeHandler('syrup', syrupPlusButton.value));

syrupMinusButton.addEventListener('click',
    () => additiveChangeHandler('syrup', syrupMinusButton.value));

cashButton.addEventListener('click', () => {
    let id = +clickedElem.id;
    let coffee = menu[id];
    /*    let price = +coffeePrice.innerHTML;  */
    if ((coffee.syrup !== undefined) || (id === 0)) {
        id === 0 ? (
            volumes['cherry'] -= +syrupQuantityField.value * menu[7].volume
        ) : (
            volumes[coffee.syrup] -= 50
        );
    }
    if ((coffee.milk !== undefined) || (id === 0)) {
        id === 0 ? (
            volumes.milk -= +milkQuantityField.value * menu[6].volume
        ) : (
            volumes.milk -= coffee.milk
        );
    }
    currentCup.quantity -= 1;
    cancelButtonHandler();
    cashButton.style.pointerEvents = 'none';
    console.log(volumes);
    console.log(cups);

});

const ProgressBar = require('progressbar.js');
let bar = new ProgressBar.Line(container, {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 5000,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: {width: '100%', height: '100%'},
    text: {
        style: {
            // Text color.
            // Default: same as stroke color (options.color)
            color: '#999',
            position: 'absolute',
            right: '0',
            top: '30px',
            padding: 0,
            margin: 0,
            transform: null
        },
        autoStyleContainer: false
    },
    from: {color: '#FFEA82'},
    to: {color: '#ED6A5A'},
    step: (state, bar) => {
        bar.setText(Math.round(bar.value() * 100) + ' %');
    }
});

bar.animate(1.0);