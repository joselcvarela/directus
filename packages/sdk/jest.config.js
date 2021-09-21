import dotenv from 'dotenv';

dotenv.config();

export default {
	transform: {},
	preset: 'ts-jest',
	verbose: true,
	setupFiles: ['dotenv/config'],
	testURL: process.env.TEST_URL || 'http://localhost',
	collectCoverageFrom: ['src/**/*.ts'],
	testPathIgnorePatterns: ['dist'],
};
