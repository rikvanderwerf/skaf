const Sequalize = require('sequalize');

const sequalize = new sequalize('postgres://login_role:password@postgresql_db:5432/postgres')

sequalize
	.authenticate()
	.then(() => {
		console.log("database connection success!")
	}).catch(err => {
		console.log("database connection failed :(")
	});

export { sequalize }

