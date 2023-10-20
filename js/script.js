import {
    get_crystal_containers,
    get_player_container,
    get_element_containers,
    get_newcards_players,
    get_crystal_counters,
    get_bottom_crystal_container,
    get_bottom_button
} from './prefabs.js';


const first_container = document.querySelector('.first');
const second_container = document.querySelector('.second');
const third_container = document.querySelector('.third');
second_container.append(get_player_container());

var gold = 25
var silver = 23


export function playerSelectClick(buttonId) {
    const buttons = document.querySelector('.player');

    buttons.style.opacity = 1;
    buttons.style.scale = '100%';
    buttons.style.animationName = "opacity_on_scale";

    // INIT
    setTimeout(() => {
        buttons.remove();
        first_container.append(get_crystal_containers()[0]);
        first_container.append(get_crystal_containers()[1]);
        first_container.append(get_element_containers());
        first_container.append(get_newcards_players());
        second_container.append(get_crystal_counters());

        count_object_init();
        const player_button = document.getElementById(buttonId).querySelector('img');
        player_button.classList.add('invert');
        if(buttonId === 'first_player') {
            set_counter(1, 0);
        }

        third_container.append(get_bottom_crystal_container())
    }, 800);
}

export function handleCrystallElementClick(button_type, value=0) {    
    if(button_type === 'gold') {
        if(gold >= value) {
            set_counter(value)
            console.log(value);
            addCrystalBottom(button_type, value);
        }
    }
    else if(button_type === 'silver') {
        if(silver >= value) {
            set_counter(0, value);
            addCrystalBottom(button_type, value);
        }
        else {
            var gold_cost = value - silver;
            var add_val = silver;
            if(gold >= gold_cost) {
                set_counter(gold_cost, add_val);
                addCrystalBottom('silver-gold', gold_cost, add_val);
            }
        }
    }
    else {
        const element = document.getElementById(button_type);
        if(element){
            if(element.classList.contains('grayscale_on')) {
                // TODO: в первую очередь!!!
                console.log(element);
            }
        }
    }
}

export function handleBottomButtons(button_type, value, add_val) {
    // TODO: DO IT!
    pass;
}

export function handleButtonClick(button_type, value=0) {
    if(button_type === 'new_cards') {
        if(gold > 0) {
            set_counter(1);
            addCrystalBottom(button_type, value);
        }
    }

    const fp = document.getElementById('first_player').querySelector('img');
    const sp = document.getElementById('second_player').querySelector('img');
    if(button_type === 'first_player' && sp.classList.contains('invert')) {
        if(gold > 0) {
            set_counter(1);
            fp.classList.add('invert');
            sp.classList.remove('invert');
        }
    } 
    if(button_type === 'second_player' && fp.classList.contains('invert')) {
        set_counter(-1);
        fp.classList.remove('invert');
        sp.classList.add('invert');
    }
}

function addCrystalBottom(button_type, value=0, add_val=0) {
    const bottom_buttons_container = document.querySelector('.bottom_crystal_container');
    const bt = get_bottom_button(button_type, value, add_val);
    
    if(button_type === 'new_cards') {
        const new_cards_button = document.getElementById('new_cards');
        if (new_cards_button) {
            const span_text = new_cards_button.querySelector('span')
            const number = Number(span_text.textContent);
            span_text.textContent = number + 1;
            return;
        }
        bt.id = 'new_cards';
    }

    bottom_buttons_container.append(bt);
}

function count_object_init() {
    window.gold_crystall = document.getElementById('gold_crystal');
    window.silver_crystall = document.getElementById('silver_crystal');
    change_counter();
}

function set_counter(_gold=0, _silver=0) {
    gold -= _gold;
    silver -= _silver;
    change_counter();
}

function change_counter() {
    gold_crystall.textContent = gold;
    silver_crystall.textContent = silver;
}

