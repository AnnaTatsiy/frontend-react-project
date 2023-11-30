
export const getVariant = (fullness) => {
    return (fullness.fact < fullness.required) ? `Расписание не заполнено, требуется еще ${fullness.recommend - fullness.fact} тренеров${messageBuilder(fullness.recommend - fullness.fact)}!` : ((fullness.fact < fullness.recommend)
        ? `Расписание недостаточно заполнено, требуется еще ${fullness.recommend - fullness.fact} тренеров${messageBuilder(fullness.recommend - fullness.fact)}!` : "Расписание заполнено");
}

const messageBuilder = (amount) => {
    switch (true) {
        case amount === 1 || (amount % 10 === 1):
            return "ка"
        case (amount >= 2 && amount <= 4) || (amount % 10 >= 2 && amount % 10 <= 4):
            return "ки"
        default:
            return "ок"
    }
}

export const sortPersonalSchedules = (workouts, day) => {
    return workouts.filter(w => w.day_id === day).sort((a, b) => a.time_begin.localeCompare(b.time_begin))
}

export const sortSignUpPersonalWorkouts = (workouts, day) => {
    return workouts.filter(w => w.schedule.day_id === day)
        .sort((a, b) => a.schedule.time_begin.localeCompare(b.schedule.time_begin))
        .sort((a, b) => new Date(a.date_begin) - new Date(b.date_begin))
}

export const getLabel = (page, size) => {

    switch (true) {
        case size.width > 469:
            switch (page) {
                case 1:
                    return "Прошедшая"
                case 2:
                    return "Текущая неделя"
                case 3:
                    return "Следующая"
            }
            break;
        case size.width > 400:
            switch (page) {
                case 1:
                    return "Прошедшая"
                case 2:
                    return "Текущая"
                case 3:
                    return "Следующая"
            }
            break;

        default:
            switch (page) {
                case 1:
                    return "«"
                case 2:
                    return "Текущая неделя"
                case 3:
                    return "»"
            }
    }
}
