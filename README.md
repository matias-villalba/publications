App to show publications and authors with react and serverless

Backend and front-end are deployed on AWS

* The front-end URL is:
http://publications-react-front.s3-website-us-east-1.amazonaws.com/

* The backend URL is:
https://ivq7ko95vh.execute-api.us-east-1.amazonaws.com/prod/

There is a postman collection on this repositorio (Postman.json)

* To run the app locally you can do, at the root directory of the repository:
```bash
$docker-compose up --build
```
The backend will be listening at port: 3000
The front-end at port: 3001

If you would like only running the backend (API), you can run docker-compose from ./api/ directory

In any case, you don't need to have a database engine on your local environment to run the app.
The database (running on a docker container) will be filled with mock data.
There are sql scripts (./api/scripts ) to create and to initialize the database with data. But it is not necessary to run it because docker run it automatically when the container starts to run.
In addition, there is a python script which I created for getting mock data. But you don't have to run it either


* To run the backend on your local environment, you can do:
$sls offline --noEnvironment

The database connection string is configured by the DATABASE_CONNECTION_URI environment variable.
And it gets the value from ssm.

* To deploy the backend to different invironments you could do, for instance:
```bash
$sls deploy --stage prod or $sls deploy --stage dev, etc.
```

* In the case of the front-end, to deploy, you have to set the REACT_APP_API_HOST_AND_PORT environment variable with the API host.
For instance:
```bash
$REACT_APP_API_HOST_AND_PORT=https://ivq7ko95vh.execute-api.us-east-1.amazonaws.com/prod yarn build && yarn deploy
```

If you want to run locally the front end you can do:
```bash
$yarn start_local
```

* The app allows you see all publications ordered by newest or by oldest. 
And these are paginated with a server-side pagination.
Also, you can see all authors and select one to see his/her personal data and publications 
Later, there is a input to search publications by title, it allows you find publications by "starting with...".
Only In the search case, results are not paginated (you can see ten results as maximum)  
Finally, There are database indexes created for optimizing, these are in ./scripts/ddl.sql