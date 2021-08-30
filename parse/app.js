$(document).ready(function () {

    //\\ Constants \\//
    const parseApplicationId = 'abcde';
    const parseJavaScriptKey = 'mke';

    //\\ Initialize Parse //\\
    Parse.initialize(parseApplicationId, parseJavaScriptKey);
    Parse.serverURL = 'http://192.168.1.65:1337/parse';

    const Test = Parse.Object.extend('Test'); // Collection object (model for our data)
    const test = new Test();
    const query = new Parse.Query(Test);

    $('.btn-save').click( function () {
        let data;
        try{
            data = JSON.parse($('textarea').val())
        } catch (e){
            console.error('Invalid JSON', e);
        }

        if (!data) return false;
        
        test.save(data)
            .then(function (result) {
                    console.log('Parse.com object is saved: ', result);
                    $('.log').html(JSON.stringify(result, null, 2))
                  },  
                 function (error) {
                    console.error(`Parse.com object is not saved: ${error}`)
                }
            )
    })

    $('.btn-get').click(() => {
        query.find()
            .then((results) => {
                    console.log(results)
                    $('.log').html(JSON.stringify(results, null, 2))
                },
                (error) => {
                    console.error(`Error: ${error.code} \nMessage: ${error.message}`)
                }) 
    })

})