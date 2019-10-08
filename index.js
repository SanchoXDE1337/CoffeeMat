const menu = [
    {
        name: "espresso",
        volume: 100,
        price: 90
    },
    {
        name: "latte",
        volume: 250,
        milk: 100,
        price: 130
    },
    {
        name: "cappuccino",
        volume: 250,
        milk: 80,
        price: 110
    },
    {
        name: "banana latte",
        volume: 300,
        milk: 100,
        syrup: "banana",
        price: 150
    },
    {
        name: "vanilla cappuccino",
        volume: 300,
        milk: 80,
        syrup: "vanilla",
        price: 150
    },
    {
        name: "flat white",
        volume: 280,
        milk: 120,
        price: 100
    },
    {
        name: "milk",
        volume: 50,
        price: 25
    },
    {
        name: "cherry syrup",
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

const beauty = document.querySelector(".beauty");
let clicked = false;
let buttonWasClicked = false;
let clickedElem;

const cardClickHandler = (card) => {
    if (!clicked) {
        card.classList.toggle('is-flipped');
        clicked = !clicked;
        clickedElem = card;
        console.log(clickedElem.id);
    } else {
        if (clickedElem === card) {
            card.classList.toggle('is-flipped');
            clicked = !clicked;
            clickedElem = '';
        } else {
            clickedElem.classList.toggle('is-flipped');
            card.classList.toggle('is-flipped');
            clickedElem = card;
            console.log(clickedElem.id);
        }
    }
};


let cards = document.querySelectorAll('.card');
cards.forEach(card => {
    let handler = () => {
        cardClickHandler(card);
    };
    card.addEventListener('click', handler);
});

let buttons = document.querySelectorAll(".button");
buttons.forEach(button => {
    button.addEventListener('click', function () {
        button.style.visibility = 'hidden';
        buttonWasClicked = !buttonWasClicked;
        if (buttonWasClicked) {
            beauty.classList.toggle('is-flipped');
        }
        setTimeout(() => {
            cards.forEach(card => {
                card.classList.toggle('inactive');
                card.classList.toggle('card__face--front');
                card.classList.toggle('card');
                buttonWasClicked ? card.style.pointerEvents = 'none' : card.style.pointerEvents = 'auto';
            })
        }, 400);
    })
});

//volumes[menu[menu.length-1].syrup] -= 50;