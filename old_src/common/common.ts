export let getSkillGoal = (skill:number): number => {
    let goal:number = 0;

    switch (skill) {
        case 1:
            goal = 14;
            break;
        case 2:
            goal = 19;
            break;
        case 3:
            goal = 25;
            break;
        case 4:
            goal = 31;
            break;
        case 5:
            goal = 38;
            break;
        case 6:
            goal = 46;
            break;
        case 7:
            goal = 55;
            break;
        case 8:
            goal = 65;
            break;
        case 9:
            goal = 75;
            break; 
        default:
            break;
    }
    return goal;
}