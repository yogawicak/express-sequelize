//formatREST

module.exports = function formatrest(values,message,err,response,status) {
        const data = {
            'messages' : message,
            'data': values,
            'error': {
                'messages' : err
            },
        };
        response.status(status)
        response.json(data);
        response.end();    
    }

