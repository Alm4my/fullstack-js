$(document).ready(() => {
    //\\ Constants \\//
    const appId = 'abcde';
    const restKey = 'mkey';
    const apiBase = 'http://192.168.1.65:1337/parse';




    //\\ Functions \\//
    getMessages();

    $('#send').click(() => {
        const sendButton = $(this);
        sendButton.html('<img src="../img/spinner.gif" width="20" />');
        const username= $('input[name=username]').val();
        const message= $('input[name=message]').val();

        $.ajax({
            url: `${apiBase}/classes/MessageBoard`,
            headers: {
                'X-Parse-Application-Id': appId,
                'X-Parse-REST-API-Key': restKey
            },
            contentType: 'application/json',
            dataType: 'json',
            processData: false,
            data: JSON.stringify({
                'username': username,
                'message': message
            }),
            type: 'POST',
            success: () => {
                console.log('sent')
                getMessages();
                sendButton.html('SEND');
            },
            error: () => {
                console.error('error')
                sendButton.html('SEND')
            }
        })
    })

    function getMessages() {
        $.ajax({
            url: `${apiBase}/classes/MessageBoard`,
            headers: {
                'X-Parse-Application-Id': appId,
                'X-Parse-REST-API-Key': restKey
            },
            contentType: 'application/json',
            dataType: 'json',
            type: 'GET',
            success: (data) => {
                updateView(data)
            },
            error: () => console.error('Error!')
        })
    }

    function updateView(messages){
        const table = $('.table tbody');
        table.html('');

        $.each(messages.results, (index, value) => {
            const row = (`<tr> <td>${value.username}</td> <td>${value.message}</td> </tr>`)
            table.append(row)
        })
        console.log(messages);
    }
})