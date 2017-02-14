/**
 * Created by rkeller on 13.02.17.
 *
 * Index JS File for usage with AWS Lambda Service as endpoint for Alexa Skill
 */

'use strict';

exports.handler = function (event, context) {
        try {
            console.log("event.session.application.applicationId=" + event.session.application.applicationId);

            if (event.session.new) {
                onSessionStarted({requestId: event.request.requestId}, event.session);
            }

            if (event.request.type === "LaunchRequest") {
                onLaunch(event.request,
                    event.session,
                    function callback(sessionAttributes, speechletResponse) {
                        context.succeed(buildResponse(sessionAttributes, speechletResponse));
                    });
            } else if (event.request.type === "IntentRequest") {
                onIntent(event.request,
                    event.session,
                    function callback(sessionAttributes, speechletResponse) {
                        context.succeed(buildResponse(sessionAttributes, speechletResponse));
                    });
            } else if (event.request.type === "SessionEndedRequest") {
                onSessionEnded(event.request, event.session);
                context.succeed();
            }
        } catch (e) {
            context.fail("Exception: " + e);
        }
};

/**
 *
 * @param sessionStartedRequest
 * @param session
 */
function onSessionStarted(sessionStartedRequest, session) {
            console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
                + ", sessionId=" + session.sessionId);
}
/**
 *
 * @param launchRequest
 * @param session
 * @param callback
 */
function onLaunch(launchRequest, session, callback) {
            console.log("onLaunch requestId=" + launchRequest.requestId
                + ", sessionId=" + session.sessionId);

            var cardTitle = "Hallo Welt";
            var speechOutput = "Sage Hallo Welt um Hallo Welt als Antwort zu bekommen!";
            callback(session.attributes,
                buildSpeechletResponse(cardTitle, speechOutput, "", true));
}
/**
 *
 * @param intentRequest
 * @param session
 * @param callback
 */
function onIntent(intentRequest, session, callback) {
            console.log("onIntent requestId=" + intentRequest.requestId
                + ", sessionId=" + session.sessionId);

            var intent = intentRequest.intent,
                intentName = intentRequest.intent.name;

            if (intentName == 'HalloIntent') {
                handleHalloWeltRequest(intent, session, callback);
            }
            else {
                throw "Invalid intent";
            }
}
/**
 *
 * @param sessionEndedRequest
 * @param session
 */
function onSessionEnded(sessionEndedRequest, session) {
            console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
                + ", sessionId=" + session.sessionId);
}
/**
 *
 * @param intent
 * @param session
 * @param callback
 */
function handleHalloWeltRequest(intent, session, callback) {
            callback(session.attributes,
                buildSpeechletResponseWithoutCard("Hallo, Welt!", "", "true"));
}
/**
 *
 * @param title
 * @param output
 * @param repromptText
 * @param shouldEndSession
 * @returns {{outputSpeech: {type: string, text: *}, card: {type: string, title: *, content: *}, reprompt: {outputSpeech: {type: string, text: *}}, shouldEndSession: *}}
 */
function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
            return {
                outputSpeech: {
                    type: "PlainText",
                    text: output
                },
                card: {
                    type: "Simple",
                    title: title,
                    content: output
                },
                reprompt: {
                    outputSpeech: {
                        type: "PlainText",
                        text: repromptText
                    }
                },
                shouldEndSession: shouldEndSession
            };
}
/**
 *
 * @param output
 * @param repromptText
 * @param shouldEndSession
 * @returns {{outputSpeech: {type: string, text: *}, reprompt: {outputSpeech: {type: string, text: *}}, shouldEndSession: *}}
 */
function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
            return {
                outputSpeech: {
                    type: "PlainText",
                    text: output
                },
                reprompt: {
                    outputSpeech: {
                        type: "PlainText",
                        text: repromptText
                    }
                },
                shouldEndSession: shouldEndSession
            };
}
/**
 *
 * @param sessionAttributes
 * @param speechletResponse
 * @returns {{version: string, sessionAttributes: *, response: *}}
 */
function buildResponse(sessionAttributes, speechletResponse) {
            return {
                version: "1.0",
                sessionAttributes: sessionAttributes,
                response: speechletResponse
            };
}