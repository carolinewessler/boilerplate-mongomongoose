require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

//schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

//model
let Person = mongoose.model('Person', personSchema);

//this is an old method since the its an old version of mongoose (5.13.15)
//see 'Explicando Schema MongoDB' for more details (search for 'Versão correta (async / await)')
const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Caroline Wessler',
    age: 31,
    favoriteFoods: ['Lasanha', 'Quiabo']
  });

  person.save((err, data) => {
    done(err, data);
  });
};

const arrayOfPeople = [
  {name: 'Felipe', age: 20, favoriteFoods: ['Sushi', 'Macarrão']},
  {name: 'Ana', age: 25, favoriteFoods: ['Pizza', 'Salada']},
  {name: 'João', age: 30, favoriteFoods: ['Churrasco', 'Feijoada']}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    done(err, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    done(err, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    done(err, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    done(err, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  findPersonById(personId, (err, person) => {
    if (err) return done(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    }
  );
};

const removeById = (personId, done) => {
  findPersonById(personId, (err, person) => {
    if (err) return done (err)
    person.remove((err, removedPerson) => {
      if (err) return done(err)
      done(null, removedPerson)
    })
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({ name: nameToRemove }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
