/**
 * @ngdoc object
 * @name ViewTestsPage.ViewDetailsCreateItemPage
 *
 * @description This page corresponds to the workspace item details view page.
 *
 * ##Dependencies
 *
 */
var q = require('q');
var util = require('util');
var AbstractItemViewPage = require('../pages/AbstractItemViewPage');
var AppHeader = require('../components/AppHeader');
var CommandBar = require('../components/CommandBar');

function ViewDetailsCreateItemPage() {

	ViewDetailsCreateItemPage.super_.call(this);

	/**
	 * @ngdoc property
	 * @name ViewTestsPage.ViewDetailsCreateItemPage#route
	 * @propertyOf ViewTestsPage.ViewDetailsCreateItemPage
	 * @description The URL for a basic item page (from Items and BOMs workspace)
	 */
	this.route = '/' + browser.params.baseName + '/workspaces/8/items/itemDetails?tab=details&view=split&mode=view&itemId=8@2877';

	/**
	 * @ngdoc property
	 * @name ViewTestsPage.ViewDetailsCreateItemPage#urlRegex
	 * @propertyOf ViewTestsPage.ViewDetailsCreateItemPage
	 * @description The regular expression for this page's URL.
	 */
	this.urlRegex = new RegExp('/workspaces\/?\\d+\/\@\/?\\d+\/details');

	/**
	 * @ngdoc property
	 * @name ViewTestsPage.ViewDetailsCreateItemPage#urlContains
	 * @propertyOf ViewTestsPage.ViewDetailsCreateItemPage
	 * @description The piece of substring that this page's URL should contain.
	 */
	this.urlContains = 'details';

	/**
	 * @ngdoc method
	 * @name ViewTestsPage.ViewDetailsCreateItemPage#waitForEvents
	 * @methodOf ViewTestsPage.ViewDetailsCreateItemPage
	 * @description Returns a promise that will be resolved to 'true' if all
	 * events are complete.
	 *
	 * @returns {Object} A promise that will be resolved to 'true' or 'false'
	 * depending on the state of the event listeners.
	 */
	this.waitForEvents = function () {
		return browser.executeAsyncScript(function (callback) {
			var injector = angular.injector(['plm360.models']);
			var eventService = injector.get('EventService');
			var $q = injector.get('$q');

			var promises = [];

			var currentUserDeferred = $q.defer();
			var currentUserListener = eventService.listen('currentUser:currentUser:done', function () {
				eventService.unlisten(currentUserListener);
				currentUserDeferred.resolve();
			});
			promises.push(currentUserDeferred.promise);

			var itemDetailsDeferred = $q.defer();
			promises.push(itemDetailsDeferred.promise);
			var itemDetailsListener = eventService.listen('itemInstance:*:done', function () {
				eventService.unlisten(itemDetailsListener);
				itemDetailsDeferred.resolve();
			});

			$q.all(promises).then(function () {
				callback(true);
			}, function () {
				callback(false);
			});
		});
	};
}

util.inherits(ViewDetailsCreateItemPage, AbstractItemViewPage);

module.exports = new ViewDetailsCreateItemPage();
