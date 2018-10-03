const ExerciseContoller = require('../controllers/exerciseContoller');

module.exports = (app) => {

    const exerciseContoller = new ExerciseContoller();
    
    app.get('/', exerciseContoller.getHomePage);

    app.post('/api/exercise/new-user', exerciseContoller.postUser);

    app.post('/api/exercise/add', exerciseContoller.postExercise);

    app.get('/api/exercise/users', exerciseContoller.getUsers);

    app.get('/api/exercise/log', exerciseContoller.getUser);

}