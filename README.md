[![portfolio](.github/images/project-thumbnail.png)](https://ericodesu.com)

# portfolio

### tl;dr

```
git clone https://github.com/pepeien/portfolio.git
cd portfolio/
npm install
npm start
```

Then open [http://localhost:3000/](http://localhost:3000/) to see your app. The initial structure of your app is setup. You may need to add a few `.env` variables read **Adding environment variables** for more.

### Adding environment variables

|  Variable  | Description                       |  Type   | Required |
| :--------: | :-------------------------------  | :-----: | :------: |
| REACT_APP_FORM_SERVICE_URL | Form service URL       | String |    ✅    |
| REACT_APP_INITIAL_VALUE    | Secret value           | String |    ✅    |
| REACT_APP_GITHUB_URL       | Git plataform URL      | String |    ✅    |
| REACT_APP_LINKEDIN_URL     | Linkedin URL           | String |    ✅    |
| REACT_APP_EMAIL_URL        | Email URL              | String |    ✅    |
| REACT_APP_GITHUB_CDN       | CDN used to fetch data | String |    ✅    |

ps. _I strongly advise to use github's, as the app is coded around that structure "see below"._

### Locales

Locales supported by the application:
- `en-us`;
- `ja-jp`;
- `pt-br`.

### CDN structure

Blog post, project and job listings relies on github's CDN to make data dynamic.

#### Jobs

To make a job legible to be showcased, you'll need fulfill these steps:

- A file that holds these values at the root of the JSON object:
```
[
	{
	    "startDate": {JOB_START_DATE}       [string] (YYYY-MM-DD),
	    "company":   {JOB_COMPANY_NAME}     [string],
	    "positions": {JOB_POSITION_HISTORY} [string[]],
	    "description": {
	        {LOCALE_ID} [string]: {JOB_DESCRIPTION_TRANSLATION} [string]
	    },
	    "technologies": {JOB_TECHNOLOGIES} [string[]]
	}
]
```

- The repo must be manually added to the `.github/jobs/metadata.json` file containing the proper data.

#### Posts

To make a post legible to be showcased, you'll need fulfill these steps:

- A file at `.github/posts/metadata.json` will need to follow this template:
```
[
	{
	    "id": {POST_ID} [string],
	    "title": {
	        {LOCALE_ID} [string]: {POST_TITLE_TRANSLATION} [string]
	    },
	    "description": {
	        {LOCALE_ID} [string]: {POST_DESCRIPTION_TRANSLATION} [string]
	    }
	}
]
```

- Inside `.github/posts` a folder named after the `POST_ID` needs to be created;

- Create `.md` files inside `.github/posts/{POST_ID}` named after the [Locales](#locales).

#### Projects

To make a project legible to be showcased, you'll need fulfill these steps:

- A file that holds these values at the root of the JSON object:
```
{
	"primaryColor": {HEX_VALUE_COLOR_STRING} [string],
	"accentColor":  {HEX_VALUE_COLOR_STRING} [string]
}
```

- The file should be named `metadata.json` and it must be placed at `.github/metadata.json` inside the target the repo;

- The repo must be manually added to the `.github/jobs/metadata.json` file containing the proper data.

Now you are ready to use the project, just issue a `npm start` and you're good to go

## About the Project

This project it's my portfolio page, always beign updated.

## Development

Install dependencies:

```sh
npm install
```

```sh
npm start
```
