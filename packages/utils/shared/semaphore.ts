export class Semaphore {
	private resolvers: Array<(value: boolean) => void> = [];

	async acquire() {
		return new Promise((resolve) => {
			if (this.resolvers.length === 0) resolve(true);
			else this.resolvers.push(resolve);
		});
	}

	release() {
		if (this.resolvers.length === 0) return;

		const next_acquired_resolver = this.resolvers.shift();
		if (next_acquired_resolver) next_acquired_resolver(true);
	}
}
