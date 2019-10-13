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
        volume:250,
        quantity:5
    },
    big: {
        volume:380,
        quantity:6
    }
};

//================ TODO:данные выше импортятся из другого файла

/*const canWeMakeCoffee = () => {
    //проверка на наличие молока ^
    //проверка на наличие сиропа
    //проверка на наличие стаканчика
    //проверка на то, что это влезет в стакан
    let yesWeCan = true;
    let coffee = menu[clickedElem.id];
    if (volumes.milk - coffee.milk - milkQuantityField.value * menu[6].volume <= 0) {
        return yesWeCan = false;
    }
    if (volumes[coffee.syrup] === )
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

let cardWasClicked = false;
let buttonWasClicked = false;
let clickedElem;
let currentCup = cups.small;

const cardClickHandler = (card) => {
    if (!cardWasClicked) {
        card.classList.toggle('is-flipped');
        cardWasClicked = !cardWasClicked;
        clickedElem = card;
    } else {
        if (clickedElem === card) {
            card.classList.toggle('is-flipped');
            cardWasClicked = !cardWasClicked;
            clickedElem = '';
        } else {
            clickedElem.classList.toggle('is-flipped');
            card.classList.toggle('is-flipped');
            clickedElem = card;
            console.log(clickedElem.id);
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
        button.style.visibility = 'hidden';
        let id = +clickedElem.id;
        console.log(clickedElem)
        buttonWasClicked = !buttonWasClicked;
        if (buttonWasClicked) {
            console.log(id);
            console.log(additiveChangers);
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
            cards.forEach(card => {
                card.classList.toggle('inactive');
                card.firstElementChild.classList.toggle('card__face--front');
                card.firstElementChild.classList.toggle('card__face');
                buttonWasClicked ? card.style.pointerEvents = 'none' : card.style.pointerEvents = 'auto';
            })
        }, 400);

        button.style.visibility = 'visible';
        console.log(clickedElem); //???
    })
});

cancelButton.addEventListener('click', () => {
    console.log('canceled');
    beauty.classList.toggle('is-flipped');
    buttonWasClicked = false;
    cardWasClicked = false;
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
/*
const milkChangeHandler = (value) => {
    let quantity = +milkQuantityField.value;
    if (value === '+') {
        milkQuantityField.value = `${++quantity}`;
        coffeeVolume.innerHTML = +coffeeVolume.innerHTML + menu[6].volume;
        coffeePrice.innerHTML = +coffeePrice.innerHTML + menu[6].price;
    } else if ((value === '-') && (quantity > 0)) {
        milkQuantityField.value = `${--quantity}`;
        coffeeVolume.innerHTML = +coffeeVolume.innerHTML - menu[6].volume;
        coffeePrice.innerHTML = +coffeePrice.innerHTML - menu[6].price;
    }
    whatWeShouldPrint();
};*/

/*
const syrupChangeHandler = (value) => {
    let quantity = +syrupQuantityField.value;
    if ((value === '+') && (quantity < syrupQuantityField.max)) {
        syrupQuantityField.value = `${++quantity}`;
        coffeeVolume.innerHTML = +coffeeVolume.innerHTML + menu[7].volume;
        coffeePrice.innerHTML = +coffeePrice.innerHTML + menu[7].price;
    } else if ((value === '-') && (quantity > 0)) {
        syrupQuantityField.value = `${--quantity}`;
        coffeeVolume.innerHTML = +coffeeVolume.innerHTML - menu[7].volume;
        coffeePrice.innerHTML = +coffeePrice.innerHTML - menu[7].price;
    }
    whatWeShouldPrint();
};*/






const additiveChangeHandler = (additive, value) => {
    let quantity;
    let whatWeAdd;
    if (additive === 'milk') {
        quantity = milkQuantityField;
        whatWeAdd = menu[6];
    } else if (additive === 'syrup'){
        quantity = syrupQuantityField;
        whatWeAdd = menu[7];
    }
    if ((value === '+') && (quantity.value < quantity.max)) {
        quantity.value = `${++quantity.value}`;
        coffeeVolume.innerHTML = +coffeeVolume.innerHTML + whatWeAdd.volume;
        coffeePrice.innerHTML = +coffeePrice.innerHTML + whatWeAdd.price;
    } else if ((value === '-') && (quantity.value > 0)) {
        quantity.value = `${--quantity.value}`;
        coffeeVolume.innerHTML = +coffeeVolume.innerHTML - whatWeAdd.volume;
        coffeePrice.innerHTML = +coffeePrice.innerHTML - whatWeAdd.price;
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