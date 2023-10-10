import {handleButtonClick} from './script.js';

function get_crystal(crystal_type) {
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
        let g_cr = get_crystal('gold');
        g_cr.className = 'crystal_button';
        g_cr.id = 'gold_' + crystal_number;
        g_cr.addEventListener('click', function() {
            handleButtonClick('gold_' + crystal_number);
        })
        g_cr.append(get_crystal_span(crystal_number));
        gold_crystal_container.append(g_cr);        

        let s_cr = get_crystal('silver');
        s_cr.className = 'crystal_button';
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


export function get_player_container() {
    const player_container = document.createElement('div');
    player_container.className = 'player';

    const first_player_button = document.createElement('div');
    first_player_button.className = 'player_button';
    first_player_button.addEventListener('click', function() {
        handleButtonClick('first_player');
    })

    const second_player_button = document.createElement('div');
    second_player_button.className = 'player_button';
    second_player_button.addEventListener('click', function() {
        handleButtonClick('second_player');
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