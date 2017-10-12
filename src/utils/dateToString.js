export function dateToString(date) {
    let dateTask = new Date(date);
    let weekday = ((Date.parse(date) - Date.now()) / 3600000) > 24 ? dateTask.toLocaleString('en', {weekday: 'long'}) : 'Tomorrow';
    let minutes = dateTask.toLocaleString('ru', {minute: '2-digit'}) > 10 ? dateTask.toLocaleString('ru', {minute: '2-digit'}) : '0'+ dateTask.toLocaleString('ru', {minute: '2-digit'});
    return weekday + ', ' + dateTask.toLocaleString('en', {month: 'short'})
        + ' ' + dateTask.toLocaleString('en', {day: 'numeric'})
        + ', ' + dateTask.toLocaleString('ru', {hour: 'numeric'})
        + ':' + minutes;
}


