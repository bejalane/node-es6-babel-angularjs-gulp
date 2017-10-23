import technologiesCtrl from './api/technologiesCtrl'
import listen from './server.listen'

let express = require('express'),
	app = express();

//app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "./../app"));

technologiesCtrl(app);

listen(app);