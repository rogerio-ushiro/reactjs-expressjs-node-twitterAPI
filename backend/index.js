const express = require('express')
const request = require('request');
const cors = require('cors');

const app = express()
const port = 4000;

app.use(cors());

app.get("/:q", cors(), (req, res) => {
	var query = req.params.q;
	if (req.params.count) query += "&count=" + req.params.count;
	request(header(query), (error, response, body) => {
		var result = [];
		JSON.parse(body).statuses.forEach(element => {
			result.push({
				created_at: element.created_at,
				location: element.location,
				user: element.user.name,
				profile_image: element.user.profile_image_url,
				iso_language_code: element.iso_language_code,
				text: element.text
			})
		});
		res.send(result);
	})

})

function header(query) {
	return {
		url: "https://api.twitter.com/1.1/search/tweets.json?" + query,
		headers: {
			"User-Agent": "request",
			"Content-Type": "application/json",
			"Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAABLzDQEAAAAAR7MDxCRPbW%2BK2fjJL7xuompXXjQ%3DIJwQYgwIXX4n2exl6Ncn1YRl2e32Y0r5l76RZYuWcQtX2SCuPg"
		}
	};
}

app.listen(port, () => console.log(`Backend listening at http://localhost:${port}`))
