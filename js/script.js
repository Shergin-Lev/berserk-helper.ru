import {
    get_crystal_containers,
    get_player_container,
    get_element_containers,
    get_newcards_players
} from './prefabs.js';


const first_container = document.querySelector('.first');
const second_container = document.querySelector('.second');
const third_container = document.querySelector('.third');
// main_view.append(get_crystal_containers()[0]);
// main_view.append(get_crystal_containers()[1]);
second_container.append(get_player_container());

var gold = 25
var silver = 23


const gold_crystall = document.getElementById('gold_crystall');
const silver_crystall = document.getElementById('silver_crystall');

// change_counter();

export function playerSelectClick(buttonId) {

    // if(buttonId === 'button1') set_counter(1, 1);
    const buttons = document.querySelector('.player');

    buttons.style.opacity = 1;
    buttons.style.scale = '100%';
    buttons.style.animationName = "opacity_on_scale";

    setTimeout(() => {
        buttons.remove();
        first_container.append(get_crystal_containers()[0]);
        first_container.append(get_crystal_containers()[1]);
        first_container.append(get_element_containers());
        first_container.append(get_newcards_players());
    }, 800);

    
}

function handleCrystallElementClick(button_type, value=0) {
    if(button_type === 'gold') {
        if(gold >= value) {
            gold -= value;
            addCrystalBottom(button_type, value);
        }
    }
    else if(button_type === 'silver') {
        if(silver >= value) {
            silver -= value;
            addCrystalBottom(button_type, value);
        }
        else {
            var gold_cost = value - silver;
            var add_val = silver;
            console.log('gold:', gold_cost, '\nsilver:', add_val);
            if(gold >= gold_cost) {
                silver = 0;
                gold -= gold_cost;
                addCrystalBottom('gold-silver', gold_cost, add_val);
            }
        }
    }
    else {
        if(gold >= 1) {
            const bottom_buttons = document.querySelectorAll('.bottom-block .grid__el');
            gold -= value;
            addCrystalElementBottom(button_type)
        }
    }
}

function addCrystalBottom(button_type, value=0, add_val=0) {
    const bottom_buttons = document.querySelectorAll('.bottom-block .grid__el');
    for(var bt of bottom_buttons) {
        if(bt.classList.length == 1) {
            bt.classList.add(button_type);
            text = value
            if(button_type === 'gold-silver') {
                text = text + ' ' + add_val;
            }
            bt.textContent = text;
            change_counter();
            break;
        }
    }
}

// function set_counter(_gold=0, _silver=0) {
//     gold -= _gold;
//     silver -= _silver;
//     change_counter();
// }

// function change_counter() {
//     gold_crystall.textContent = gold;
//     silver_crystall.textContent = silver;
// }