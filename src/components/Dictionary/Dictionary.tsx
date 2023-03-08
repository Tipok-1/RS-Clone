export function getCharacter_1Info(language:string){
    if(language == 'RU') {
        return {
            title:'Ниндзя',
            damage:'Урон: 20',
            speed:'Скорость: 5 м/с',
            damageType:'Тип: Дальний бой',
            discription:'Описание: Ниндзя - быстрый универсальный воин. Незаменим в борбе против големов. Имеет большую скорость и средний урон'
        }
    }else {
        return(
            {
                title:'Ninja',
                damage:'Damage: 20',
                speed:'Speed: 5 m/s',
                damageType:'Type: Distant battle',
                discription:'Description: Ninja is a fast versatile warrior. Indispensable in the fight against golems. Has great speed and average damage'
            }
        )
    }
}
export function getCharacter_2Info(language:string){
    if(language == 'RU') {
        return {
            title:'Фермер',
            damage:'Урон: 25',
            speed:'Скорость: 3 м/с',
            damageType:'Тип: Дальний бой',
            discription:'Описание: Фермер с ружьём - опасный персонаж в умелых руках. Имеет хороший урон, но не очень большую скорость'
        }
    }else {
        return(
            {
                title:'Farmer',
                damage:'Damage: 25',
                speed:'Speed: 3 m/s',
                damageType:'Type: Distant battle',
                discription:'Description: A farmer with a gun is a dangerous character in capable hands. Has good damage, but not very high speed'
            }
        )
    }
}