/**
 * @jest-environment jsdom
 */

import { LocalStorage } from '../../../src/base/storage/index.js';
import { createStorageTests } from './tests.js';

describe(
	'localstorage storage',
	createStorageTests(() => new LocalStorage())
);
