import {
    get_crystal_containers,
    get_logo_container,
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

first_container.append(get_logo_container());
second_container.append(get_player_container());

const crystall_quantity = 15;
var gold = 25
var silver = 23


export function playerSelectClick(buttonId) {
    const buttons = document.querySelector('.player');
    const logo = document.querySelector('.logo');

    buttons.style.opacity = 1;
    buttons.style.scale = '100%';
    buttons.style.animationName = 'opacity_on_scale';

    logo.style.opacity = 1;
    logo.style.scale = '100%';
    logo.style.animationName = 'opacity_on_scale';

    // INIT
    setTimeout(() => {
        buttons.remove();
        logo.remove();
        first_container.append(get_crystal_containers()[0]);
        first_container.append(get_crystal_containers()[1]);
        first_container.append(get_element_containers());
        first_container.append(get_newcards_players());
        second_container.append(get_crystal_counters());

        count_object_init();
        const player_button = document.getElementById(buttonId).querySelector('img');
        player_button.classList.add('invert');
        if(buttonId === 'first_player') {
            set_counter(1, 1);
        }

        third_container.append(get_bottom_crystal_container())
    }, 800);
}

export function handleCrystallElementClick(button_type, value=0) {
    if(button_type === 'gold' && check_crystall_quantity() < crystall_quantity) {
        if(gold >= value) {
            set_counter(value)
            addCrystalBottom(button_type, value);
        }
    }
    else if(button_type === 'silver'  && check_crystall_quantity() < crystall_quantity) {
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
            let cost = 0;
            let quantity = check_element_button_on();
            if(element.classList.contains('grayscale_on') && gold > 0) {            
                if(quantity >= 1) cost = 1;
                if(gold >= cost) element.classList.remove('grayscale_on');
            }
            else if (!element.classList.contains('grayscale_on') && !element.classList.contains('grayscale_on_and_blur')) {
                if(quantity > 1) cost = -1;
                element.classList.add('grayscale_on');
            }
            set_counter(cost);
        }
    }
}

function check_crystall_quantity() {
    const elements_on = document.querySelectorAll('.bottom_crystal_container .crystal');
    return elements_on.length;
}

function check_element_button_on() {
    const elements_on = document.querySelectorAll('.element_container .mini_button:not(.grayscale_on)');
    return elements_on.length;
}

export function handleBottomButtons(button_type, value, add_val, bottom_button) {
    if(button_type === 'silver') {
        set_counter(0, -value);
    } else if(button_type === 'gold') {
        set_counter(-value);
    } else if(button_type === 'silver-gold') {
        set_counter(-value, -add_val);
    } else if(button_type === 'new_cards') {
        const new_cards_button = document.getElementById('new_cards');
        if (new_cards_button) {
            const span_text = new_cards_button.querySelector('span')
            const number = Number(span_text.textContent);
            set_counter(-1);
            if (number == 1) {
                new_cards_button.remove();
                return;
            }
            span_text.textContent -= 1;
            return;
        }
    }
    bottom_button.remove();
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
        if(gold > 0 && silver > 0) {
   
            fp.classList.add('invert');
            sp.classList.remove('invert');
            set_counter(1, 1);
        }
    } 
    
    if(button_type === 'second_player' && fp.classList.contains('invert')) {     
        fp.classList.remove('invert');
        sp.classList.add('invert');
        set_counter(-1, -1);
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
    check_crystal_activ();
}

function change_counter() {
    gold_crystall.textContent = gold;
    silver_crystall.textContent = silver;
}

function check_crystal_activ() {
    const all_crystall = document.querySelectorAll('.mini_button');
    const elements_name = ['forests', 'mountains', 'plains', 'swamps', 'darkness'];

    // .grayscale_on_and_blur
    for (let i = 0; i < all_crystall.length; i++) {
        const id = all_crystall[i].id;
        let num = parseInt(id.split('_')[1]);
        const crystal_type = id.split('_')[0];

        if (gold < num) {
            if (crystal_type === 'silver' && gold + silver >= num) {
                activate_crystal(all_crystall[i]);
            } else {
                deactivate_crystal(all_crystall[i]);
            }
        } else {
            activate_crystal(all_crystall[i]);
        }

        if (elements_name.includes(crystal_type)) {
            if (gold === 0 && all_crystall[i].classList.contains('grayscale_on')) {
                all_crystall[i].classList.remove('grayscale_on');
                all_crystall[i].classList.add('grayscale_on_and_blur');
            } else if (gold > 0 && all_crystall[i].classList.contains('grayscale_on_and_blur')) {
                all_crystall[i].classList.remove('grayscale_on_and_blur');
                all_crystall[i].classList.add('grayscale_on');
            }
        }

        if (all_crystall[i].id === 'new_card') {
            if (gold === 0 && !all_crystall[i].classList.contains('diactivated_button')) {
                deactivate_crystal(all_crystall[i]);
            } else {
                activate_crystal(all_crystall[i]);
            }
        }

        if (all_crystall[i].id === 'first_player') {
            const sp_img = document.getElementById('second_player').querySelector('img');
            if ((gold === 0 || silver === 0) && sp_img.classList.contains('invert')) {
                deactivate_crystal(all_crystall[i]);
            } else if (sp_img.classList.contains('invert')) {
                activate_crystal(all_crystall[i]);
            }
        }
    }
}

function activate_crystal(ctystal_button) {
    if (ctystal_button.classList.contains('diactivated_button')) {
        ctystal_button.classList.remove('diactivated_button');
    }
}

function deactivate_crystal(ctystal_button) {
    if (ctystal_button.classList.contains('diactivated_button')) return;
    ctystal_button.classList.add('diactivated_button');
}