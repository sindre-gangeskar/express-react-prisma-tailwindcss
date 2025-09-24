const DatabaseService = require("../services/DatabaseService");
DatabaseService.seed().then(() => { console.log('Successfully seeded database') }).catch(err => { console.error(err) });
