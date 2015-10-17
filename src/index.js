/**
 * This will combine Iris and Alexa into a very Iron Man kinda thing.
 */

/**
 * App ID for the skill
 */
var APP_ID = ''; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * IrisBridge is a child of AlexaSkill.
 */
var IrisBridge = function () {
    AlexaSkill.call(this, APP_ID);
};

/**
 * Pulling in the parts that'll call the AlertMe ApiSession
 */
var IrisSkill = require('./IrisSkill');

// Extend AlexaSkill
IrisBridge.prototype = Object.create(AlexaSkill.prototype);
IrisBridge.prototype.constructor = IrisBridge;

IrisBridge.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("IrisBridge onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

IrisBridge.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("IrisBridge onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Success.  Please state your command.";
    var repromptText = "You can say things like home mode, night mode, and more.";
    response.ask(speechOutput, repromptText);
};

IrisBridge.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("IrisBridge onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

IrisBridge.prototype.intentHandlers = {
    // register custom intent handlers
    SetHomeIntent: function (intent, session, response) {
		IrisSkill.prototype.HomeMode(response);
    },
    HelpIntent: function (intent, session, response) {
        response.ask("You can say things like home mode, night mode, and more.", "You can say things like home mode, night mode, and more.");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the IrisBridge skill.
    var irisBridge = new IrisBridge();
    irisBridge.execute(event, context);
};

