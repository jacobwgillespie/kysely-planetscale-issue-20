export default {
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  clearMocks: true,
  globals: {
    'ts-jest': {
      tsconfig: 'tests/tsconfig.json',
      useESM: true,
      isolatedModules: true,
    },
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@planetscale|kysely-planetscale))'
  ],
  moduleNameMapper: {'^uuid$': 'uuid'},
  collectCoverageFrom: ['src/**/*.{ts,js}'],
  testTimeout: 20000
}
