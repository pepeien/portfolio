[![portfolio](.github/images/project-thumbnail.png)](https://erickfrederick.com)

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
| DEPLOYMENT_URL               | Deployment URL         | String |    ✅    |
| NEXT_PUBLIC_FORM_SERVICE_URL | Form service URL       | String |    ✅    |
| INITIAL_VALUE                | Secret value           | String |    ✅    |
| NEXT_PUBLIC_GIT_URL          | Git plataform URL      | String |    ✅    |
| NEXT_PUBLIC_LINKEDIN_URL     | Linkedin URL           | String |    ✅    |
| NEXT_PUBLIC_EMAIL_URL        | Email URL              | String |    ✅    |
| NEXT_PUBLIC_TWITTER_HANDLE   | Twitter handle         | String |    ✅    |
| GITHUB_CDN                   | CDN used to fetch data | String |    ✅    |
| GITHUB_USER                  | User github handle     | String |    ✅    |
| GITHUB_REPO                  | Current repo name      | String |    ✅    |
| GITHUB_BRANCH                | Target branch name     | String |    ✅    |

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

- A file at `.github/jobs/metadata.json` will need to follow this template:

```json
[
    {
        "startDate":    {JOB_START_DATE}       [string] (YYYY-MM-DD),
        "endDate":      {JOB_START_DATE}       [string] (YYYY-MM-DD) - OPTIONAL,
        "company":      {JOB_COMPANY_NAME}     [string],
        "positions":    {JOB_POSITION_HISTORY} [string[]],
        "technologies": {JOB_TECHNOLOGIES}     [string[]]
    }
]
```

- A entry at `src/app/[lang]/dictionaries/personal/*.ts` will need to follow this template:
  
```js
{
    jobs: {
        {JOB_COMPANY_NAME}: {
            description: string;
        }
    }
}
```

#### Blog

To make a post legible to be showcased, you'll need fulfill these steps:

- A file at `.github/blog/metadata.json` will need to follow this template:

```json
[
    {
        "id": {BLOG_POST_ID} [string],
    }
]
```

- A entry at `src/app/[lang]/dictionaries/personal/*.ts` will need to follow this template:
  
```js
{
    blog: {
        {BLOG_POST_ID}: {
            title: string;
            description: string;
        }
    }
}
```

- Inside `.github/blog` a folder named after the `BLOG_POST_ID` needs to be created;

- Create `.md` files inside `.github/blog/{BLOG_POST_ID}` named after the [Locales](#locales).

#### Projects

To make a project legible to be showcased, you'll need fulfill these steps:

- A file on each or the projects at `.github/metadata.json` will need to follow this template:

```json
{
    "primaryColor": {HEX_VALUE_COLOR_STRING} [string],
    "accentColor":  {HEX_VALUE_COLOR_STRING} [string]
}
```

- A entry at `src/app/[lang]/dictionaries/personal/*.ts` will need to follow this template:
  
```js
{
    projects: {
        {PROJECT_NAME}: {
            description: string;
        }
    }
}
```

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
