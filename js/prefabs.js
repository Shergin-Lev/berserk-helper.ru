import {playerSelectClick} from './script.js';

function get_minibutton(crystal_type) {
    let cr = document.createElement('div');    
    
    let img = document.createElement('img');
    img.src = `image/${crystal_type}.png`;
    img.alt = crystal_type[0].toUpperCase();

    cr.append(img);

    return cr;
}

function get_crystal_span(value) {
    let span = document.createElement('span');
    span.className = 'crystal_value';
    span.textContent = value;
    
    return span;
}



export function get_player_container() {
    const player_container = document.createElement('div');
    player_container.className = 'player';

    const first_player_button = document.createElement('div');
    first_player_button.className = 'player_button';
    first_player_button.addEventListener('click', function() {
        playerSelectClick('first_player');
    })

    const second_player_button = document.createElement('div');
    second_player_button.className = 'player_button';
    second_player_button.addEventListener('click', function() {
        playerSelectClick('second_player');
    })

    const first_player_image = document.createElement('img');
    first_player_image.src = 'image/first.png';
    first_player_image.alt = 'first_player';

    const second_player_image = document.createElement('img');
    second_player_image.src = 'image/second.png';
    second_player_image.alt = 'second_player';

    first_player_button.append(first_player_image);
    second_player_button.append(second_player_image);
    player_container.append(first_player_button);
    player_container.append(second_player_button);

    return player_container;
}

export function get_crystal_containers() {
    const gold_crystal_container = document.createElement('div');
    gold_crystal_container.className = 'crystal_container';

    const silver_crystall_container = document.createElement('div');;
    silver_crystall_container.className = 'crystal_container';

    const gold_crystal = document.createElement('div');
    gold_crystal.className = 'gold_crystal';

    const silver_crystal = document.createElement('div');
    silver_crystal.className = 'silver_crystal';

    let crystal_number = 1;

    while(crystal_number <= 10) {
        let g_cr = get_minibutton('gold');
        g_cr.className = 'mini_button';
        g_cr.id = 'gold_' + crystal_number;
        g_cr.addEventListener('click', function() {
            handleButtonClick('gold_' + crystal_number);
        })
        g_cr.append(get_crystal_span(crystal_number));
        gold_crystal_container.append(g_cr);        

        let s_cr = get_minibutton('silver');
        s_cr.className = 'mini_button';
        s_cr.id = 'silver_' + crystal_number;
        s_cr.addEventListener('click', function() {
            handleButtonClick('silver_' + crystal_number);
        })
        s_cr.append(get_crystal_span(crystal_number));
        silver_crystall_container.append(s_cr);
        crystal_number += 1;
    }

    console.log(gold_crystal_container);

    return [gold_crystal_container, silver_crystall_container];
}

export function get_element_containers() {
    const element_container = document.createElement('div');
    element_container.className = 'element_container';

    const element_object = document.createElement('div');
    element_object.className = 'element';

    let elements_name = ['forests', 'mountains', 'plains', 'swamps', 'darkness'];
    
    for (let i = 0; i < elements_name.length; i++) {
        let element = get_minibutton(elements_name[i]);
        element.className ='mini_button';
        element.id = elements_name[i] + '_button';
        element.addEventListener('click', function() {
            handleButtonClick(elements_name[i]);
        })
        element_container.append(element);
    }

    return element_container;
}

export function get_newcards_players() {
    const newcards_players_container = document.createElement('div');
    newcards_players_container.className ='newcards_players_container';

    const new_cards = get_minibutton('new_cards');    
    new_cards.className = 'mini_button';
    new_cards.append();
    new_cards.addEventListener('click', function() {
        handleButtonClick('new_cards');
    })

    const player1 = get_minibutton('first');
    player1.className = 'mini_button';
    player1.addEventListener('click', function() {
        handleButtonClick('player1');
    })

    const player2 = get_minibutton('second');
    player2.className = 'mini_button';
    player2.addEventListener('click', function() {
        handleButtonClick('player2');
    })

    newcards_players_container.append(new_cards);
    newcards_players_container.append(player1);
    newcards_players_container.append(player2);

    return newcards_players_container;
}