import {get_crystal_containers, get_player_container} from './prefabs.js';


const main_view = document.querySelector('body');
main_view.append(get_crystal_containers()[0]);
main_view.append(get_crystal_containers()[1]);
// main_view.append(get_player_container());

var gold = 25
var silver = 23

const container = document.querySelector('.container');

const gold_crystall = document.getElementById('gold_crystall');
const silver_crystall = document.getElementById('silver_crystall');

change_counter();

export function handleButtonClick(buttonId) {

    // if(buttonId === 'button1') set_counter(1, 1);

    // const center_content = document.getElementById('center-content');
    // const bottom_content = document.getElementById('bottom-content');
    // const buttons = document.querySelector('.buttons');

    // buttons.classList.add('animate-out');

    // setTimeout(() => {
    //     buttons.style.display = 'none';
    //     center_content.style.display = 'block';
    //     bottom_content.style.display = 'block';

    //     center_content.classList.add('animate-in');
    //     bottom_content.classList.add('animate-in');
        
    //     setTimeout(() => {
    //         center_content.classList.add('show');
    //         bottom_content.classList.add('show');
    //     }, 100);
    //     buttons.remove();
    // }, 300);
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

function set_counter(_gold=0, _silver=0) {
    gold -= _gold;
    silver -= _silver;
    change_counter();
}

function change_counter() {
    gold_crystall.textContent = gold;
    silver_crystall.textContent = silver;
}