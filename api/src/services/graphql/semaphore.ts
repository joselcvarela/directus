export class Semaphore {
	private state: Record<string, { acquired: number; resolvers: Array<(value: any) => void> }>;

	constructor() {
		this.state = {};
	}

	async acquire(id: string) {
		return new Promise((res) => {
			if (!this.state[id]) this.state[id] = { acquired: 0, resolvers: [] };

			this.state[id].acquired += 1;
			if (this.state[id].acquired === 1) res(true);
			else this.state[id].resolvers.push(res);
		});
	}

	release(id: string) {
		if (!this.state[id]) return;

		this.state[id].acquired -= 1;
		const next_acquired_resolver = this.state[id].resolvers.pop();
		if (next_acquired_resolver) next_acquired_resolver(true);

		if (this.state[id].resolvers.length === 0) delete this.state[id];
	}
}
