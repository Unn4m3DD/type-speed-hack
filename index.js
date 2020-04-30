const puppeteer = require('puppeteer'); 
let page;
(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1080 });
  await page.goto('https://www.typing.academy/typing-tutor/typing-test', { waitUntil: 'networkidle2' });
})();

setInterval(async () => {
  page.evaluate(() => {
    if (document.getElementsByClassName("current")[0] != undefined)
      return document.getElementsByClassName("current")[0].innerText
  }).then((current) => {
    if (current != undefined) {
      page.keyboard.press(current === " " ? "Space" : ('Key' + current.toUpperCase()));
    }
  }).catch(() => { console.log("error") })
}, 100)