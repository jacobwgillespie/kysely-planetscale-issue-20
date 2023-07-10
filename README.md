# Reproduce Kysely Planetscale [Issue #20](https://github.com/depot/kysely-planetscale/issues/20)
A repo to reliably reproduce an issue introduced in Kysely Planetscale 1.2.1 which causes locks
to not be released when an error occurs inside a transaction.

[Issue #20](https://github.com/depot/kysely-planetscale/issues/20)

## Quick Start

1. Install packages `npm i`

2. Set up `.env` file by renaming `.env.example` to `.env` and filling it out with your fresh
   planetscale db connection details

3. Run migrations `npm run migrate`

4. Run the test to reproduce the issue `npm run reproduce`

Please note that it may occasionally pass the test just run again if it does so.
