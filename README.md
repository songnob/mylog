# A wrapper of winston & winston-daily-rotate-file

## Usage

```javascript
const log      = require('daily-log')(__filename);
log.info(...)
log.debug(...)
log.error(...)
log.warn(...)
```
Daily-log will create a logs directory on project directory and looking for package.json information (name property)

Log file will be create under format YYYY-MM-dd.{project name}.{NODE_ENV}.log (eg: 2017-04-20.sms-gateway-server.development.log)

If the NODE_ENV = production, output to console will be remove
If the NODE_ENV != production, log will output to console & file

Sample log output

```
2017-04-20T04:50:47.070Z - info: daily-log.js - Development mode, use both transport
2017-04-20T04:50:47.546Z - warn: server.js - Web server listening at: http://localhost:7002
2017-04-20T04:50:47.548Z - info: server.js - Browse your REST API at http://localhost:7002/explorer
```

Happy codding :)
