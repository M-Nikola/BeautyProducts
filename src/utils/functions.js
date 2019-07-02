import { colors, strings } from './constants';

export const getRandomColor = () => {
    return colors.randomColors[Math.floor(Math.random() * colors.randomColors.length)];
}

export const isImageExtensionPng = (image) => {
    if (!image) {
        return false;
    }
    return image.includes('.png');
}

export const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const calculateTimePassed = (time) => {
    if (!time) {
        return null;
    }

    const currentDateTIme = new Date();
    const checkTime = new Date(time);
    
    const yearDifference = currentDateTIme.getFullYear() - checkTime.getFullYear();
    const monthDifference = currentDateTIme.getMonth() - checkTime.getMonth();
    const dayDifference = currentDateTIme.getDate() - checkTime.getDate();
    const hourDifference = currentDateTIme.getHours() - checkTime.getHours();
    const minuteDifference = currentDateTIme.getMinutes() - checkTime.getMinutes();
    const secondDifference = currentDateTIme.getSeconds() - checkTime.getSeconds();

    if (yearDifference > 0) {
        return yearDifference + ` ${yearDifference > 1 ? strings.years : strings.year}` ;
    } else if (monthDifference > 0) {
        return monthDifference + ` ${monthDifference > 1 ? strings.months : strings.month}`
    }else if (dayDifference > 0) {
        return dayDifference + ` ${dayDifference > 1 ? strings.days : strings.day}` ;
    } else if (hourDifference > 0) {
        return hourDifference + ` ${hourDifference > 1 ? strings.hours : strings.hour}`;
    } else if (minuteDifference > 0) {
        return minuteDifference + ` ${minuteDifference > 1 ? strings.minutes : strings.minute}`;
    } else {
        return secondDifference + ` ${secondDifference > 1 ? strings.seconds : strings.second}`;
    }
}

export const getGridArray = (array, elementsInRow) => {
    let grid = [];
    for (let i = 0; i < Math.ceil(array.length / elementsInRow); i++) {
        grid[i] = [];
        for (let j = 0; j < elementsInRow && (j + i * elementsInRow) < array.length; j++) {
            grid[i][j] = array[j + i * elementsInRow]
        }
    }
    return grid;
}