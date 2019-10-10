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

let cards = document.querySelectorAll('.card');
const buttons = document.querySelectorAll(".button");
const beauty = document.querySelector(".beauty");
const coffeeName = document.querySelector("#coffeeName");
const coffeePrice = document.querySelector("#coffeePrice");
const coffeeVolume = document.querySelector("#coffeeVolume");
const cancelButton = document.querySelector("#cancel");
let cardWasClicked = false;
let buttonWasClicked = false;
let clickedElem;

const cardClickHandler = (card) => {
    if (!cardWasClicked) {
        card.classList.toggle('is-flipped');
        cardWasClicked = !cardWasClicked;
        clickedElem = card;
        console.log(clickedElem.id);
        console.log(coffeeName);
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
        buttonWasClicked = !buttonWasClicked;
        if (buttonWasClicked) {
            console.log(clickedElem.id);
            coffeeName.innerHTML = `Вы заказали: ${menu[clickedElem.id].name}`;
            coffeeVolume.innerHTML = `Объем: ${menu[clickedElem.id].volume}мл`;
            coffeePrice.innerHTML = `К оплате: ${menu[clickedElem.id].price}р`;
            beauty.classList.toggle('is-flipped');
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
        buttonWasClicked ? card.style.pointerEvents = 'none' : card.style.pointerEvents = 'auto';
    })
});

//volumes[menu[menu.length-1].syrup] -= 50;