# Simple Dependabot

Simple dependabot which can check given github repo's root folder for package.json and composer.json, parse dependencies and compare them to latest version from related registry. User can subscribe with email adress to recieve daily mails about last dependency situation.

## Running the app

### Install Dependencies

```bash
yarn
```

### Seting up env variables

Fill the .env file with your mail service credentials if you want to use email subscription

### Running tests

```bash
yarn test
```

### Starting app in dev mode

```bash
yarn start:dev
```

## Running the dependabot service

Send POST request to http://localhost:3000/repo-check
Do not forget to update port number if you have changed it from env file

### POST /repo-check Body(json)

| Key       | Type     | Required? | Default | Description                                            |
| --------- | -------- | --------- | ------- | ------------------------------------------------------ |
| repoHost  | string   | No        | GITHUB  | Might support other hosts in future.                   |
| user      | string   | Yes       | -       | Repo user (e.g Mobysick)                               |
| repoName  | string   | Yes       | -       | Repository name (e.g node-test, php-test for Mobysick) |
| emails    | string[] | Yes       | -       | Emails to recieve daily status update for given repo.  |
| subscribe | boolean  | No        | false   | True if you want to recieve daily status mails.        |

### Examples for post body as json

```json
{
  "repoHost": "GITHUB",
  "user": "Mobysick",
  "repoName": "php-test",
  "emails": ["e_gonen@hotmail.com"],
  "subscribe": false
}
```

```json
{
  "repoHost": "GITHUB",
  "user": "Mobysick",
  "repoName": "node-test",
  "emails": ["e_gonen@hotmail.com"],
  "subscribe": false
}
```

### Curl example

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"repoHost": "GITHUB", "user": "Mobysick", "repoName": "php-test", "emails": ["e_gonen@hotmail.com"], "subscribe": false}' \
  http://localhost:3000/repo-check
```

## Improvements

### Comparison

Right now comparison ignores semver.

### Logger

Used basic console logger. Might want to use womething like winston in prod.

### Schedule service

Used node-schedule for simplicity. Might want to use a redis-based queue e.g Bull for prod.

### Possible real-word routes

Might add auth routes.
Users can save and list their repos.
Run comparison any wanted time for a repo.
Subscribe & unsubscribe from list.
Change subscription interval for a given repo.
