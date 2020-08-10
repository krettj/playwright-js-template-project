const Homepage = require("../pageobjects/homepage.page");
const expect = require("chai").expect;

Homepage.browsers.forEach(function (browser) {
  /**
   * Test suite for Homepage.
   * Parametrized for all supported browsers.
   * @function HomepageTests
   * @requires module:Homepage
   */
  describe(`${browser}: Homepage tests`, function () {
    /**
     * before hook - opens the browser, context and page
     * and goes to page.url
     * This hook is run once.
     * @function
     * @memberof HomepageTests
     */
    before(async function () {
      await Homepage.openPage(Homepage.url, browser);
    });

    /**
     * after hook - closes browser.
     * Runs only once.
     * @function
     * @memberof HomepageTests
     */
    after(async function () {
      await Homepage.closeBrowser();
    });

    /**
     * Tests correct Page title.
     * @function PageTitleIsCorrect
     * @memberof HomepageTests
     */
    it(`page title is ${Homepage.pageTitle}`, async function () {
      const title = await Homepage.page.title();
      expect(title).equals(Homepage.pageTitle);
    });

    /**
     * Tests that consent bar is shown for new visitor.
     * @function ConsentBar
     * @memberof HomepageTests
     */
    it("cookie consent bar is shown", async function () {
      const selectorCheck = await Homepage.page.waitForSelector(
        Homepage.cookieConsentBar.loc,
        { state: "visible" }
      );
      expect(selectorCheck).is.not.null;
    });

    /**
     * Tests that background color of the big header is as
     * specified by checking against color code in style attr.
     * @function BackgroundHeaderColor
     * @memberof HomepageTests
     */
    it("header background color is correct", async function () {
      const headerBackgroundElement = await Homepage.page.$(
        Homepage.headerBigBackgroundBar.loc
      );
      expect(
        await Homepage.verifyElementStyleColor(
          headerBackgroundElement,
          Homepage.headerBigBackgroundBar.color
        )
      ).to.be.true;
    });
  });
});