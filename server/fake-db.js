const Arcade = require('./models/arcade');

class FakeDb {

	constructor(){
		this.arcades = [{
                  title: "Nice view on ocean",
                  city: "San Francisco",
                  street: "Main street",
                  category: "condo",
                  image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                  stations: 4,
                  shared: true,
                  description: "Very nice apartment in center of the city.",
                  dailyRate: 43
                  },
                  {
                  title: "Modern apartment in center",
                  city: "New York",
                  street: "Time Square",
                  category: "apartment",
                  image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                  stations: 1,
                  shared: false,
                  description: "Very nice apartment in center of the city.",
                  dailyRate: 11
                  },
                  {
                  title: "Old house in nature",
                  city: "Spisska Nova Ves",
                  street: "Banicka 1",
                  category: "house",
                  image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                  stations: 5,
                  shared: true,
                  description: "Very nice apartment in center of the city.",
                  dailyRate: 23
}]
	}

	async cleanDb() {
		await Arcade.deleteMany({});
	}

	pushArcadesToDb() {
		this.arcades.forEach((arcade) => {
			const newArcade = new Arcade(arcade);

			newArcade.save();
		})
	}

	seedDb() {
		this.cleanDb();
		this.pushArcadesToDb();
		}
	}

	module.exports = FakeDb;