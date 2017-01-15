var Entry = require('./models/entry');

function getEntries(res) {
    Entry.find(function (err, entries) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(entries); // return all entries in JSON format
    });
};

function getDate() {
    var today = new Date();
    return {
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear()
    }
}

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all entries
    app.get('/api/entries', function (req, res) {
        // use mongoose to get all entries in the database
        getEntries(res);
    });

    // create entry and send back all entries after creation
    app.post('/api/entries', function (req, res) {
        console.log(req.body);

        // create a entry, information comes from AJAX request from Angular
        Entry.create({
            text: req.body.text,
            type: req.body.type,
            date: getDate(),
            done: false
        }, function (err, entry) {
            if (err)
                res.send(err);

            // get and return all the entries after you create another
            getEntries(res);
        });

    });

    // delete a entry
    app.delete('/api/entries/:entry_id', function (req, res) {
        Entry.remove({
            _id: req.params.entry_id
        }, function (err, entry) {
            if (err)
                res.send(err);

            getEntries(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
