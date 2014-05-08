var assert = require('assert'),
    test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver'),
    SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;

var server = new SeleniumServer('"http://ec2-54-187-100-223.us-west-2.compute.amazonaws.com:4444/wd/hub"', {
  port: 4444
});
server.start();

var driver = new webdriver.Builder().
        usingServer(server.address()).
        withCapabilities(webdriver.Capabilities.chrome()).
        build(); 

test.describe('Wikipedia', function() {
  test.it('should get the title', function() {
    driver.get('http://www.wikipedia.org/');
    driver.getTitle()
          .then(function(title) {
            console.log(title);
            assert.equal(title,'Wikipedia');
          });

    driver.findElement(webdriver.By.id('searchInput')).sendKeys('selenium',webdriver.Key.RETURN);

    driver.getTitle()
          .then(function(search_title) {
            assert.equal(search_title, 'Selenium - Wikipedia, the free encyclopedia');
          })
    driver.close();
  });
});

