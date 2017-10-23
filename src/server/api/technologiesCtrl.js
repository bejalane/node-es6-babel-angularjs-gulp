export default function(app){
	app.get('/technologies', (req, res) => {
		res.status(200).json(["Node", "Angular", "Gulp", "Babel", "ES6", "Nodemon"])
	})
}