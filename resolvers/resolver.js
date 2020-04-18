function handleDatabaseQueryPromise(promise) {
	return promise
		.then(result => {
			return result 
		}).catch(err => {
			throw err
		})
}

module.exports = { handleDatabaseQueryPromise }





