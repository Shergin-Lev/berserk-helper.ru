function get_crystal_containers() {
    const gold_crystal_container = document.createElement('div');
    gold_crystal_container.className = 'crystal_container';

    const silver_crystall_container = document.createElement('div');;
    silver_crystall_container.className = 'crystal_container';

    const gold_crystal = document.createElement('div');
    gold_crystal.className = 'gold_crystal';

    const silver_crystal = document.createElement('div');
    silver_crystal.className = 'silver_crystal';

    crystal_number = 1;

    while(crystal_number <= 11) {
        gold_crystal_container.append(gold_crystal);
        silver_crystall_container.append(silver_crystal);

        crystal_number += 1;
    }

    return [gold_crystal_container, silver_crystall_container];
}

