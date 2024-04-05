/**
 * Converts a timestamp to "HH:mm" format.
 * @param timestamp The timestamp in milliseconds.
 * @returns The time in "HH:mm" format.
 */

export function timestampToDate(timestamp: number): string {
        const date: Date = new Date(timestamp);

        let hours: number = date.getHours();
        const minutes: number = date.getMinutes();
    
        const amOrPm: string = hours < 12 ? 'AM' : 'PM';
        hours = hours % 12 || 12;
    
        const formattedMinutes: string = minutes < 10 ? '0' + minutes : String(minutes);
        const formattedTime: string = `${hours}:${formattedMinutes} ${amOrPm}`;
    
        return formattedTime;
}
