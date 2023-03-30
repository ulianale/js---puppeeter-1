let page;

beforeEach(async () => {
  page = await browser.newPage();  
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team", {timeout: 10000});
  })
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  });
});

describe("The tests of diffrent pages", () => { 
  test("Check  /features", async () => {
    await page.goto("https://github.com/features");
    const title = "div.application-main main div.p-responsive.container-xl.text-center.mt-12.mb-6 h1";
    const actual = await page.$eval(title, (link) => link.textContent);
    expect(actual).toContain("The tools you need to build what you want.");
  });

  test("Check /features/actions", async () => {
    await page.goto("https://github.com/features/actions");
    const title = "div.col-12.text-center.text-lg-left.mx-auto.mx-lg-0.py-8.position-relative";
    const actual = await page.$eval(title, (link) => link.textContent);
    expect(actual).toContain("Automate your workflow");
  });

  test("Check the button text", async () => {
    await page.goto("https://github.com/features/packages");
    const button = "div.application-main main div.position-relative.width-full div:nth-child(2) div div a:nth-child(1)";
    const actual = await page.$eval(button, (link) => link.textContent);
    expect(actual).toContain("Get started");
  });

});
