/*jshint strict:false */
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* The following test will loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URLs are defined and they are not empty', function() {

            allFeeds.forEach(function (feed) {
                var feedUrl = feed.url;
                expect(feedUrl).toBeDefined();
                expect(feedUrl.length).not.toBe(0);
            });
         });


        /* The following test will loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Names are defined and they are not empty', function() {

            allFeeds.forEach(function (feed) {
                var feedName = feed.name;
                expect(feedName).toBeDefined();
                expect(feedName.length).not.toBe(0);
            });
         });
    });


    /* A new test suite named "The menu" */
    describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         // here we are first checking that we have the menu-hidden class available for toggling operation.
         it('Menu is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        // For the following test we will require the 2 click events.
        it('Toggles visibility on icon click', function () {
            var menuHidden;
            // The below test ensure that the menu bar is hidden By default.
            $('.menu-icon-link').click();
            menuHidden = document.body.classList.contains("menu-hidden");

            expect(menuHidden).toBe(false);

            // The following test ensure that, after clicking the menu icon, we should see the menu bar.
            $('.menu-icon-link').click();
            menuHidden = document.body.classList.contains("menu-hidden");

            expect(menuHidden).toBe(true);
        });
    });
    /*A new test suite named "Initial Entries" */

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
    describe('Initial Entries', function() {
        // loadFeed contains the async functionality.So we are ensuring that before this test works the initial feed loads.
        // this will tell framework that our async function is "done" doing what is to do.
        beforeEach(function (done){
            loadFeed(0, done);
        });

        // Following test checks that when the file loads it contains "Udacity Blog" feed and it is not empty.
        it("when loadFeed functionality is complete, there is at least 1 .entry element within .feed", function (done){
            // collect the entries of the given feed
            var feed = $(".feed .entry").length;
            // test that feed entry is not a value equal to 0
            expect(feed).not.toBe(0);
            done();
        });
    });
    /* New test suite named "New Feed Selection" */

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    describe('New Feed Selection', function () {
        // Defining two var : one for our initial entry. second for the new feed (CSS Tricks)
        var initialFeed;
        var newFeed;
        // Due to async functionality we are loading the feed 0 (i.e Udacity blog) first.
        beforeEach(function (done) {
            loadFeed(0, function () {
                // This contains the html data for our initial feed.
                initialFeed = $('.header-title').html();
                done();
            });
        });
        it('content changes', function (done) {
            loadFeed(1, function () {
                // This contains the html data for our new feed.
                    newFeed = $('.header-title').html();
                    done();
                });
            // This test ensure that our initial feed is not equal to the new feed.
            expect(initialFeed).not.toBe(newFeed);
            done();
        });
    });
}());
