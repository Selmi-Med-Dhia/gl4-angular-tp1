# Angular Renaissance — GL4 TP1

Angular exercises implemented on separate branches, as required by the TP.

## Branches

- **`rxjs`** — Angular 18, NgModules, the rainbow input directive with host bindings, and the CV components using `async` and `catchError` (exercises 8 and 14).
- **`migration`** — Angular 22, standalone bootstrapping, modern template control flow, and `inject()` (exercises 3–6).
- **`signal`** — Angular 22 with the signal-based rainbow directive, Todo board and TTC calculator, plus the migrated CV code (exercises 8, 10 and 11).
- **`main`** — Integrated Angular 22 version. The Angular 18 implementation remains accessible on `rxjs`.

The CV Signals and authentication Signals exercises (pages 12–13) are being developed separately and should be reviewed before adding them to the final integrated version.

## Run the project

Use Node.js 22 and check out the branch you want to validate.

```bash
npm ci
npm start
```

The app is served at `http://localhost:4200`. The Todo board and TTC calculator are accessible through the navbar on `signal` and the integrated `main` branch. The rainbow input example is available at `/rainbow`.

## Validation

```bash
npm run build
npm test -- --watch=false --browsers=ChromeHeadless
```

The fork's GitHub Actions workflow runs these checks automatically. It also rejects focused Jasmine tests, so a successful result cannot silently skip the rest of the suite.
