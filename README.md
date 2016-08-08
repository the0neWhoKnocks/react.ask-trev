# Ask Trev (WiP)

A question an answer app built with React, WebPack, Babel, Express, & Gulp


## Installation

```
npm i -dd
```


## Run

```
node devServer.js
```

Navigate to [http://localhost:8181/](http://localhost:8181/)


## Troubleshooting

### Windows cannot find 'chrome'. Make sure you typed the name correctly, and then try again.

The app will try to open a Chrome browser for you by default. In some cases
Google installs Chrome in a non-standard directory forcing the user to add that
path to `Path` variable manually.

```
control.exe %windir%\system32\sysdm.cpl
```

- Go to the *Advanced* tab
- Click on *Environment Variables*
- Under *System Variables*, double-click the `Path` variable
- At the very end of the *value* input, add `;C:\Users\{user}\AppData\Local\Google\Chrome\Application` (`{user}` being your actual user name)
- Click *Ok*, *Ok*, and *Apply*.