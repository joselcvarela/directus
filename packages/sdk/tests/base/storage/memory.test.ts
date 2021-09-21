/**
 * @jest-environment node
 */

import { MemoryStorage } from '../../../src/base/storage/index.js';
import { createStorageTests } from './tests.js';

describe(
	'memory storage',
	createStorageTests(() => new MemoryStorage())
);
