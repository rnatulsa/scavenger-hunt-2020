# Renaissance Neighborhood - Scavenger Hunt 2020

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
[![Netlify](https://img.shields.io/netlify/c2b6f921-249f-41d7-97d3-d372f650bc0d?label=Netlify)](https://app.netlify.com/sites/rnatulsa-scavenger-hunt-2020/deploys)

https://rnatulsa-scavenger-hunt-2020.netlify.com/

The Renaissance Neighborhood Association is proud to offer a self-guided scavenger hunt for your entertainment. While amusing, it may serve to hone your observation skills and see things you have never noticed before. It can be as casual or as competitive as you would like!  To get started, head out your front door and start finding the items on the list. If you choose to upload an image, your scores will be considered for the Scavenger Hunt Leaderboard. Each item is worth 10 points. Bonus points are available! 

You can skip any question you'd like, but only the highest scores will appear on the leaderboard. 

## Development

These environment variables are required:

- `GCLOUD_PROJECT`: A Google Cloud project ID
- `GOOGLE_SHEET_ID`: A Google Sheet ID
- `GOOGLE_APPLICATION_CREDENTIAL_BODY`: Base64 encoded contents of Google Cloud service account credentials file

```console
$ nodenv install
$ npm install
$ npm run netlify:dev
```

## License

[Mozilla Public License 2.0](LICENSE)
