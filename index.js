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

let clicked = false;
let clickedElem;
let clickedID;

let cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', function () {
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
    });
});


//volumes[menu[menu.length-1].syrup] -= 50;

console.log(volumes);