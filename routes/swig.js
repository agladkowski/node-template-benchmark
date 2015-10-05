'use strict';

// Dependencies
// --------------------------------------------------------

var express = require('express');
var swig    = require('swig');

// --------------------------------------------------------

function prepareMessages (req)
{
    var messages = [], messageCount = req.query.messageCount ? req.query.messageCount : 100;

    for (var i = 0; i < messageCount; i++)
    {
        messages.push(
        {
            'message' : i
        });
    }

    return messages;
}

// It's worth noting SWIG can directly integrate with
// Express. For consistancy I have implemented the test using
// the SWIG API directly, but in a real implementation the
// code will look a lot less like boiler plate.
// --------------------------------------------------------

module.exports = express.Router()

    .get('/', function (request, response)
    {
        var messages = prepareMessages(request);

        // Started.
        var startTime = new Date().getTime();

        swig.renderFile('views/swig/messages.swig',
        {
            messages : messages

        }, function (error)
        {
            if (error)
            {
                throw error;
            }

            // Finished.
            var endTime = (new Date().getTime() - startTime);

            swig.renderFile('views/swig/results.swig',
            {
                numberOfMessages : messages.length, renderingTime : endTime + ' milliseconds'

            }, function (error, output)
            {
                if (error)
                {
                    throw error;
                }

                response.type('html').send(output);
            });
        });
    })

    .get('/template', function (request, response)
    {
        var messages = prepareMessages(request);

        // Respond.
        swig.renderFile('views/swig/messages.swig',
        {
            messages : messages

        }, function (error, output)
        {
            if (error)
            {
                throw error;
            }

            response.type('html').send(output);
        });
    });
