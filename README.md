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

Most instances will need an back-end source in order to work a great way to provide it is to get started with [portfolio-api](https://github.com/pepeien/portfolio-api), after creating this resources add these environment variables:

```
REACT_APP_FORM_SERVICE_URL={YOUR-FORM-SERVICE-URL}
REACT_APP_INITIAL_VALUE={YOUR-SECRET-VALUE}
REACT_APP_GITHUB_URL={YOUR-GITHUB-URL} [https://github.com/{YOUR_ACCOUNT_NAME}]
REACT_APP_LINKEDIN_URL={YOUR-LINKEDIN-URL} [https://www.linkedin.com/in/{YOUR_ACCOUNT_NAME}]
REACT_APP_EMAIL_URL={YOUR-EMAIL-URL} [mailto:{YOUR_EMAIL}]
REACT_APP_GITHUB_CDN={CDN-USED-TO-FETCH-MEDIA} [https://raw.githubusercontent.com/{YOUR_ACCOUNT_NAME}]
```

ps. _I strongly advise to use github's, as the app is coded around that structure "see below"._

### CDN structure

Blog posts and project listing relies heavily on github's CDN to list valid repos as showcase projects.

#### Projects

To make a project legible to be showcased, it will need to things:

- A file that holds these values at the root of the JSON object :
```
	{
    	"primaryColor": "#FFFFFF",
    	"accentColor": "#73A8A0"
	}
```
The file should be named `metadata.json` and it must be placed at `.github/metadata.json` inside the target the repo.

- The repo must be manually added to the `src/data/projects.ts` file containing the proper data.

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
