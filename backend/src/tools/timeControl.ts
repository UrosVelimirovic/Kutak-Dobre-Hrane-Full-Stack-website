export class DateTimeParser {
    static getYear(dateString: string): number {
        const date = new Date(dateString);
        return date.getFullYear();
    }

    static getMonth(dateString: string): number {
        const date = new Date(dateString);
        return date.getMonth() + 1; // Adding 1 to match the format of month
    }

    static getDay(dateString: string): number {
        const date = new Date(dateString);
        return date.getDate();
    }

    static getHour(dateString: string): number {
        const date = new Date(dateString);
        return date.getHours();
    }

    static getMinute(dateString: string): number {
        const date = new Date(dateString);
        return date.getMinutes();
    }

    static poklapanje(dinamicTime: string, staticTime: string): boolean {
        const date1 = new Date(dinamicTime);
        const date2 = new Date(staticTime);
      
        const date3 = new Date(date2.getTime() + (3 * 60 * 60 * 1000)); 

        return date1 >= date2 && date1 <= date3;
    }
}