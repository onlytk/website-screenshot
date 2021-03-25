var myArgs = process.argv.slice(2);
const puppeteer = require("puppeteer");

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};


async function captureScreenshot() {

  if ( typeof myArgs[0] !== 'undefined' && myArgs[0] )
  {


  let browser = null;

  try {
    //root
    browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']})

    //browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

    await page.goto(myArgs[0]);

    //cookie
    /*const cookies = [{
      'name': 'cookie1',
      'value': 'value'
    },{
      'name': 'cookie2',
      'value': 'value'
    },{
      'name': 'cookie3',
      'value': 'value'
    },{
      'name': 'cookie4',
      'value': 'value'
    }];
    await page.setCookie(...cookies);
    const cookiesSet = await page.cookies(myArgs[0]);
    console.log(JSON.stringify(cookiesSet));
    */


    await timeout(10000)
    
    //await page.screenshot({ path: `screenshots/screenshot.jpeg`, fullPage: true });
    await page.screenshot({ path: `${myArgs[1]}` });
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
  } finally {
    await browser.close();
    console.log(`🎉 \"${myArgs[0]}\" captured.`);
  }
  }
  else
  {
    console.log(`❌ Error enter URL!`);
    process.exit(1)
  }
}

captureScreenshot();
