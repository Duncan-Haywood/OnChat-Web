export class DateUtil {
    /**
     * 是否在昨天
     * @param date 
     */
    static isYestday(date: Date): boolean {
        const nowDate = new Date();
        const today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()).getTime(); //今天凌晨
        const yestday = new Date(today - 86400000).getTime();
        return date.getTime() < today && yestday <= date.getTime();
    }

    /**
     * 是否在本周
     * @param date 
     */
    static isSameWeek(date: Date): boolean {
        const nowDate = new Date();
        const inDateStr = date.toLocaleDateString();  // 获取如YYYY/MM/DD的日期
        const nowTime = nowDate.getTime();
        const nowDay = nowDate.getDay();
        for (let i = 0; i < 7; i++) {
            if (inDateStr == (new Date(nowTime + (i - nowDay) * 86400000)).toLocaleDateString()) {
                return true;
            }
        }
        return false;
    }

    /**
     * 是否在今年
     * @param date 
     */
    static isThisYear(date: Date): boolean {
        return date.getFullYear() == new Date().getFullYear();
    }
}