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
        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a non-empty URL', function() {
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });
        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have a non-empty Name', function() {
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
         });
    });
    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function(){
        /*The logic inside the beforeEach function adds
         * a custom matcher to the jasmine testing framework.
         * [Reference-StackOverflow](https://stackoverflow.com/questions/32698155/check-if-element-has-class-only-with-jasmine-test-framework)
         * [Reference-Github](https://github.com/velesin/jasmine-jquery/blob/0fb5aead85e25ddd21f9533cff48b06f035cf032/lib/jasmine-jquery.js#L369-L377)
         * */
        beforeEach(function() {
            jasmine.addMatchers({
                toHaveClass: function() {
                    return {
                        compare: function(actual, className) {
                            return {
                             pass: $(actual).hasClass(className)
                            };
                        }
                    };
                }
            });
        });
        /* This test ensures that the menu element is
         * hidden by default.
         */
         it('is hidden by default', function() {
            expect('body').toHaveClass('menu-hidden');
         });
         /* This test ensures that the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: to check if the menu displays when
          * clicked and if it hides when clicked again.
          */
          it('changes visibility when the menu icon is clicked', function() {
            var menuIcon = document.getElementById('menu-icon');
            menuIcon.click();
            expect('body').not.toHaveClass('menu-hidden');
            menuIcon.click();
            expect('body').toHaveClass('menu-hidden');
          });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Jasmine's beforeEach and asynchronous done() function
         * have been used as function loadFeed() is asynchronous.
         */
         beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
         });
        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         it('have atleast one .entry element within .feed container', function(done) {
            var feedsContainer = document.querySelector('.feed');
            var numberOfFeeds = feedsContainer.getElementsByClassName('entry').length;
            expect(numberOfFeeds).toBeGreaterThan(0);
            done();
         });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* Jasmine's beforeEach and asynchronous done() function
         * have been used as function loadFeed() is asynchronous.
         */
         var initialFeedState;
         beforeEach(function(done) {
            loadFeed(0, function() {
                initialFeedState = document.querySelector('.feed').innerHTML;
                loadFeed(1, function() {
                    done();
                });
            });
         });
         /* This test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         it('content atually changes when a new feed is loaded by the loadFeed function', function(done) {
            var currentFeedState = document.querySelector('.feed').innerHTML;
            expect(currentFeedState).not.toBe(initialFeedState);
            done();
         });
    });
}());
