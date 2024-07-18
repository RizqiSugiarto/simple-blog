import { parseISO, format } from 'date-fns';

const convertDate = (date: string): string => {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
    ];
    const parsedDate = parseISO(date);
    const day = format(parsedDate, 'dd');
    const month = months[parsedDate.getUTCMonth()];
    const year = format(parsedDate, 'yyyy');
    return `${day} ${month} ${year}`;
};

export default convertDate;
