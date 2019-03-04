const Arcade = require('./models/arcade');
const User = require('./models/user');
const Booking = require('./models/booking');

const fakeDbData = require('./data.json');

class FakeDb {

	constructor(){
		this.arcades = fakeDbData.arcades;
            this.users = fakeDbData.users;           
	}

	async cleanDb() {
            await User.deleteMany({});
		await Arcade.deleteMany({});
            await Booking.deleteMany({});
	}

	pushDataToDb() {
            const user = new User(this.users[0]);
            const user2 = new User(this.users[1]);

		this.arcades.forEach((arcade) => {
			const newArcade = new Arcade(arcade);
                  newArcade.user = user;

                  user.arcades.push(newArcade);
			newArcade.save();
		});

            user.save();
            user2.save();
	}

      async	seedDb() {
		await this.cleanDb();
		this.pushDataToDb();
		}
	}

	module.exports = FakeDb;