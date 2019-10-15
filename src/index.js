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
        milk: 50,
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
const coffeeCup = document.querySelector(".coffeeCup");
const cookingField = document.querySelector(".cooking");
const audio = document.querySelector("#audio");

let cardWasClicked = false;
let buttonWasClicked = false;
let clickedElem;
let currentCup;
let takeAwayCoffee = false;
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
    button.addEventListener('click', function () {
        let id = +clickedElem.id;
        let success = true;
        if (menu[id].volume <= 250) {
            currentCup = cups.small;
        }
        if ((menu[id].volume > 250) && (cups.big.quantity === 0) && (cups.small.quantity !== 0)) {
            success = false;
            return alert('Простите, закончились подходящие стаканчики. Выберите что-нибудь другое!')
        }
        if ((cups.small.quantity === 0) && (cups.big.quantity !== 0)) {
            currentCup = cups.big;
        }
        if ((menu[id].volume > 250) && (cups.big.quantity !== 0)) {
            currentCup = cups.big;
        }
        if ((cups.small.quantity === 0) && (cups.big.quantity === 0)) {
            success = false;
            return alert('Простите, закончились все стаканчики. Приходите позднее!')
        }
        if ((volumes.milk - menu[id].milk < 0) || (volumes[menu[id].syrup] < 50)) {
            success = false;
            return alert('Простите, закончился ингридиент для этого напитка. Выберите что-нибудь другое!')
        }
        button.style.visibility = 'hidden';
        buttonWasClicked = !buttonWasClicked;
        if (buttonWasClicked) {
            coffeeName.innerHTML = `${menu[id].name}`;
            coffeeVolume.innerHTML = `${menu[id].volume}`;
            coffeePrice.innerHTML = `${menu[id].price}`;
            beauty.classList.toggle('is-flipped');
            if ((id === 0) || (id === 6)) { //Заказали эспрессо или молоко и можем кастомизировать
                id === 0 ? (
                    additiveChangers.forEach(changer => changer.style.display = 'block')
                ) : (
                    additiveChangers[0].style.display = 'block'
                );
                beautyFaceBack.style.justifyContent = 'flex-end';
                beautyFaceBack.firstElementChild.style.marginRight = 'auto';
            }
        }
        setTimeout(() => {
            button.style.visibility = 'visible'
        }, 800); //Чтобы появление кнопки не вызывало глитчи
        setTimeout(() => {
            cards.forEach(card => {
                card.classList.toggle('inactive');
                card.firstElementChild.classList.toggle('card__face--front');
                card.firstElementChild.classList.toggle('card__face');
                buttonWasClicked ? card.style.pointerEvents = 'none' : card.style.pointerEvents = 'auto';
            })
        }, 400);
        if (success) {
            cashButton.style.pointerEvents = 'auto';
        }
    })
});

const cancelButtonHandler = () => {
    beauty.classList.toggle('is-flipped');
    buttonWasClicked = false;
    cardWasClicked = false;
    cashButton.style.pointerEvents = 'none';
    milkPlusButton.removeAttribute("disabled");
    syrupPlusButton.removeAttribute("disabled");
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
    if (+clickedElem.id === 6) {
        return null;
    }
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
        if ((value === '+') && (volumes.milk <= quantity.value * 50) ||
            (+clickedElem.id === 6) && (volumes.milk <= (+quantity.value + 1) * 50)) {
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

cashButton.addEventListener('click', async () => {
    let id = +clickedElem.id;
    let coffee = menu[id];
    if ((coffee.syrup !== undefined) || (id === 0)) {
        id === 0 ? (
            volumes['cherry'] -= +syrupQuantityField.value * menu[7].volume
        ) : (
            volumes[coffee.syrup] -= 50
        );
    }
    if ((coffee.milk !== undefined) || (id === 0)) {
        (id === 0) || (id === 6) ? (
            volumes.milk -= +milkQuantityField.value * menu[6].volume + coffee.milk
        ) : (
            volumes.milk -= coffee.milk
        );
    }
    currentCup.quantity -= 1;

    let cookingDuration;

    const ProgressBar = require('progressbar.js');
    let bar = new ProgressBar.Line(progressBar, {
        strokeWidth: 4,
        easing: 'linear',
        duration: (function () {
            if ((id === 0) && (+syrupQuantityField.value > 0) || (+milkQuantityField.value > 0)) {
                cookingDuration = 8000;
                return 8000;
            } else if ((id >= 0) && (id <= 2)) {
                cookingDuration = 3000;
                return 3000;
            } else if ((id >= 3) && (id <= 6)) {
                cookingDuration = 5000;
                return 5000;
            }
        })(),
        color: '#7cfc00',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: {width: '100%', height: '100%'},
        text: {
            style: {
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
        step: (state, bar) => {
            bar.setText(Math.round(bar.value() * 100) + ' %');
        }
    });

    milkPlusButton.removeAttribute("disabled");
    syrupPlusButton.removeAttribute("disabled");
    cancelButtonHandler();
    cashButton.style.pointerEvents = 'none';
    console.log(volumes);
    console.log(cups);
    cookingField.style.display = 'flex';
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });

    bar.animate(1.0);

    coffeeCup.style.background = (function (id) {
        switch (id) {
            case 0:
                return 'url(https://teremok.ru/upload/iblock/4b4/5709d5f2-bb2b-11e8-af7c-001517db825c.png) no-repeat center';
            case 1:
                return 'url(http://www.myasnov.ru/upload/iblock/dca/dcaced1abb3f68ed28308cbdb199a490.png) no-repeat center';
            case 2:
                return 'url(http://pngimg.com/uploads/cappuccino/cappuccino_PNG28.png) no-repeat center';
            case 3:
                return 'url(https://www.realingredients.com/wp-content/uploads/sites/2/2017/11/banana-latte.png) no-repeat center';
            case 4:
                return 'url(https://cdn.imgbin.com/22/2/24/imgbin-cappuccino-ZXshKhxtmsVddnwyiGmE7sSWj.jpg) no-repeat center';
            case 5:
                return 'url(https://banner2.cleanpng.com/20180226/goq/kisspng-instant-coffee-latte-cafe-milk-coffee-drink-drinks-milk-5a93a44613a2b4.8262184515196252860804.jpg) no-repeat center';
            case 6:
                return 'url(http://www.pngall.com/wp-content/uploads/2016/06/Milk-PNG-Clipart.png) no-repeat center';
        }
    })(id);
    takeAwayCoffee = false;

    await setTimeout(() => {
        progressBar.innerHTML = '';
        coffeeCup.style.display = 'block';
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "auto"
        });
    }, cookingDuration);
    await setTimeout(() => {
        if (!takeAwayCoffee) {
            audio.play();
        }
    }, (cookingDuration + 5000));
    await setTimeout(() => {
        if (!takeAwayCoffee) {
            coffeeCup.style.borderColor = '#000';
            coffeeCup.style.animationPlayState = 'paused';
            alert('Напиток в зоне выдачи');
        }
    }, (cookingDuration + 20000))
});

coffeeCup.addEventListener('click', () => {
    takeAwayCoffee = true;
    coffeeCup.style.animationPlayState = 'running';
    coffeeCup.style.display = 'none';
    cookingField.style.display = 'none';
    audio.load();
});


