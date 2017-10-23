export default function(app){
	let port = 1337;
	app.listen(port, ()=> {
		console.log(`listening on localhost ${port}`)
	});
}