const Homepage = require("../pageobjects/homepage.page");
const Helpers = require("../helpers/helpers");
const expect = require("chai").expect;

const cultures = Object.keys(Homepage.locale);

Homepage.browsers.forEach(function (browser) {
  cultures.forEach(function (culture) {
    // run tests only if culture version of the page is published
    if (Homepage.locale[culture].published) {
      /**
       * Test suite for Contact Form in Homepage.
       * Parametrized for all supported browsers.
       * Parametrized for published languages.
       * @function HomepageContactFormTests
       * @requires module:Homepage
       */
      describe(`${browser}: ${culture}: Contact Form tests`, function () {
        /**
         * before hook - launches the browser.
         * Runs only once.
         * @function
         * @memberof HomepageContactFormTests
         */
        before(async function () {
          await Homepage.launchBrowser(browser);
        });

        /**
         * after hook - closes the browser.
         * Runs only once.
         * @function
         * @memberof HomepageContactFormTests
         */
        after(async function () {
          await Homepage.closeBrowser();
        });

        /**
         * beforeEach hook - starts Context, page, goes to given url
         * and waits until network traffic is idle.
         * Runs before each test.
         * @function
         * @memberof HomepageContactFormTests
         */
        beforeEach(async function () {
          await Homepage.startNewContext();
          await Homepage.openNewPage();
          await Homepage.page.goto(Homepage.locale[culture].url);
          await Homepage.page.waitForLoadState("networkidle");
        });

        /**
         * afterEach hook - closes the context.
         * Runs after each test.
         * @function
         * @memberof HomepageContactFormTests
         */
        afterEach(async function () {
          await Helpers.takeScreenshot(this, Homepage, "failed", browser);
          await Homepage.closeContext();
        });

        /**
         * Tests, that the Contact Form element is visible.
         * @function FormIsVisible
         * @memberof HomepageContactFormTests
         */
        it("form is visible", async function () {
          const elementHandle = await Homepage.page.$(
            Homepage.contactForm.loc.form
          );
          const status = await Homepage.isVisible_(elementHandle);
          expect(status).not.to.be.false;
        });

        /**
         * Tests, that error messages displayed for required fields
         * if send action is attempted.
         * @function ErrorMessagesDisplayed
         * @memberof HomepageContactFormTests
         */
        it("error messages displayed if email and consent not provided", async function () {
          await Homepage.page.click(Homepage.contactForm.loc.submitButton);

          const elementHandles = await Homepage.page.$$(
            Homepage.contactForm.loc.errorMessage
          );
          expect(elementHandles.length).equals(2);

          let flags = [];
          elementHandles.forEach(async function (element) {
            flags.push(await Homepage.isVisible_(element));
          });
          expect(flags).not.contains(false);
        });
      });
    }
  });
});
