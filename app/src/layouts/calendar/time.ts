const monthNames = [
	'january',
	'february',
	'march',
	'april',
	'may',
	'june',
	'july',
	'august',
	'september',
	'october',
	'november',
	'december',
];
const weekNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
export { weekNames, monthNames, isSameWeek, isSameMonth, isSameDay, isSameYear, Interval };

function isSameYear(day1: Date, day2: Date) {
	return day1.getFullYear() == day2.getFullYear();
}

function isSameMonth(day1: Date, day2: Date) {
	return isSameYear(day1, day2) && day1.getMonth() == day2.getMonth();
}

function isSameWeek(day1: Date, day2: Date) {
	return new Interval(day1, Interval.Type.WEEK).isInInterval(day2);
}

function isSameDay(day1: Date, day2: Date) {
	return isSameMonth(day1, day2) && day1.getDate() == day2.getDate();
}

class Interval {
	private start: Date;
	private end: Date;
	private type: Interval.Type;

	constructor(date: Date, type: Interval.Type) {
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDay();
		this.type = type;

		switch (type) {
			case Interval.Type.WEEK:
				const diff = date.getDate() - day + (day == 0 ? -6 : 1);
				this.start = new Date(year, month, diff);
				this.end = new Date(year, month, diff + 7);
				break;
			case Interval.Type.MONTH:
				this.start = new Date(year, month, 1);
				this.end = new Date(year, month + 1, 1);
				break;
			case Interval.Type.AGENDA:
				this.start = new Date(year, month, 1);
				this.end = new Date(year, month + 1, 1);
				break;
			case Interval.Type.DAY:
				this.start = new Date(year, month, date.getDate());
				this.end = new Date(year, month, date.getDate() + 1);
				break;
		}
	}

	getStart() {
		return this.start;
	}

	getEnd() {
		return new Date(this.end.getTime() - 1);
	}

	isInInterval(date: Date) {
		return this.start <= date && this.end > date;
	}

	getDate(index: number) {
		const date = new Date(this.start.getTime());
		date.setDate(date.getDate() + index);
		return date;
	}

	getLength() {
		switch (this.type) {
			case Interval.Type.WEEK:
				return 7;
			case Interval.Type.MONTH:
				return new Date(this.end.getFullYear(), this.end.getMonth() + 1, 0).getDate();
			case Interval.Type.AGENDA:
				return new Date(this.end.getFullYear(), this.end.getMonth() + 1, 0).getDate();
			case Interval.Type.DAY:
				return 1;
		}
	}
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Interval {
	export enum Type {
		MONTH = 'month',
		WEEK = 'week',
		DAY = 'day',
		AGENDA = 'agenda',
	}
}
